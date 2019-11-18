import axios from 'axios';
import {Message} from 'element-ui';
import store from '@/store';
import {getToken} from '@/utils/auth';

// create an axios instance
const service = axios.create({
    baseURL: 'api', // url = base url + request url
    // withCredentials: true, // send  when cross-domain requests
    timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
    config => {
        config.headers.token = store.getters.token;
        config.headers.language = store.getters.language;
        return config;
    },
);

// response interceptor
service.interceptors.response.use(
    response => {
        const data = response.data;
        if (data && data.success) {
            return Promise.resolve(data);
        }
        Message({
            message: res.message || 'Error',
            type: 'error',
        });
        return Promise.reject(data);
    },
    error => {
        Message({
            message: error.message,
            type: 'error',
        });
        return Promise.reject(error);
    }
);
export default service;
