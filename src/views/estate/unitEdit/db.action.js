// import { commonFunction } from '@/api/base.js';
// eslint-disable-next-line no-unused-vars
import { $dialog, $toast } from '@/assets/common/common.js';
import api from '@/api';
const dbAction = {
  addNew: async function(oldData, postData) {
    postData.unit_alias = postData.unit_plate.plate_number + '单元';
    postData.building_id = oldData.objBuilding.buildingId;

    postData.unit_plate.worker_id = postData.worker_id;
    postData.unit_plate.building_plate_id = oldData.objBuilding.buildingPlateId;
    postData.unit_plate.plate_desc = postData.unit_alias;

    const params = Object.assign({}, params, {
      unit: postData
    });
    $toast.loading('正在保存...', 0);
    var res = await api.unit.createUnit(params);
    try {
      $toast.close();
      if (res.data.statusCode !== '-1') {
        $toast.success('保存成功！', 1500);
        if (oldData.objBuilding.units == undefined) {
          oldData.objBuilding.units = [];
        }
        oldData.objBuilding.units.push(res.data.result);
        sessionStorage.setItem('building', JSON.stringify(oldData.objBuilding));
      } else {
        $toast.close();
        $toast.alert('保存失败\n' + JSON.stringify(res.data.result), 5000);
        return;
      }
    } catch (error) {
      $toast.close();
      $toast.alert('保存失败\n' + JSON.stringify(res.data.result), 5000);
      return error;
    }
  },

  update: async function(oldData, postData) {
    var unitPost = { unit_plate: {} };
    unitPost.unit_id = oldData.objUnit.unit_id;
    unitPost.unit_plate.unit_plate_id = oldData.objUnit.unit_plate_id;
    unitPost.unit_alias = postData.plate_number + '单元';
    unitPost.unit_plate.plate_desc = unitPost.unit_alias;
    unitPost.display_index = postData.display_index;

    const params = Object.assign({}, params, {
      unit: unitPost
    });

    $toast.loading('正在保存...', 0);
    var res = await api.unit.updateUnit(params);
    try {
      $toast.close();
      if (res.data.statusCode !== '-1') {
        $toast.success('保存成功！', 1500);
        // oldData.objUnit = { ...oldData.objUnit, ...unitPost };

        for (let key in unitPost) {
          oldData.objUnit[key] = unitPost[key];
        }

        //保存到缓存
        sessionStorage.setItem('building', JSON.stringify(oldData.objBuilding));
        return true;
      } else {
        window.console.log(res.data.result);

        $toast.close();
        $toast.alert('保存失败\n' + JSON.stringify(res.data.result), 5000);
        return false;
      }
      /*
      to_do: 修改为提交更新后，重查本单元的数据并更新缓存
      用修改后的unit更新缓存中的对象，避免从数据库反复取数据
      修改后影响的字段更新原对象
    */
      // postData = commonFunction.objectHumpToLine(postData);
    } catch (error) {
      $toast.close();
      window.console.log(error);
      $toast.alert('保存失败\n' + JSON.stringify(error), 5000);
      return false;
    }
  },
  updatePlateNumber: async function(oldData, postData) {
    var unitPost = { unit_plate: {} };
    unitPost.unit_id = oldData.objUnit.unit_id;
    unitPost.unit_plate.unit_plate_id = oldData.objUnit.unit_plate_id;
    unitPost.unit_plate.plate_number = postData.plate_number;
    unitPost.unit_alias = postData.plate_number + '室';
    unitPost.unit_plate.plate_desc = unitPost.unit_alias;

    const params = Object.assign({}, params, {
      unit: unitPost
    });

    $toast.loading('正在保存...', 0);
    var res = await api.unit.updateRoom(params);
    try {
      $toast.close();
      if (res.data.statusCode !== '-1') {
        $toast.success('保存成功！', 1500);
        delete unitPost.unit_plate;
        // oldData.objUnit = { ...oldData.objUnit, ...unitPost };
        for (let key in unitPost) {
          oldData.objUnit[key] = unitPost[key];
        }
        //保存到缓存

        return true;
      } else {
        window.console.log(res.data.result);

        $toast.close();
        $toast.alert('保存失败\n' + JSON.stringify(res.data.result), 5000);
        return false;
      }
      /*
      to_do: 修改为提交更新后，重查本单元的数据并更新缓存
      用修改后的unit更新缓存中的对象，避免从数据库反复取数据
      修改后影响的字段更新原对象
    */
      // postData = commonFunction.objectHumpToLine(postData);
    } catch (error) {
      $toast.close();
      window.console.log(error);
      $toast.alert('保存失败\n' + JSON.stringify(error), 5000);
      return false;
    }
  }
};

export default dbAction;
