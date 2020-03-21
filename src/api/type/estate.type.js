/* 
   统一所有使用到数据结构
     newObject=new estateObject();
*/
function estateObject() {
  var estateObject = {
    estateId: '', //编号
    name: '', //名称
    owner: '', //建设单位
    estatePlateId: '', //门牌
    areaNo: '', //宗地号
    purpose: '', //建筑功能
    buildingCount: 0, //建筑数量
    space: '', //面积
    position: '', // 位置
    auditStatus: '0',
    status: '0',
    workerId: '',
    usedFlag: '0',
    estatePlate: {
      estatePlateId: '', //门牌编号
      plateAlias: '', //门牌别名
      streetId: '',
      streetValue: '',
      plateDesc: '',
      platePrefixId: '', //前缀
      platePrefixValue: '', //前缀
      plateNumber: '', //门牌号
      plateSuffixId: '', //后缀
      plateSuffixValue: '', //后缀
      status: '', //状态
      usedFlag: '0' //是否已使用
    },

    buildings: []
  };
  return estateObject;
}
export { estateObject };
