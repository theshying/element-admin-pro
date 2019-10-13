import axios from '@/utils/axios';
import qs from 'qs';

export const login = data => axios.post('/user/login', data);
export const logout = () => axios.get('/user/logout');
export const getUserInfo = () => axios.get('/user/getUserInfo');
