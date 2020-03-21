import axios from '@/api/http';
// import qs from 'qs';
import base from './base';
//自定义的api对象
const user = {
  //获取用户详细信息
  getUserDetail(params) {
    // window.console.log(params);
    return axios.get(`${base.url1}/user/get`, params);
  }
};

export default user;
