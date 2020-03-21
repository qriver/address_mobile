/* eslint-disable no-undef */
// process.env.VUE_APP_URL = require('../../package.json').VUE_APP_URL;
const base = {
  // 从当前目录返回，适用于接口和应用在同一台服务器
  url1: process.env.VUE_APP_URL + '/api/v1'
};

const commonFunction = {
  //对象属性下划线转驼峰
  objectLineToHump: function(obj) {
    var newObj = new Object();
    for (let key in obj) {
      newObj[toHump(key)] = obj[key];
    }
    return newObj;
  },
  //对象属性驼峰转下划线
  objectHumpToLine: function(obj) {
    var newObj = new Object();
    for (let key in obj) {
      newObj[key.replace(/([A-Z])/g, '_$1').toLowerCase()] = obj[key];
    }

    return newObj;
  }
};

function toHump(name) {
  // eslint-disable-next-line no-useless-escape
  return name.replace(/\_(\w)/g, function(all, letter) {
    return letter.toUpperCase();
  });
}

export default base;
export { base, commonFunction };
