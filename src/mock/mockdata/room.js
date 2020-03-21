import Mock from 'mockjs';
const Random = Mock.Random;
import { roomObject } from '@/api/type/building.type.js';
const getRoomList = function() {
  let rooms = [];
  for (let i = 0; i < 3; i++) {
    var newRoom = new roomObject();
    // let newRoom. = {
    newRoom.roomId = Random.string(2, 10); //编号
    newRoom.floorId = Random.string(2, 10); //编号
    newRoom.name = Random.natural(100, 999) + '室';
    newRoom.roomPlate.floorPlateId = Random.string(2, 10); //编号
    newRoom.roomPlate.plateId = Random.string(2, 10); //编号
    newRoom.roomPlate.plateNumber = Random.natural(1, 5);
    newRoom.roomPlate.plateSuffix = '室';

    rooms.push(newRoom);
  }
  return rooms;
};

export default {
  getRoomList: () => getRoomList()
};
