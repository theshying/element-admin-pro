import axios from '@/utils/axios';
import qs from 'qs';
export const doLogin = data => axios.post('/user/login', data);
export const getUserInfo = () => axios.get('/user/me');

export const getUserPermissions = userId => axios.get(`${userId}/permission`);

export const getUserList = params => {
    return axios.get('user/list', qs.stringify(params))
}
