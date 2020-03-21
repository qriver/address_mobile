import uuid from 'node-uuid';
import { unitObject, floorObject, roomObject } from '@/api/type/building.type.js';

function createBuildingStruct(buildingInstance) {
  buildingInstance.buildingId = uuid.v4();
  buildingInstance.buildingPlateId = uuid.v4();
  buildingInstance.buildingPlate.buildingPlateId = buildingInstance.buildingPlateId;
  buildingInstance.buildingPlate.buildingId = buildingInstance.buildingId;

  createUnits(buildingInstance);
  return buildingInstance;
}

function createUnits(buildingInstance) {
  var i;
  buildingInstance.units = [];
  for (i = 0; i < buildingInstance.unitCount; i++) {
    let unit = new unitObject();
    //let m = new buildingObject();
    unit.unitId = uuid.v4();
    unit.buildingId = buildingInstance.buildingId;
    unit.unitPlateId = uuid.v4();
    unit.displayIndex = i;

    unit.floorCount = buildingInstance.floorCount;
    unit.roomCount = buildingInstance.roomCount;

    unit.unitPlate.plateSuffixId = '1';
    unit.unitPlate.plateSuffixValue = '单元';
    unit.unitPlate.buildingPlateId = buildingInstance.buildingPlateId;
    unit.unitPlate.unitPlateId = unit.unitPlateId;
    unit.unitPlate.unitId = unit.unitId;
    unit.unitPlate.plateNumber = i + 1;
    unit.unitPlate.plateDesc = unit.unitPlate.plateNumber + '单元';
    unit.unitAlias = unit.unitPlate.plateNumber + '单元';
    createFloors(unit);

    //window.console.log(unit);//
    buildingInstance.units.push(unit);
  }

  return;
}

function createFloors(unitInstance) {
  var i;
  unitInstance.floors = [];
  for (i = 0; i < unitInstance.floorCount; i++) {
    let floor = new floorObject();
    floor.floorId = uuid.v4();
    floor.unitId = unitInstance.unitId;
    floor.buildingId = unitInstance.buildingId;
    floor.floorPlateId = uuid.v4();
    floor.roomCount = unitInstance.roomCount;
    floor.displayIndex = i;
    floor.floorPlate.unitPlateId = unitInstance.unitPlateId;
    floor.floorPlate.floorPlateId = floor.floorPlateId;
    floor.floorPlate.buildingPlateId = unitInstance.unitPlate.unitPlateId;
    floor.floorPlate.floorId = floor.floorId;
    floor.floorPlate.plateSuffixId = '01';
    floor.floorPlate.plateSuffixValue = '楼';
    floor.floorPlate.plateNumber = i + 1;
    floor.floorPlate.plateDesc = floor.floorPlate.plateNumber + '楼';
    floor.floorPlate.plateAlias = floor.floorPlate.plateNumber + '楼';
    floor.floorAlias = floor.floorPlate.plateNumber + '楼';

    createRooms(floor);
    unitInstance.floors.push(floor);
  }

  return;
}

function createRooms(floorInstance) {
  var i;
  floorInstance.rooms = [];
  for (i = 0; i < floorInstance.roomCount; i++) {
    let room = new roomObject();
    room.roomId = uuid.v4();
    room.floorId = floorInstance.floorId;
    room.buildingId = floorInstance.buildingId;
    room.roomPlateId = uuid.v4();
    room.displayIndex = i;
    room.roomPlate.roomPlateId = room.roomPlateId;
    room.roomPlate.roomId = room.roomId;
    room.roomPlate.floorPlateId = floorInstance.floorPlateId;
    room.roomPlate.buildingPlateId = floorInstance.floorPlate.buildingPlateId;
    var uId = floorInstance.floorPlate.plateNumber;
    room.roomPlate.plateNumber = String(uId) + '0' + String(i + 1);
    room.roomPlate.plateDesc = room.roomPlate.plateNumber + '室';
    room.roomPlate.plateAlias = room.roomPlate.plateNumber + '室';

    room.roomAlias = room.roomPlate.plateAlias;
    floorInstance.rooms.push(room);
  }

  return;
}

export { createBuildingStruct };
