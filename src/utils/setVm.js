import dayjs from 'dayjs';
import _ from 'lodash';
import checkPermission from './permission';
import {fileDownload, previewPdf, previewOffice} from '@/utils/common';
export default (Vue) => {
    Vue.prototype._ = _;
    Vue.prototype.$authCheck = checkPermission;
    Vue.prototype.$dayjs = dayjs;
    Vue.prototype.$utils = {
        fileDownload, previewPdf, previewOffice
    };
};
