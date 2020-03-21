import unit from './unit';
import Mock from 'mockjs';
import responseData from './base.js';
import { buildingObject } from '@/api/type/building.type.js';

const Random = Mock.Random;
var resData = new responseData();

const getBuildingList = function() {
  let buildings = [];
  for (let i = 0; i < 5; i++) {
    var newBuilding = new buildingObject();
    mockData(newBuilding);

    newBuilding.units = unit.getUnitList();
    buildings.push(newBuilding);
  }
  return buildings;
};

const getBuildingListOnly = function() {
  let buildings = [];
  buildings = getBuildingList();

  for (let i = 0; i < 5; i++) {
    buildings[i].units = null;
  }
  return buildings;
};

const getBuildingById = function() {
  var newBuilding = new buildingObject();
  mockData(newBuilding);

  newBuilding.units = unit.getUnitList();

  resData.statusCode = '100';
  resData.statusMsg = 'SUCESS';
  resData.result = newBuilding;
  // window.console.log(res);
  return {
    resData
  };
};

function mockData(newBuilding) {
  newBuilding.buildingId = Random.natural(1, 10);
  newBuilding.estateId = Random.natural(1, 10);
  newBuilding.name = Random.string(5, 10);
  newBuilding.buildingPlateId = '';
  // newBuilding.plateFullName =
  //   Random.string(5, 10) + '大道' + Random.natural(1, 100) + '号' + Random.natural(1, 2) + '栋';
  newBuilding.unitCount = Random.natural(1, 3);
  newBuilding.floorsAtUnit = Random.natural(1, 10);
  newBuilding.roomsAtFloor = Random.natural(1, 2);

  newBuilding.buildingPlate.buildingPlateId = Random.string(5, 10); //楼栋门牌编号
  newBuilding.buildingPlate.estatePlateId = Random.string(5, 10); //上级门牌编号
  newBuilding.buildingPlate.alias = Random.string(5, 10); //门牌别名
  newBuilding.buildingPlate.fullName =
    Random.string(5, 10) + '大道' + Random.natural(1, 100) + '号'; //门牌拼接后的全名
  newBuilding.buildingPlate.prefix.keyId = '';
  newBuilding.buildingPlate.prefix.value = ''; //前缀
  newBuilding.buildingPlate.plateNumber = Random.natural(10, 20); //门牌号
  newBuilding.buildingPlate.suffix.keyId = Random.string(5, 10);
  newBuilding.buildingPlate.suffix.value = Random.string(5, 10); //后缀
  newBuilding.buildingPlate.attachedNumber = ''; //附号
  newBuilding.buildingPlate.attachedSuffix.keyId = Random.string(5, 10);
  newBuilding.buildingPlate.attachedSuffix.value = Random.string(5, 10); //附号后缀

  return newBuilding;
}

export default {
  getBuildingById: () => getBuildingById(),
  getBuildingList: () => getBuildingList(),
  getBuildingListOnly: () => getBuildingListOnly()
};
