<template>
  <div id="building-portal-page " class="building-portal-page">
    <div class="estate-title">
      <div class="my-van">
        <van-nav-bar title="楼栋综合信息" left-text="返回" @click-left="onClickReturn">
        </van-nav-bar>
      </div>
    </div>

    <div id="loading" v-if="loading">
      <van-loading size="60" type="spinner" />
    </div>
    <div v-if="!loading" class="estate-main">
      <!-- 项目简要信息 -->

      <van-cell-group>
        <van-cell
          :title="this['estate/getters_plateDesc'] + this.plate.plateDesc"
          @click="onClickBuilding"
        >
          <van-icon size="25" class-prefix="my-icon" name="arrow-right" slot="right-icon" />
        </van-cell>
        <van-cell title="维护数据">
          <van-switch size="20" v-model="allowModify" slot="right-icon" />
        </van-cell>
      </van-cell-group>
      <!-- 单元\楼层\房间 显示-->
      <div v-if="!loading" id="display-area">
        <van-tabs v-model="active" @click="onTabClick">
          <div slot="nav-right" style=" margin-top:5px;margin-right:12px">
            <van-icon
              v-show="allowModify"
              class-prefix="my-icon"
              color="#c8c9cc"
              name="arrow-right"
              size="30"
              @click="editUnitClick('addnew')"
            />
          </div>

          <van-tab
            v-for="(unit, unit_id) in objBuilding.units"
            :key="unit_id"
            :title="unit.unit_alias"
          >
            <!--显示单元  -->
            <div slot="title">
              {{ unit.unit_alias }}
              <van-icon
                v-show="allowModify"
                class-prefix="my-icon"
                name="chuangzuo"
                size="14"
                @click="editUnitClick('edit', unit)"
              />
            </div>
            <!-- 定义一个不显示标签，记录每一个元素对应的索引值 -->
            <div v-show="false">{{ (unit.display_index = unit_id) }}</div>
            <div v-if="unit.floors">
              <van-row
                type="flex"
                justify="center"
                align="center"
                v-for="(floor, floor_id) in unit.floors"
                :key="floor_id"
              >
                <!--显示楼层 用van-tag展现 -->
                <van-col span="6">
                  <div class="span">
                    <!-- 定义一个不显示标签，记录每一个元素对应的索引值 -->
                    <div v-show="false">{{ (floor.display_index = floor_id) }}</div>
                    <van-tag type="primary" size="large" plain>
                      <div slot="default">
                        {{ floor.floor_alias }}
                        <van-icon
                          v-show="allowModify"
                          class-prefix="my-icon"
                          name="chuangzuo"
                          size="14"
                          @click="editFloorClick('edit', unit, floor)"
                        />
                      </div>
                    </van-tag>
                  </div>
                </van-col>
                <!--显示房间  -->
                <van-col span="14">
                  <!-- -->
                  <div class="room">
                    <div v-for="(room, room_id) in floor.rooms" :key="room_id">
                      <!-- 定义一个不显示标签，记录每一个元素对应的索引值 -->
                      <div v-show="false">{{ (room.display_index = room_id) }}</div>
                      <van-tag
                        type="sucess"
                        round
                        size="medium"
                        plain
                        @click="editRoomClick('edit', unit, floor, room)"
                        >门牌:{{ room.room_alias }}</van-tag
                      >
                    </div>
                  </div>
                </van-col>
                <!--楼层新增房间 -->
                <van-col span="4">
                  <van-icon
                    v-show="allowModify"
                    class-prefix="my-icon"
                    color="#c8c9cc"
                    name="add-select"
                    size="30"
                    @click="editRoomClick('addnew', unit, floor)"
                  />
                </van-col>
              </van-row>
              <!--新增楼层-->
              <van-row>
                <van-icon
                  v-show="allowModify"
                  @click="editFloorClick('addnew', unit)"
                  class-prefix="my-icon"
                  color="#c8c9cc"
                  name="add-select"
                  size="30"
                />
              </van-row>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>
<script>
//import estateSummary from '@/components/estate/estate-summary.vue';
import {
  NavBar,
  Icon,
  Tag,
  Field,
  Button,
  Cell,
  CellGroup,
  Row,
  Col,
  Switch,
  Tabs,
  Tab
} from 'vant';
import 'vant/lib/nav-bar/style';
import 'vant/lib/tabs/style';
import 'vant/lib/collapse/style';
import 'vant/lib/collapse-item/style';
import 'vant/lib/tab/style';
import 'vant/lib/field/style';
import 'vant/lib/button/style';
import 'vant/lib/cell/style';
import 'vant/lib/cell-group/style';
import 'vant/lib/row/style';
import 'vant/lib/col/style';
import 'vant/lib/tag/style';
import 'vant/lib/switch/style';
import { mapGetters } from 'vuex';

// import { commonFunction } from '@/api/base.js';
import { $toast } from '@/assets/common/common.js';
import buildingPortal from '@/views/estate/buildingPortal/buildingPortal.addon';
// import esPortalMainBuildings from '@/components/estate/estatePortal/esPortalMainBuildings.vue';

