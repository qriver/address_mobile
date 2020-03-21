import axios from '@/api/http';

import base from './base';
//自定义的api对象
const dictionary = {
  async getMyStreet(params) {
    return await axios.get(`${base.url1}/user/get_street`, params);
  }
};
export default dictionary;
