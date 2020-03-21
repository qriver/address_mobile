import axios from '@/api/http';
//import qs from 'qs';
import base from './base';
//自定义的api对象
const building = {
  getBuildingUnits(params) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${base.url1}/building/get_units`, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });

    // return axios.get(`${base.url1}/building/get_units`, params);
  },
  getBuildingById(params) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${base.url1}/building/get`, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });

    // return axios.get(`${base.url1}/building/get`, params);
  },
  createBuilding(params) {
    return axios.post(`${base.url1}/building/create`, params);
  },

  getUnitChildrens(params) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${base.url1}/unit/${params}/get_childrens`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default building;
