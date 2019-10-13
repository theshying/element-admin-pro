// import Vue from 'vue';
// import {errorReport} from '@/client/';
// function checkNeed() {
//     //TODO::新增开关
//     return false;
// }
// if (checkNeed()) {
//     Vue.config.errorHandler = function(err, vm, info) {
//         // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
//         Vue.nextTick(() => {
//             const params = {
//                 err: err.toString(),
//                 info,
//                 url: window.location.href,
//             };
//             errorReport(params);
//         });
//     };
// }
