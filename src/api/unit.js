import axios from '@/api/http';
//import qs from 'qs';
import base from './base';
//自定义的api对象
const unit = {
  createUnit(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.url1}/unit/create`, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateUnit(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${base.url1}/unit/update`, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default unit;
