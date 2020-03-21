// file: mock/mockdata/user.js
import responseData from './base';
import Mock from 'mockjs';
import { userObject } from '@/api/type/user.type.js';
const Random = Mock.Random;
var resData = new responseData();
//模拟数据，登录用户详细信息
const getUserDetail = function() {
  let user = new userObject();
  user.userId = Random.string(10, 20);
  user.userName = Random.string(10, 20);
  user.role = 'worker';
  // user.role = 'auditor';

  resData.statusCode = '100';
  resData.statusMsg = 'SUCESS';
  resData.result = user;
  // window.console.log(resData);
  return resData;
};

export default {
  getUserDetail: () => getUserDetail()
};
