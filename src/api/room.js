import axios from '@/api/http';
//import qs from 'qs';
import base from './base';
//自定义的api对象
const room = {
  createRoom(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.url1}/room/create`, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateRoom(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.url1}/room/update`, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default room;
