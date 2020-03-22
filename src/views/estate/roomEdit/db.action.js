// import { commonFunction } from '@/api/base.js';
// eslint-disable-next-line no-unused-vars
import { $dialog, $toast } from '@/assets/common/common.js';
import api from '@/api';
const dbAction = {
  addNew: async function(oldData, postData) {
    postData.floor_id = oldData.objFloor.floor_id;
    postData.room_alias = postData.room_plate.plate_number + '室';

    postData.room_plate.worker_id = postData.worker_id;
    postData.room_plate.floor_plate_id = oldData.objFloor.floor_plate_id;
    postData.room_plate.plate_desc = postData.room_alias;

    const params = Object.assign({}, params, {
      room: postData
    });
    $toast.loading('正在保存...', 0);
    var res = await api.room.createRoom(params);
    try {
      $toast.close();
      if (res.data.statusCode !== '-1') {
        $toast.success('保存成功！', 1500);
        oldData.objFloor.rooms.push(res.data.result);
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

  updateFloor: async function(oldData, postData) {
    var roomPost = { room_plate: {} };
    roomPost.room_id = oldData.objRoom.room_id;
    roomPost.room_plate.room_plate_id = oldData.objRoom.room_plate_id;
    roomPost.floor_id = postData.floorId;
    roomPost.room_plate.floor_plate_id = postData.room_plate.floor_plate_id;
    const params = Object.assign({}, params, {
      room: roomPost
    });

    $toast.loading('正在保存...', 0);
    var res = await api.room.updateRoom(params);
    try {
      $toast.close();
      if (res.data.statusCode !== '-1') {
        $toast.success('保存成功！', 1500);
        // oldData.objRoom = { ...oldData.objRoom, ...roomPost };

        for (let key in roomPost) {
          oldData.objRoom[key] = roomPost[key];
        }
        //调整楼层缓存数据，从旧楼层删除room，在新楼层增加room
        oldData.objFloor.rooms.splice(oldData.roomIdx, 1);
        oldData.objUnit.floors[postData.display_index].rooms.push(oldData.objRoom);
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
      用修改后的room更新缓存中的对象，避免从数据库反复取数据
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
    var roomPost = { room_plate: {} };
    roomPost.room_id = oldData.objRoom.room_id;
    roomPost.room_plate.room_plate_id = oldData.objRoom.room_plate_id;
    roomPost.room_plate.plate_number = postData.plate_number;
    roomPost.room_alias = postData.plate_number + '室';
    roomPost.room_plate.plate_desc = roomPost.room_alias;

    const params = Object.assign({}, params, {
      room: roomPost
    });

    $toast.loading('正在保存...', 0);
    var res = await api.room.updateRoom(params);
    try {
      $toast.close();
      if (res.data.statusCode !== '-1') {
        $toast.success('保存成功！', 1500);
        delete roomPost.room_plate;
        // oldData.objRoom = { ...oldData.objRoom, ...roomPost };
        for (let key in roomPost) {
          oldData.objRoom[key] = roomPost[key];
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
      用修改后的room更新缓存中的对象，避免从数据库反复取数据
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
