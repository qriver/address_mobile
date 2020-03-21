<template>
  <div id="room-edit " class="estate-page">
    <div class="estate-title">
      <div class="my-van">
        <van-nav-bar title="房间信息维护" left-text="返回" @click-left="onClickReturn" />
      </div>
    </div>

    <div class="estate-main">
      <div id="edit">
        <van-cell-group title="原房间信息:">
          <van-field
            v-show="!this.isAddnew"
            label="原门牌"
            :value="this.oldRoomName()"
            input-align="right"
            placeholder="原来的房间门牌号"
          />
          <van-field
            v-show="this.isAddnew"
            label="所在楼层"
            :value="this.oldData.objFloor.floor_alias"
            input-align="right"
            placeholder="原来的房间门牌号"
          />
        </van-cell-group>
        <van-cell-group title="新房间信息:">
          <floor-picker
            v-show="!this.isAddnew"
            :objUnit="this.oldData.objUnit"
            @floor-picker-confirm="floorPickerConfirm"
          ></floor-picker>

          <van-field
            label="门牌号"
            required
            input-align="right"
            v-model="postData.roomPlate.plateNumber"
            placeholder="请输入新的房间门牌号"
            right-icon=""
          />
          <van-field label="门牌后缀:" input-align="right" readonly value="室" />
          <van-field
            label="产权证号:"
            input-align="right"
            placeholder="请输入产权信息"
            right-icon=""
          />
          <van-field
            label="产权人:"
            input-align="right"
            placeholder="请输入产权人身份证号"
            right-icon=""
          />
          <van-field
            label="产权人姓名:"
            input-align="right"
            placeholder="请输入产权人姓名"
            right-icon=""
          />
        </van-cell-group>
        <van-cell-group> </van-cell-group>
        <van-row style="margin-top:10px; ">
          <van-button
            style=" height:30px;line-height:30px;"
            type="info"
            color="#409eff"
            @click="onSaveClick()"
            block
          >
            保存</van-button
          >

          <van-button
            type="danger"
            v-show="!this.isAddnew"
            style=" height:30px;margin-top:4px;line-height:30px;"
            block
          >
            删除</van-button
          >
        </van-row>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
//import estateSummary from '@/components/estate/estate-summary.vue';
import { NavBar, Icon, Field, Button, Cell, CellGroup, Row, Col } from 'vant';
import 'vant/lib/nav-bar/style';
import 'vant/lib/field/style';
import 'vant/lib/button/style';
import 'vant/lib/cell/style';
import 'vant/lib/cell-group/style';
import 'vant/lib/row/style';
import 'vant/lib/col/style';

import floorPicker from '@/components/estate/buildingEdit/floorPicker.vue';
import { roomObject } from '@/api/type/building.type.js';
import dbAction from './db.action';

export default {
  name: 'roomEdit',
  data() {
    return {
      oldData: {
        objUnit: {},
        objFloor: {},
        objBuilding: {},
        objRoom: {}
      },
      postData: {}
    };
  },
  created() {
    if (this.$route.params.action == undefined) {
      this.$router.push({
        name: 'building_portal'
      });
      return;
    }
    //初始化对象赋值对象
    this.oldData.objBuilding = JSON.parse(sessionStorage.getItem('building'));
    this.oldData.objUnit = this.oldData.objBuilding.units[this.$route.params.unitIdx];
    this.oldData.unitIdx = this.$route.params.unitIdx;
    this.oldData.objFloor = this.oldData.objUnit.floors[this.$route.params.floorIdx];
    this.oldData.floorIdx = this.$route.params.floorIdx;
    this.postData = new roomObject();
    this.postData.workerId = this.$store.state.user.userId;
    this.postData.floorId = this.oldData.objFloor.floor_id;
    this.postData.roomPlate.floorPlateId = this.oldData.objFloor.floor_plate_id;

    if (!this.isAddnew) {
      this.oldData.objRoom = this.oldData.objFloor.rooms[this.$route.params.roomIdx];
      this.oldData.roomIdx = this.$route.params.roomIdx;
    }
  },
  methods: {
    onClickReturn: function() {
      this.$router.push('/building/portal');
    },

    floorPickerConfirm(value) {
      //value是floorPick组件选中的两个对象的index
      this.postData.floorId = value.floor_id;
      this.postData.roomPlate.floorPlateId = value.floor_plate_id;
      //displayIndex中记录的是room变更到的楼层的索引值
      this.postData.displayIndex = value.displayIndex;
    },

    onSaveClick: async function() {
      if (this.isAddnew) {
        dbAction.addNew(this.oldData, this.postData);
      } else {
        dbAction.update(this.oldData, this.postData);
      }
    },
    oldRoomName: function() {
      if (!this.isAddnew) {
        var name =
          this.oldData.objUnit.unit_alias +
          '/' +
          this.oldData.objFloor.floor_alias +
          '/' +
          this.oldData.objRoom.room_alias;
        return name;
      }
    }
  },
  computed: {
    isAddnew: function() {
      if (this.$route.params.action == 'addnew') {
        return true;
      } else {
        return false;
      }
    }
  },

  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Row.name]: Row,
    [Col.name]: Col,
    floorPicker
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/style/my-vant';
#unit {
  margin-top: 10px;
}
#layer {
  margin-top: 0px;
}
</style>
