/* eslint-disable */
/**
 * 开发服务单点登录集成
 */

const request = require('request')
const proxyMiddleware = require('http-proxy-middleware')
const url = require('url')

const config = require('../config')
const casConfig = config.dev.casConfig

const proxyServerUrl = casConfig.serverProtocol + casConfig.serverHost + (casConfig.proxyServerPort === 80 ? '' : ':' + casConfig.proxyServerPort) + casConfig.serverPath
const casLoginServerUrl = casConfig.serverProtocol + casConfig.serverHost + (casConfig.serverPort === 80 ? '' : ':' + casConfig.serverPort) + casConfig.serverPath
const proxyServerHost = casConfig.serverProtocol + casConfig.serverHost + (casConfig.proxyServerPort === 80 ? '' : ':' + casConfig.proxyServerPort)

// 单点代理
const proxyCas = proxyMiddleware('/cas', {
    target: casConfig.casUrl,
    changeOrigin: true,
    onProxyRes: function(proxyRes, req, res) {
        const locationUrl = proxyRes.headers['location']
        if ((proxyRes.statusCode === 302 || proxyRes.statusCode === 301) && /ticket/.test(locationUrl)) {
            // proxyRes.headers['location'] = proxyRes.headers['location'].replace('10.1.45.88:8080/pss', req.get('host'))
            proxyRes.headers['location'] = casConfig.serverPath + 'callback?client_name=cas&' + locationUrl.substring(locationUrl.indexOf('ticket'), locationUrl.length)
        }
    }
})

// 单点代理退出
const proxyCasLogout = proxyMiddleware('/cas/logout', {
    target: casConfig.casUrl,
    changeOrigin: true,
    onProxyRes: function(proxyRes, req, res) {
        proxyRes.statusCode = 302;
        proxyRes.headers['location'] = casConfig.serverPath;
    }
})

// 登录单点代理
const proxyLogin = proxyMiddleware(casConfig.serverPath + 'callback', {
    target: proxyServerHost,
    changeOrigin: true,
    onProxyRes: function(proxyRes, req, res) {
        if (proxyRes.statusCode === 302 || proxyRes.statusCode === 301) {
            // proxyRes.headers['location'] = proxyRes.headers['location'].replace('8080', '3000').replace('10.1.45.88', req.get('host'))
            proxyRes.headers['location'] = casConfig.serverPath
        }
    }
})

// 退出单点代理
const proxyLogout = proxyMiddleware(casConfig.serverPath + 'logout', {
    target: proxyServerHost,
    changeOrigin: true,
    onProxyRes: function(proxyRes, req, res) {
        if (proxyRes.statusCode === 302 || proxyRes.statusCode === 301) {
            const locationUrl = proxyRes.headers['location']
            // proxyRes.headers['location'] = proxyRes.headers['location'].replace('8080', '3000').replace('10.1.45.88', req.get('host'))
            proxyRes.headers['location'] = locationUrl.replace(casConfig.casUrl, '')
        }
    }
})

module.exports = function(app) {
    app.use(function(req, res, next) {
       const pathname = url.parse(req.originalUrl).pathname
       const query = url.parse(req.url).query

    //   if (pathname === '/' || pathname === casConfig.serverPath.replace(/\/$/, '')) {
    //       // 根路径
    //       // 跳转到服务路径
    //       res.status(302)
    //       res.setHeader('Location', casConfig.serverPath)
    //       return res.end()
    //   }

       // mock服务退出单点，则直接跳转至根路径
       if (global.DEV_ENV === 'mock' && pathname === casConfig.serverPath + 'logout') {
           // 开发服务退出登录
           res.status(302)
           res.setHeader('Location', casConfig.serverPath)
       }

       // 使用mock服务的话，则不需要再进行单点验证
       if (global.DEV_ENV === 'mock') {
           return next()
       }

       if (
           !(
               (req.headers['accept'] && req.headers['accept'].indexOf('application/json') !== -1) ||
               (req.headers['X-Requested-With'] && req.headers['X-Requested-With'].indexOf('XMLHttpRequest') !== -1)
           ) && req.originalUrl.indexOf('__webpack_hmr') === -1
       ) {
           if (pathname === casConfig.serverPath) {
               return request({
                   uri: proxyServerUrl,
                   method: 'GET',
                   headers: Object.assign({}, req.headers),
                   followRedirect: false
               }, function(error, response, body) {
                   if (error) {
                       console.error('Error Proxy', proxyServerUrl, error)
                       return next()
                   }

                   console.log('Proxy Success', proxyServerUrl)
                   console.log('Proxy Status', response.statusCode)
                   console.log('Proxy Headers', response.headers)

                   if (response.statusCode === 302 && response.headers.location && response.headers.location.indexOf('cas/login') !== -1) {
                       // 未登录，需要跳转至单点
                       res.status(302)
                       if (response.headers['set-cookie']) {
                           let getCookie = response.headers['set-cookie'][0] || response.headers['Set-Cookie'][0]
                           getCookie = getCookie.split(';')[0].replace('SHAREJSESSIONID=', '')
                           res.cookie('SHAREJSESSIONID', getCookie, {httpOnly: true})
                       }
                       res.setHeader('Location', '/cas/login?service=' + casLoginServerUrl + 'callback?client_name=cas')
                       return res.end()
                   } else if (response.statusCode === 200) {
                       // 不需要跳转单点，进入下一个中间件
                       next()
                   } else {
                       next();
                   }
               })
           } else if (pathname === (casConfig.serverPath + 'callback') && /ticket/.test(query) && req.method.toLowerCase() === 'get') {
               // 登录提交
               proxyLogin(req, res, next)
           } else if (/^\/cas\/logout/.test(pathname)) {
               // 单点服务退出登录
               proxyCasLogout(req, res, next)
           } else if (/^\/cas/.test(pathname)) {
               // 单点登录页面
               proxyCas(req, res, next)
           } else if (pathname === (casConfig.serverPath + 'logout')) {
               // 退出登录
               proxyLogout(req, res, next)
           } else {
               next()
           }
       } else {
           next()
       }
    })
}
