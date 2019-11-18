import {asyncRouterMap, constantRouterMap} from '@/router';
import checkPermission from '@/utils/permission';
import {getUserPermissions} from '@/api';
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap) {
    const accessedRouters = asyncRouterMap.filter(route => {
        console.log(route);
        if (route.meta.permission === null) {
            console.log(route);
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children);
            }
            return true;
        }
        if (checkPermission(route.meta.permission)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children);
            }
            return true;
        }
        return true;
    });
    return accessedRouters;
}

const permission = {
    state: {
        addRouters: [],
        routers: [],
        permissions: null,
    },
    mutations: {
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions;
        },
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        }
    },
    actions: {
        getPermissions({commit}) {
            return new Promise(resolve => {
                getUserPermissions().then((data) => {
                    commit('SET_PERMISSIONS', data || []);
                    resolve(data || []);
                });
            });
        },
        generateRoutes({commit, state}) {
            return new Promise(resolve => {
                const accessedRouters = filterAsyncRouter(asyncRouterMap, state.permissions);
                commit('SET_ROUTERS', accessedRouters);
                resolve(accessedRouters);
            });
        }
    }
};

export default permission;
