/* 
   统一所有使用到数据结构
 
*/
function buildingObject() {
  var buildingObject = {
    buildingId: '',
    estateId: '',
    buildingAlias: '',
    buildingPlateId: '',
    unitCount: 0,
    roomCount: 0,
    floorCount: 0,
    status: '0', //状态
    usedFlag: '', //是否已使用
    workerId: '',
    units: [],
    buildingPlate: {
      buildingId: '',
      buildingPlateId: '', //门牌编号
      estatePlateId: '',
      plateAlias: '', //门牌别名
      plateDesc: '', //门牌拼接后的全名
      platePrefixId: '', //前缀
      platePrefixValue: '',
      plateNumber: '', //门牌号
      plateSuffixId: '02', //后缀
      plateSuffixValue: '栋', //后缀
      status: '0', //状态
      workerId: '',
      usedFlag: '' //是否已使用
    }
  };
  return buildingObject;
}

function unitObject() {
  var unitObject = {
    unitId: '', //编号
    buildingId: '', //编号
    unitPlateId: '',
    floorCount: 0,
    unitAlias: '',
    roomCount: 0,
    workerId: '',
    status: 0, //状态
    usedFlag: 0, //是否已使用
    floors: [],
    displayIndex: 0,
    unitPlate: {
      unitId: '',
      unitPlateId: '', //编号
      buildingPlateId: '', //编号
      plateNumber: '',
      plateSuffixId: '01',
      plateSuffixValue: '单元',
      status: 0,
      usedFlag: 0,
      plateDesc: '',
      workerId: ''
    } //编号
  };
  return unitObject;
}

function floorObject() {
  var floorObject = {
    floorId: '', //编号
    unitId: '', //编号
    floorPlateId: '',
    floorAlias: '', //名称
    roomCount: 0,
    status: 0, //状态
    usedFlag: 0, //是否已使用
    rooms: [],
    workerId: '',
    displayIndex: 0,
    floorPlate: {
      unitPlateId: '', //编号
      floorPlateId: '', //编号
      floorId: '',
      plateDesc: '',
      status: 0,
      usedFlag: 0,
      workerId: '',
      plateNumber: '',
      plateSuffixValue: '楼',
      plateSuffixId: '1'
    } //编号
  };
  return floorObject;
}

function roomObject() {
  var roomObject = {
    roomId: '', //编号
    floorId: '',
    roomPlateId: '',
    roomAlias: '',
    status: 0,
    usedFlag: 0,
    workerId: '',
    displayIndex: 0,
    roomPlate: {
      roomId: '',
      floorPlateId: '', //编号
      roomPlateId: '', //编号
      plateNumber: '',
      plateSuffixId: '01',
      plateDesc: '',
      plateSuffixValue: '室',
      status: 0,
      usedFlag: 0,
      workerId: ''
    } //编号
  };
  return roomObject;
}
export { buildingObject, unitObject, floorObject, roomObject };
