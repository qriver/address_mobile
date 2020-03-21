import responseData from './base.js';
var resData = new responseData();
const getDictionary = function() {
  const dictionary = {
    myStreetList: [
      { keyId: '2001', text: '云集路' },
      { keyId: '2001', text: '中山路' },
      { keyId: '2001', text: '大连路' },
      { keyId: '2001', text: '沿江大道' },
      { keyId: '2001', text: '东山大道' }
    ]
  };
  resData.statusCode = '100';
  resData.statusMsg = 'SUCESS';
  resData.result = dictionary;
  //  window.console.log(resData);
  return resData;
};

export default {
  getDictionary: () => getDictionary()
};
