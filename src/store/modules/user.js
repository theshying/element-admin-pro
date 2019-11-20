import {doLogin, getUserInfo} from '@/api';

const user = {
    state: {
        token: '',
        userInfo: null,
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo;
        }
    },

    actions: {
        // 用户名登录
        doLogin({commit}, data) {
            return new Promise((resolve, reject) => {
                doLogin(data).then(({data}) => {
                    commit('SET_TOKEN', data);
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 获取用户信息
        getUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(({data}) => {
                    commit('SET_USERINFO', data);
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        // 前端 登出
        fedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                resolve();
            });
        },
    }
};

export default user;
