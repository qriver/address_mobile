import room from './room';
import Mock from 'mockjs';
import { floorObject } from '@/api/type/building.type.js';
const Random = Mock.Random;

const getFloorList = function() {
  let floors = [];
  for (let i = 1; i < 12; i++) {
    var newFloor = new floorObject();

    newFloor.buindingId = Random.string(2, 10); //编号
    newFloor.floorId = Random.string(2, 10); //编号
    newFloor.unitId = Random.string(2, 10); //编号
    newFloor.name = i + '楼'; //名称
    newFloor.roomsAtFloor = 2;

    newFloor.floorPlate.unitPlateId = Random.string(2, 10); //编号
    newFloor.floorPlate.floorPlateId = Random.string(2, 10); //编号
    newFloor.floorPlate.plateNumber = Random.natural(1, 5);
    newFloor.floorPlate.plateSuffix = '单元';

    newFloor.rooms = room.getRoomList();
    floors.push(newFloor);
  }
  return floors;
};

export default {
  getFloorList: () => getFloorList()
};
