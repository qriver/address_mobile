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

    unit.unit_id = uuid.v4();
    unit.building_id = buildingInstance.buildingId;
    unit.unit_plate_id = uuid.v4();
    unit.display_index = i;

    unit.floor_count = buildingInstance.floorCount;
    unit.room_count = buildingInstance.roomCount;

    unit.unit_plate.plate_suffix_id = '1';
    unit.unit_plate.plate_suffix_value = '单元';
    unit.unit_plate.building_plateId = buildingInstance.buildingPlateId;
    unit.unit_plate.unit_plate_id = unit.unit_plate_id;
    unit.unit_plate.unit_id = unit.unit_id;
    unit.unit_plate.plate_number = i + 1;
    unit.unit_plate.plate_desc = unit.unit_plate.plate_number + '单元';
    unit.unit_alias = unit.unit_plate.plate_number + '单元';
    createFloors(unit);

    //window.console.log(unit);//
    buildingInstance.units.push(unit);
  }

  return;
}

function createFloors(unitInstance) {
  var i;
  unitInstance.floors = [];
  for (i = 0; i < unitInstance.floor_count; i++) {
    let floor = new floorObject();
    floor.floor_id = uuid.v4();
    floor.unit_id = unitInstance.unit_id;

    floor.floor_plate_id = uuid.v4();
    floor.room_count = unitInstance.room_count;
    floor.display_index = i;
    floor.floor_plate.unit_plate_id = unitInstance.unit_plate_id;
    floor.floor_plate.floor_plateId = floor.floor_plate_id;
    floor.floor_plate.building_plateId = unitInstance.unit_plate.unit_plate_id;
    floor.floor_plate.floor_id = floor.floor_id;
    floor.floor_plate.plate_suffix_id = '01';
    floor.floor_plate.plate_suffix_value = '楼';
    floor.floor_plate.plate_number = i + 1;
    floor.floor_plate.plate_desc = floor.floor_plate.plate_number + '楼';
    floor.floor_plate.plate_alias = floor.floor_plate.plate_number + '楼';
    floor.floor_alias = floor.floor_plate.plate_number + '楼';

    createRooms(floor);
    unitInstance.floors.push(floor);
  }

  return;
}

function createRooms(floorInstance) {
  var i;
  floorInstance.rooms = [];
  for (i = 0; i < floorInstance.room_count; i++) {
    let room = new roomObject();
    room.room_id = uuid.v4();
    room.floor_id = floorInstance.floor_id;

    room.room_plate_id = uuid.v4();
    room.display_index = i;
    room.room_plate.room_plate_id = room.room_plate_id;
    room.room_plate.room_id = room.room_id;
    room.room_plate.floor_plate_id = floorInstance.floor_plate_id;

    var uId = floorInstance.floor_plate.plate_number;
    room.room_plate.plate_number = String(uId) + '0' + String(i + 1);
    room.room_plate.plate_desc = room.room_plate.plate_number + '室';
    // room.room_plate.plate_alias = room.room_plate.plate_number + '室';

    room.room_alias = room.room_plate.plate_number + '室';
    floorInstance.rooms.push(room);
  }

  return;
}

export { createBuildingStruct };
