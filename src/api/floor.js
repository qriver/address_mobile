import axios from '@/api/http';
//import qs from 'qs';
import base from './base';
//自定义的api对象
const floor = {
  createFloor(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.url1}/floor/create`, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateFloor(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.url1}/floor/update`, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default floor;
