import axios from '@/utils/axios';

export const doLogin = data => axios.post('/user/login', data);
export const getUserInfo = () => axios.get('/user/me');

export const getUserPermissions = userId => axios.get(`${userId}/permission`);

export const getUserList = params => axios.get('user/list', params)
