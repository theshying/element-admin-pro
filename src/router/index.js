import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import store from '@/store';
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
    permission: ['view:edit','view:add']    control the page permissions (you can set multiple permission)
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
        path: '/',
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
const asyncRouterMap = [
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
    {
        path: '/error',
        component: Layout,
        redirect: '/dev/404',
        alwaysShow: true, // will always show the root menu
        meta: {
            title: 'errorPage',
            icon: 'lock',
        },
        children: [
            {
                path: '404',
                component: () => import('@/views/errorPage/404'),
                name: '404',
                meta: {
                    icon: 'lock',
                    title: '404',
                }
            },
            {
                path: '401',
                component: () => import('@/views/errorPage/401'),
                name: '401',
                meta: {
                    icon: 'lock',
                    title: '401',
                }
            },

        ]
    },
];

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

NProgress.configure({showSpinner: false});

const whiteList = ['/login', '/auth-redirect'];

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const hasToken = store.getters.token;
    if (hasToken) {
        if (to.path === '/login') {
            next({path: '/'});
            NProgress.done();
        } else {
            const {permissions} = store.getters;
            if (permissions) {
                next();
            } else {
                try {
                    await store.dispatch('getUserInfo');
                    await store.dispatch('getPermissions');
                    const accessRoutes = await store.dispatch('generateRoutes');
                    router.addRoutes(accessRoutes);
                    next({...to, replace: true});
                } catch (error) {
                    next(`/login?redirect=${to.path}`);
                    NProgress.done();
                }
            }
        }
    } else if (whiteList.indexOf(to.path) !== -1) {
        next();
    } else {
        next(`/login?redirect=${to.path}`);
        NProgress.done();
    }
});

router.afterEach(() => {
    NProgress.done();
});
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
