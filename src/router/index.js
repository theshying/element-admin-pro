import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import {getToken} from '@/utils/auth'; // getToken from cookie
Vue.use(Router);

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
import Layout from '@/views/layout/Layout';


const constantRouterMap = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {path: '/404', component: () => import('@/views/errorPage/404'), hidden: true},
    {path: '/401', component: () => import('@/views/errorPage/401'), hidden: true},
    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [{
            path: 'dashboard',
            component: () => import('@/views/dashboard/index'),
            name: 'dashboard',
            meta: {title: 'dashboard', icon: 'dashboard', noCache: true, noClose: true}
        }]
    }
];
const devRouter = [
    {
        path: '/dev',
        component: Layout,
        redirect: '/dev/curd',
        alwaysShow: true, // will always show the root menu
        meta: {
            title: 'devBackGround',
            icon: 'lock',
        },
        children: [
            {
                path: 'curd',
                component: () => import('@/views/devBackGround/curd'),
                name: 'curd',
                meta: {
                    icon: 'lock',
                    title: 'curd',
                }
            },

        ]
    },
];
const businessRouterMap = [];

const asyncRouterMap = businessRouterMap;
if (process.env.NODE_ENV === 'development') {
    asyncRouterMap.push(...devRouter);
}
export {
    asyncRouterMap,
    constantRouterMap
};

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
});

const router = createRouter();

const whiteList = ['/login', '/authredirect'];// no redirect whitelist
// permission judge function
const hasPermission = (roles, permissionRoles) => {
    console.log(roles);
    if (!permissionRoles) {return true;}
    return roles.some(role => permissionRoles.indexOf(role) >= 0);
};

router.beforeEach((to, from, next) => {
  if (getToken()) {
      if (to.path === '/login') {
          next({path: '/'});
      } else if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
          store.dispatch('getUserInfo').then(res => { // 拉取user_info
              const roles = res.data.roles; // note: roles must be a array! such as: ['editor','develop']
              store.dispatch('generateRoutes', {roles}).then(() => { // 根据roles权限生成可访问的路由表
                  router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                  next({...to, replace: true}); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              });
          }).catch(() => {
              store.dispatch('fedLogOut').then(() => {
                  next({path: '/'});
              });
          });
      } else if (hasPermission(store.getters.roles, to.meta.roles)) {
          next();//
      } else {
          next({path: '/401', replace: true, query: {noGoBack: true}});
      }
      // 可删 ↑
  } else if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
  } else {
      next('/login'); // 否则全部重定向到登录页
  }
});

router.afterEach(() => {
});

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
