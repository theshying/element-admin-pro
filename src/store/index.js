import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import getters from './getters';
Vue.use(Vuex);
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {});
const store = new Vuex.Store({
    modules,
    getters,
    // plugins: [createPersistedState()]
    plugins: [createPersistedState({
        key: 'rlair',
        storage: window.localStorage,
        reducer(state) {
            return {
                app: {
                    sidebar: state.app.sidebar,
                    size: state.app.size,
                    language: state.app.language,
                },
                user: {
                    token: state.user.token,
                },

            };
        }
    })]
});

export default store;
