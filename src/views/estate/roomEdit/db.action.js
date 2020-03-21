import { commonFunction } from '@/api/base.js';
// eslint-disable-next-line no-unused-vars
import { $dialog, $toast } from '@/assets/common/common.js';
import api from '@/api';
const dbAction = {
  addNew: async function(oldData, postData) {
    postData.floorId = oldData.objFloor.floor_id;
    postData.roomAlias = postData.roomPlate.plateNumber + '室';

    postData.roomPlate.workerId = postData.workerId;

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
  /* TODO:更新逻辑太复杂，能不能简化 */
  update: async function(oldData, postData) {
    postData.roomId = oldData.objRoom.room_id;
    postData.roomAlias = postData.roomPlate.plateNumber + '室';
    postData.roomPlate.roomPlateId = oldData.objRoom.room_plate_id;
    delete postData.roomPlate.roomId;
    delete postData.roomPlateId;
    postData.roomPlate.plateDesc = postData.roomAlias;
    postData.roomPlate.workerId = postData.workerId;

    const params = Object.assign({}, params, {
      room: postData
    });

    $toast.loading('正在保存...', 0);
    var res = await api.room.updateRoom(params);
    try {
      $toast.close();
      if (res.data.statusCode !== '-1') {
        $toast.success('保存成功！', 1500);
        postData.roomPlate = commonFunction.objectHumpToLine(postData.roomPlate);
        postData = commonFunction.objectHumpToLine(postData);

        oldData.room = { ...oldData.room, ...postData };

        //调整楼层缓存数据，从旧楼层删除room，在新楼层增加room
        oldData.objFloor.rooms.splice(oldData.roomIdx, 1);
        oldData.objUnit.floors[postData.display_index].rooms.push(oldData.room);
        //保存到缓存
        sessionStorage.setItem('building', JSON.stringify(oldData.objBuilding));
      } else {
        window.console.log(res.data.result);

        $toast.close();
        $toast.alert('保存失败\n' + JSON.stringify(res.data.result), 5000);
        return;
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
      return;
    }
  }
};

export default dbAction;
