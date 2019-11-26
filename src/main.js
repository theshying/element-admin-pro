import Vue from 'vue';

import Element from 'element-ui';
import i18n from '@/lang'; // internationalization

import '@/assets/style/element-theme-chalk/index.css';
Vue.use(Element, {
    size: localStorage.getItem('size') || 'mini', // set element-ui default size
    i18n: (key, value) => i18n.t(key, value)
});

import * as filters from '@/filters'; // global filters
import setVm from '@/utils/setVm';
import '@/assets/style/index.less'; // global css

setVm(Vue);
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

import App from '@/App';

import store from '@/store';

import router from '@/router';


Vue.config.productionTip = false;

new Vue({
    el: '#app',
    store,
    router,
    i18n,
    render: h => h(App)
});
