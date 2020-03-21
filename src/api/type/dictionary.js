//固定字典

//门牌前缀
const estatePlatePrefixList = [
  { keyId: '2001', text: '东' },
  { keyId: '2001', text: '南' },
  { keyId: '2001', text: '西' },
  { keyId: '2001', text: '北' }
];
//门牌后缀
const estatePlateSuffixList = [
  { keyId: '1', text: '号' },
  { keyId: '2', text: '组' },
  { keyId: '7', text: '区' },
  { keyId: '8', text: '幢' },
  { keyId: 'A', text: '门' }
];
//门牌附号前缀
const estateAttachedPlateSuffixList = [
  { keyId: '01', text: '东楼' },
  { keyId: '02', text: '西楼' },
  { keyId: '03', text: '南楼' },
  { keyId: '04', text: '北楼' },
  { keyId: '05', text: '前楼' },
  { keyId: '06', text: '后楼' },
  { keyId: '07', text: '平房' },
  { keyId: '08', text: '北' }
];
//门牌前缀
const buildingPlatePrefixList = [
  { keyId: '01', text: '东楼' },
  { keyId: '02', text: '西楼' },
  { keyId: '03', text: '南楼' },
  { keyId: '04', text: '北楼' },
  { keyId: '05', text: '前楼' },
  { keyId: '06', text: '后楼' },
  { keyId: '07', text: '平房' }
];
//楼栋门牌后缀
const buildingPlateSuffixList = [
  { keyId: '01', text: '幢' },
  { keyId: '02', text: '栋' },
  { keyId: '03', text: '排' },
  { keyId: '04', text: '舍' },
  { keyId: '05', text: '楼' },
  { keyId: '06', text: '号楼' },
  { keyId: '07', text: '弄' },
  { keyId: '07', text: '门' },
  { keyId: '07', text: '队' }
];
//楼栋附号门牌后缀
const buildingAttachedPlateSuffixList = [
  { keyId: '2001', text: '-' },
  { keyId: '2001', text: '-' }
];

export {
  estatePlatePrefixList,
  estateAttachedPlateSuffixList,
  estatePlateSuffixList,
  buildingPlatePrefixList,
  buildingPlateSuffixList,
  buildingAttachedPlateSuffixList
};
