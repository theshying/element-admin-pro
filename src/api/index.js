import axios from '@/utils/axios';

export const doLogin = data => axios.post('/user/login', data);
export const getUserInfo = () => axios.get('/user/me');

export const getUserPermissions = () => axios.get('user/permission');
