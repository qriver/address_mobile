// eslint-disable-next-line no-unused-vars
import { $dialog, $toast } from '@/assets/common/common.js';
import api from '@/api';
const dbAction = {
  addNew: async function(oldData, postData) {
    postData.unit_id = oldData.objUnit.unit_id;
    postData.floor_alias = postData.floor_plate.plate_number + '楼';

    postData.floor_plate.worker_id = postData.worker_id;
    postData.floor_plate.unit_plate_id = oldData.objUnit.unit_plate_id;
    postData.floor_plate.plate_desc = postData.floor_alias;

    const params = Object.assign({}, params, {
      floor: postData
    });
    $toast.loading('正在保存...', 0);
    var res = await api.floor.createFloor(params);
    try {
      $toast.close();
      if (res.data.statusCode !== '-1') {
        $toast.success('保存成功！', 1500);
        if (oldData.objUnit.floors == undefined) {
          oldData.objUnit.floors = [];
        }
        oldData.objUnit.floors.push(res.data.result);
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
    var floorPost = { floor_plate: {} };
    floorPost.floor_id = oldData.objFloor.floor_id;
    floorPost.floor_alias = postData.floor_plate.plate_number + '楼';
    floorPost.display_index = postData.display_index;

    floorPost.floor_plate.floor_plate_id = oldData.objFloor.floor_plate_id;
    floorPost.floor_plate.plate_number = postData.floor_plate.plate_number;
    floorPost.floor_plate.plate_desc = floorPost.floor_alias;

    const params = Object.assign({}, params, {
      floor: floorPost
    });

    $toast.loading('正在保存...', 0);
    var res = await api.floor.updateFloor(params);
    try {
      $toast.close();
      if (res.data.statusCode !== '-1') {
        $toast.success('保存成功！', 1500);
        delete floorPost.floor_plate;
        for (let key in floorPost) {
          oldData.objFloor[key] = floorPost[key];
        }
        sessionStorage.setItem('building', JSON.stringify(oldData.objBuilding));
      } else {
        $toast.close();
        $toast.alert('保存失败\n' + JSON.stringify(res.data.result), 5000);
        return;
      }
    } catch (error) {
      $toast.close();
      $toast.alert('保存失败\n' + JSON.stringify(error), 5000);
      return error;
    }
  }
};

export default dbAction;
