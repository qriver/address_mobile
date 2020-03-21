import Mock from 'mockjs';

//引用自定义的接口数据对象
import estate from './mockdata/estate';
import user from './mockdata/user';
import building from './mockdata/building';
import dictionary from './mockdata/dictionary';
// const data = {
//   id: '@guid',
//   name: '@cname'
// };
//模拟延迟200-600毫秒
Mock.setup({
  timeout: '200-600'
});
Mock.mock('/mock/api/v1/estate/list_by_grid', 'get', estate.getEstateList);
Mock.mock('/mock/api/v1/estate/unaudited', 'get', estate.getEstateListUnaudited);
Mock.mock('/mock/api/v1/estate/audited', 'get', estate.getEstateListAudited);
Mock.mock('/mock/api/v1/estate/get', 'get', estate.getEstateById);
Mock.mock('/mock/api/v1/building/get', 'get', building.getBuildingById);
Mock.mock('/mock/api/v1/user/', 'get', user.getUserDetail);
// Mock.mock('/\/mock\/api\/v1/user(|\?\S*)$/', 'get', user.getUserDetail);

Mock.mock('/mock/api/v1/dictionary/get', 'get', dictionary.getDictionary);

// Mock.mock('/api/v1/estate/create', 'post', Estate.getEstateList);
// Mock.mock('/api/v1/estate/update', 'post', data);
// Mock.mock('/api/v1/estate/delete', 'get', data);
// Mock.mock('/api/v1/estate/get', 'get', data);
//Mock.mock('/api/v1/estate/get_child_builds_by_id', 'get', data);

export default Mock;
