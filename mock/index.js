import Mock from 'mockjs'
import user from './modules/user'
import table from './modules/table';
import dashboard from './modules/dashboard';
import {serviceResult} from './utils'

const mocks = [
  ...user,
  ...table,
  ...dashboard
]
export function mockXHR() {
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }
  function XHR2ExpressReqWrap(respond) {
    return function (options) {
      let result = null
        const { body, type, url } = options
      if (respond instanceof Function) {
        result = serviceResult(respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        }))
      } else {
        result = serviceResult(respond);
      }
      /* eslint-disable */
      console.group(`[${type}]${options.url}`); 
      console.log(1);
      console.log('request:', body);
      console.log('resopond:', result);
      console.groupEnd(`[${type}]${options.url}`)
     /* eslint-disable */
      return Mock.mock(result)
    }
  }
  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}
const param2Obj = (url) => {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}
