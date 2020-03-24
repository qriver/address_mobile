import { commonFunction } from '@/api/base.js';

import api from '@/api';
import store from '@/store';
const buildingPortal = {
  loadData: async function(buildingId) {
    var objBuilding = '';

    if (buildingId !== undefined) {
      try {
        const params = Object.assign({}, params, {
          params: { buildingId }
        });
        buildingId = params;
        var res = await api.building.getBuildingById(buildingId);

        if (res.data.statusCode == '-1') {
          return Error(res.data.result);
        }

        objBuilding = commonFunction.objectLineToHump(res.data.result);
        objBuilding.buildingPlate = commonFunction.objectLineToHump(objBuilding.buildingPlate);

        //获取单元数据
        res = await api.building.getBuildingUnits(buildingId);

        if (res.data.statusCode == '-1') {
          return Error(res.data.result);
        }
        objBuilding.units = res.data.result;
        //默认获得第一个单元的数据
        var unit = objBuilding.units[0];
        res = await api.building.getUnitChildrens(unit.unit_id);
        if (res.data.statusCode == '-1') {
          return Error(res.data.result);
        }

        unit.floors = res.data.result.floors;
        var rooms = res.data.result.rooms;
        putRoomInFloor(unit.floors, rooms);
        store.commit('viewBuildingPortal/setModifyStatus', false);
        store.commit('viewBuildingPortal/setTabIndex', 0);
        this.isModify = false;

        sessionStorage.setItem('building', JSON.stringify(objBuilding));
        return objBuilding;
      } catch (error) {
        return error;
      }
    } else {
      return (objBuilding = JSON.parse(sessionStorage.getItem('building')));
    }
  },

  fetchFloorsAndRooms: async function(unit, objBuilding) {
    try {
      var res = await api.building.getUnitChildrens(unit.unit_id);
      if (res.data.statusCode == '-1') {
        // $toast.alert('获取数据失败！\n' + JSON.stringify(res.data.result), 5000);
      } else {
        unit.floors = res.data.result.floors;
        var rooms = res.data.result.rooms;

        putRoomInFloor(unit.floors, rooms);
        sessionStorage.setItem('building', JSON.stringify(objBuilding));
        return true;
      }
    } catch (error) {
      return error;
    }
  },
  fetchUnits: async function(unit, objBuilding) {
    //   try {
    //     var res = await that.$api.building.getBuildingUnits(params);
    //     if (res.data.statusCode == '-1') {
    //       // $toast.alert('获取数据失败！\n' + JSON.stringify(res.data.result), 5000);
    //     } else {
    //       that.objBuilding.units = res.data.result;

    //       //默认获得第一个单元的数据
    //       this.fetchFloorsAndRooms(that.objBuilding.units[0], that);
    //     }
    //   } catch (error) {
    //     that.loading = false;
    //     window.console.log(error);
    //   }
    // }
    try {
      var res = await api.building.getUnitChildrens(unit.unit_id);
      if (res.data.statusCode == '-1') {
        return Error(res.data.result);
      }

      unit.floors = res.data.result.floors;
      var rooms = res.data.result.rooms;
      putRoomInFloor(unit.floors, rooms);

      sessionStorage.setItem('building', JSON.stringify(objBuilding));
    } catch (error) {
      return error;
    }
  }
};

const putRoomInFloor = function(floors, rooms) {
  for (var i = 0; i < floors.length; i++) {
    var tmp = [];
    floors[i].rooms = tmp;
    for (var j = 0; j < rooms.length; j++) {
      if (rooms[j].floor_id == floors[i].floor_id) {
        floors[i].rooms.push(rooms[j]);
      }
    }
  }
};

export default buildingPortal;
