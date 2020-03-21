import { commonFunction } from '@/api/base.js';
import { $toast } from '@/assets/common/common.js';
import api from '@/api';
const buildingPortal = {
  loadData: function(that) {
    const params = Object.assign({}, params, {
      params: { buildingId: that.$route.params.buildingId }
    });

    if (that.$route.params.buildingId !== undefined) {
      api.building.getBuildingById(params).then(
        res => {
          if (res.data.statusCode == '-1') {
            that.loading = false;
            $toast.alert('获取数据失败！\n' + JSON.stringify(res.data.result), 5000);
            return;
          }
          that.objBuilding = commonFunction.objectLineToHump(res.data.result);
          that.objBuilding.buildingPlate = commonFunction.objectLineToHump(
            that.objBuilding.buildingPlate
          );

          this.fetchUnits(params, that);
        },
        err => {
          that.loading = false;
          window.console.log(err.data.res);
        }
      );
    } else {
      // this.objBuilding = JSON.parse(JSON.stringify(this.$store.state.building));
      that.loading = false;
      that.objBuilding = JSON.parse(sessionStorage.getItem('building'));
    }
  },

  fetchFloorsAndRooms: async function(unit, that) {
    try {
      var res = await that.$api.building.getUnitChildrens(unit.unit_id);
      if (res.data.statusCode == '-1') {
        $toast.alert('获取数据失败！\n' + JSON.stringify(res.data.result), 5000);
      } else {
        unit.floors = res.data.result.floors;
        var rooms = res.data.result.rooms;

        putRoomInFloor(unit.floors, rooms);
        sessionStorage.setItem('building', JSON.stringify(that.objBuilding));
        that.$store.commit('building/setBuilding', that.objBuilding);
        that.loading = false;
      }

      that.loading = false;
    } catch (error) {
      that.loading = false;
      window.console.log(error);
    }
  },
  fetchUnits: async function(params, that) {
    try {
      var res = await that.$api.building.getBuildingUnits(params);
      if (res.data.statusCode == '-1') {
        $toast.alert('获取数据失败！\n' + JSON.stringify(res.data.result), 5000);
      } else {
        that.objBuilding.units = res.data.result;

        //默认获得第一个单元的数据
        this.fetchFloorsAndRooms(that.objBuilding.units[0], that);
      }
    } catch (error) {
      that.loading = false;
      window.console.log(error);
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
