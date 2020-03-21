import responseData from './base.js';
import Mock from 'mockjs';
import building from './building.js';
import { estateObject } from '@/api/type/estate.type.js';
const Random = Mock.Random;

const getEstateList = function() {
  var resData = new responseData();
  let estates = [];
  for (let i = 0; i < 10; i++) {
    var newEstate = new estateObject();
    // var t = JSON.stringify(estateObject);
    // var newEstate = JSON.parse(t);
    mockEstateData(newEstate);
    newEstate.buildings = {};
    estates.push(newEstate);
  }

  resData.statusCode = '100';
  resData.statusMsg = 'SUCESS';
  resData.result = estates;
  // window.console.log(res);
  return resData;
};

const getEstateListUnaudited = function() {
  var resData = new responseData();
  let estates = [];
  for (let i = 0; i < 10; i++) {
    var newEstate = new estateObject();
    // var t = JSON.stringify(estateObject);
    // var newEstate = JSON.parse(t);
    mockEstateData(newEstate);
    newEstate.auditStatus = 1;
    newEstate.buildings = {};
    estates.push(newEstate);
  }

  resData.statusCode = '100';
  resData.statusMsg = 'SUCESS';
  resData.result = estates;
  // window.console.log(res);
  return {
    resData
  };
};

const getEstateListAudited = function() {
  var resData = new responseData();
  let estates = [];
  for (let i = 0; i < 10; i++) {
    var newEstate = new estateObject();
    // var t = JSON.stringify(estateObject);
    // var newEstate = JSON.parse(t);
    mockEstateData(newEstate);
    newEstate.auditStatus = 3;
    newEstate.buildings = {};
    estates.push(newEstate);
  }

  resData.statusCode = '100';
  resData.statusMsg = 'SUCESS';
  resData.result = estates;
  // window.console.log(res);
  return {
    resData
  };
};

const getEstateById = function() {
  var resData = new responseData();
  // var t = JSON.stringify(estateObject);
  // var newEstate = JSON.parse(t);
  var newEstate = new estateObject();
  mockEstateData(newEstate);

  newEstate.buildings = building.getBuildingListOnly(); //建筑物集合
  resData.statusCode = '100';
  resData.statusMsg = 'SUCESS';
  resData.result = newEstate;

  return resData;
};

function mockEstateData(newEstate) {
  newEstate.estateId = Random.string(10, 20);
  newEstate.name = Random.string(10, 20) + '项目';
  newEstate.owner = Random.cname(); //建设单位
  newEstate.estatePlateId = ''; //门牌
  newEstate.areaNo = Random.string(2, 10); //宗地号
  newEstate.type = Random.string(2, 6); //建设性质
  newEstate.createDate = Random.datetime(); //立项时间
  newEstate.buildingCount = Random.natural(1, 2); //建筑数量
  newEstate.roomCount = Random.natural(1, 2); //房间号
  newEstate.space = Random.natural(1, 5); //面积
  newEstate.position = Random.string(10, 20); // 位置
  newEstate.estateFunction = Random.string(2, 10); //建筑功能
  newEstate.auditStatus = Random.natural(0, 3);
  newEstate.estatePlate.estatePlateId = Random.string(5, 10); //门牌编号
  newEstate.estatePlate.alias = Random.string(5, 10); //门牌别名
  newEstate.estatePlate.fullName = Random.string(5, 10) + '大道' + Random.natural(1, 100) + '号'; //门牌拼接后的全名
  newEstate.estatePlate.street.keyId = Random.string(5, 10);
  newEstate.estatePlate.street.value = Random.string(5, 10);
  newEstate.estatePlate.prefix.keyId = Random.string(5, 10);
  newEstate.estatePlate.prefix.value = Random.string(5, 10);

  newEstate.estatePlate.plateNumber = Random.natural(10, 20); //门牌号
  newEstate.estatePlate.suffix.keyId = Random.string(5, 10);
  newEstate.estatePlate.suffix.value = Random.string(5, 10); //后缀
  return newEstate;
}

export default {
  getEstateListAudited: () => getEstateListAudited(),
  getEstateListUnaudited: () => getEstateListUnaudited(),
  getEstateList: () => getEstateList(),
  getEstateById: () => getEstateById()
};

// Random.natural(1, 5); //随机生成1－5位的数字
// Random.cname(); //随机生成中文名字
// Random.datetime();
// Random.county(); //随机生成县  province city
// Random.string(2, 10); //随机生成2-10之间的字符串
// Rondom.image(Random.size,'02adea','Hello')
