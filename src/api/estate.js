import axios from '@/api/http';
import qs from 'qs';
import base from './base';
// import { , base } from '@/api/base.js';
//自定义的api对象
const estate = {
  getEstateListByGrid(params) {
    return axios.get(`${base.url1}/estate/get_list_by_worker`, { params });
  },
  getEstateListUnaudited(params) {
    return axios.get(`${base.url1}/estate/unaudited`, params);
  },
  getEstateListAudited(params) {
    return axios.get(`${base.url1}/estate/audited`, params);
  },

  getEstateById(params) {
    return axios.get(`${base.url1}/estate/get`, params);
  },

  createEstate(params) {
    return axios.post(`${base.url1}/estate/create`, params);
  },
  updateEstate(params) {
    return axios.post(`${base.url1}/estate/update`, params);
  },
  deleteEstate(params) {
    return axios.post(`${base.url1}/estate/delete`, params);
  },
  //post提交方式
  //qs对post参数进行串行化处理
  //post示例：
  login(params) {
    return axios.post(`${base.url1}/accesstoken`, qs.stringfy(params));
  }
};

export default estate;

/**
 * api调用示例
 * 1、 在main.js中导入封装的axios业务接口,
 *     import api from './api';
 *     Vue.prototype.$api = api;
 * 2、 在页面中使用
 *     this.$api.estate.estateDetail(id,{
 *        api:123
 *     }).then(res={
 *          window.console.log(res.data)
 *      })
 *     .catch(err => {
 *           window.console.log(err.data)
 *     })
 *  this.$api.estate.getEstateListByWg("aa")
 *       .then(
 *         function (res) {
 *           window.console.log(res.data)
 *         }
 *       ).catch(
 *         function (err) {
 *           window.console.log(err.data)
 *         }
 *       )
 *
 *    }
 *
 */
