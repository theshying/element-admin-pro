import dayjs from 'dayjs';
import _ from 'lodash';
import checkPermission from './permission';
import * as client from '@/api'
export default (Vue) => {
    Vue.prototype._ = _;
    Vue.prototype.$authCheck = checkPermission;
    Vue.prototype.$dayjs = dayjs;
    Vue.prototype.$client = client;
};
