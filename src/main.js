import Vue from 'vue';

import Element from 'element-ui';
import '@/style/custom-theme/style/index.css';
Vue.use(Element, {
  size: localStorage.getItem('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
});

import * as filters from '@/filters'; // global filters
import setVm from '@/utils/setVm';
import '@/style/index.less'; // global css
import '@/icons'; // icon

setVm(Vue);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

import App from '@/App';

import store from '@/store';

import router from '@/router';

import i18n from '@/lang'; // internationalization

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    store,
    router,
    i18n,
    render: h => h(App)
});
