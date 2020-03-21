import floor from './floor';
import Mock from 'mockjs';
import { unitObject } from '@/api/type/building.type.js';
const Random = Mock.Random;

const getUnitList = function() {
  let units = [];
  for (let i = 1; i < 4; i++) {
    var newUnit = new unitObject();

    newUnit.unitId = Random.string(2, 10); //编号
    newUnit.buildingId = Random.string(2, 10); //编号
    newUnit.name = i + '单元'; //名称
    newUnit.floorCount = 0;
    newUnit.roomsAtFloor = 0;

    newUnit.unitPlate.buildingPlateId = Random.string(2, 10); //编号
    newUnit.unitPlate.plateId = Random.string(2, 10); //编号
    newUnit.unitPlate.plateNumber = Random.natural(1, 5);
    newUnit.unitPlate.plateSuffix = '单元';

    newUnit.floors = floor.getFloorList();
    units.push(newUnit);
  }
  return units;
};

export default {
  getUnitList: () => getUnitList()
};