export default {
  name: 'building-portal',
  data() {
    return {
      loading: true,
      active: 0,
      buildingId: '',
      objBuilding: {},
      allowModify: false,
      menuShow: false
    };
  },
  created() {
    //接收传递进的ID
    buildingPortal.loadData(this);

    // const params = Object.assign({}, params, {
    //   params: { buildingId: this.$route.params.buildingId }
    // });
    // /*
    //          说明：  页面传参id是否没有值（没有值是从其它页面回退回来，
    //          有值是从列表选中点击进入的，需要重新通过api获取实例对象）,
    //          无值是从其它页面回退的，需要从sessionStorage中获取缓存对象
    //     */

    // if (this.$route.params.buildingId !== undefined) {
    //   this.$api.building.getBuildingById(params).then(
    //     res => {
    //       if (res.data.statusCode == '-1') {
    //         $toast.alert('获取数据失败！\n' + JSON.stringify(res.data.result), 5000);
    //         return;
    //       }
    //       this.objBuilding = commonFunction.objectLineToHump(res.data.result);
    //       this.objBuilding.buildingPlate = commonFunction.objectLineToHump(
    //         this.objBuilding.buildingPlate
    //       );

    //       this.fetchUnits(params);
    //     },
    //     err => {
    //       this.loading = false;
    //       window.console.log(err.data.res);
    //     }
    //   );
    // } else {
    //   // this.objBuilding = JSON.parse(JSON.stringify(this.$store.state.building));
    //   this.loading = false;
    //   this.objBuilding = JSON.parse(sessionStorage.getItem('building'));
    // }
  },
  computed: {
    ...mapGetters([
      'estate/getters_plateDesc',
      'estate/getters_estateId',
      'estate/getters_estatePlateId'
    ]),

    plate: function() {
      return this.objBuilding.buildingPlate;
    }
  },
  methods: {
    fetchUnits: async function(params) {
      try {
        var res = await this.$api.building.getBuildingUnits(params);
        if (res.data.statusCode == '-1') {
          $toast.alert('获取数据失败！\n' + JSON.stringify(res.data.result), 5000);
        } else {
          this.objBuilding.units = res.data.result;
          //默认获得第一个单元的数据
          this.fetchFloorsAndRooms(this.objBuilding.units[0]);
        }
      } catch (error) {
        this.loading = false;
        window.console.log(error);
      }
    },
    fetchFloorsAndRooms: async function(unit) {
      try {
        var res = await this.$api.building.getUnitChildrens(unit.unit_id);
        if (res.data.statusCode == '-1') {
          $toast.alert('获取数据失败！\n' + JSON.stringify(res.data.result), 5000);
        } else {
          unit.floors = res.data.result.floors;
          var rooms = res.data.result.rooms;

          this.putRoomInFloor(unit.floors, rooms);
          sessionStorage.setItem('building', JSON.stringify(this.objBuilding));
          this.$store.commit('building/setBuilding', this.objBuilding);
          this.loading = false;
        }

        this.loading = false;
      } catch (error) {
        this.loading = false;
        window.console.log(error);
      }
    },
    putRoomInFloor: function(floors, rooms) {
      for (var i = 0; i < floors.length; i++) {
        var tmp = [];
        floors[i].rooms = tmp;
        for (var j = 0; j < rooms.length; j++) {
          if (rooms[j].floor_id == floors[i].floor_id) {
            floors[i].rooms.push(rooms[j]);
          }
        }
      }
    },
    onTabClick: function(name) {
      this.loading = true;
      var unit = this.objBuilding.units[name];
      this.fetchFloorsAndRooms(unit);
    },

    editRoomClick: function(action, unit, floor, room) {
      if (action == 'addnew') {
        //   sessionStorage.setItem('unit', JSON.stringify(unit));
        this.$router.push({
          name: 'room_edit',
          params: {
            action: 'addnew',
            unitIdx: unit.display_index,
            floorIdx: floor.display_index
          }
        });
      } else {
        // sessionStorage.setItem('unit', JSON.stringify(unit));
        this.$router.push({
          name: 'room_edit',
          params: {
            action: 'edit',
            unitIdx: unit.display_index,
            floorIdx: floor.display_index,
            roomIdx: room.display_index
          }
        });
      }
    },
    editFloorClick: function(action, unit, floor) {
      if (action == 'addnew') {
        this.$router.push({
          name: 'floor_edit',
          params: {
            action: 'addnew',
            unitIdx: unit.display_index
          }
        });
      } else {
        this.$router.push({
          name: 'floor_edit',
          params: {
            action: 'edit',
            unitIdx: unit.display_index,
            floorIdx: floor.display_index
          }
        });
      }
    },
    editUnitClick: function(action, unit) {
      if (action == 'addnew') {
        this.$router.push({
          name: 'unit_edit',
          params: {
            action: 'addnew'
          }
        });
      } else {
        sessionStorage.setItem('unit', JSON.stringify(unit));
        this.$router.push({
          name: 'unit_edit',
          params: {
            action: 'edit',
            unitIdx: unit.display_index
          }
        });
      }
    },

    onClickReturn: function() {
      this.$router.push('/estate/portal');
    },

    onClickBuilding: function() {
      this.$router.push({
        name: 'building_edit',
        params: {
          buildingId: this.objBuilding.buildingId,
          action: 'edit'
        }
      });
      //this.$router.push('/building/edit');
    }
  },

  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Switch.name]: Switch,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tag.name]: Tag,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [CellGroup.name]: CellGroup
    // esInputMainBuildings
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/style/my-vant';

#display-area {
  width: 100%;
  margin-top: 20px;
  text-align: center;
}

.building-portal-page .estate-main .van-row {
  background-color: white;
  margin-top: 2px;
  height: 100%;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
}
// .building-portal-page .estate-main .van-icon {
//   // color: white;
// }
.room {
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.building-portal-page .estate-main .van-col {
  background-color: white;
  height: 100%;
  white-space: normal;
  word-break: word-wrap;
  overflow: hidden;
  .span {
    margin-top: 0px;
    margin-left: 12px;
    justify-content: center;
    align-items: center;
    color: $gray-7;
  }
}

.building-portal-page .van-button {
  height: 35px;
  line-height: 35px;
  .van-icon {
    color: white;
  }
  margin-top: 2px;
  scroll-margin-bottom: 2px;
}

.building-portal-page .van-tag {
  color: $green;
}
</style>
