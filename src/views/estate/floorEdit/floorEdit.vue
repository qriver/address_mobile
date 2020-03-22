/* eslint-disable no-unused-vars */
<template>
  <div id="floor-edit " class="estate-page">
    <div class="estate-title">
      <div class="my-van">
        <van-nav-bar title="楼层信息维护" left-text="返回" @click-left="onClickReturn" />
      </div>
    </div>

    <div class="estate-main">
      <div id="edit">
        <van-cell-group title="原楼层信息:">
          <van-field
            :value="this.oldFloorName"
            v-show="!this.isAddnew"
            label="原门牌"
            input-align="right"
            placeholder="原来的楼层门牌号"
            right-icon=""
          />
          <van-field
            v-show="this.isAddnew"
            :value="this.oldData.objUnit.unit_alias"
            label="所在单元"
            input-align="right"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            label="楼层门牌:"
            v-model="newFloorPlate"
            required
            type="digit"
            input-align="right"
            placeholder="请楼层门牌号"
          />

          <van-field
            label="门牌后缀:"
            value="楼"
            readonly
            input-align="right"
            placeholder="请选择楼层门牌后缀"
          />
          <van-field
            v-show="false"
            label="楼层名称:"
            required
            placeholder="请输入楼层名称"
            input-align="right"
          />
          <van-cell title="排位顺序 ">
            <van-stepper v-model="postData.display_index" min="0" max="20" />
          </van-cell>
          <van-cell v-show="this.isAddnew" title="每层户数">
            <van-stepper min="0" max="20" />
          </van-cell>
        </van-cell-group>
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
            v-show="!this.isAddnew"
            type="danger"
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
import { NavBar, Icon, Field, Button, Stepper, Cell, CellGroup, Row, Col } from 'vant';
import 'vant/lib/nav-bar/style';

import 'vant/lib/field/style';
import 'vant/lib/button/style';
import 'vant/lib/cell/style';
import 'vant/lib/cell-group/style';
import 'vant/lib/row/style';
import 'vant/lib/col/style';

import 'vant/lib/stepper/style';

// eslint-disable-next-line no-unused-vars
import { commonFunction } from '@/api/base.js';
import { floorObject } from '@/api/type/building.type.js';
import dbAction from './db.action';

export default {
  name: 'floor-edit',
  data() {
    return {
      newFloorPlate: '',
      oldFloorName: '',
      oldData: {
        objUnit: {},
        objFloor: {},
        objBuilding: {}
      },
      //暂存表单数据的对象
      postData: {}
    };
  },
  methods: {
    onClickReturn: function() {
      this.$router.push('/building/portal');
    },
    onSaveClick: function() {
      if (this.isAddnew) {
        this.postData.floor_plate.plate_number = this.newFloorPlate;
        dbAction.addNew(this.oldData, this.postData);
      } else {
        this.postData.floor_plate.plate_number = this.newFloorPlate;
        dbAction.update(this.oldData, this.postData);
      }
    }
  },
  created() {
    if (this.$route.params.action == undefined) {
      this.$router.push({
        name: 'building_portal'
      });
      return;
    }
    //从sessionStorage中获取当前修改的数据对象
    //初始化对象赋值对象, 根据对象索引，从缓存中指定修改前的对象
    this.oldData.objBuilding = JSON.parse(sessionStorage.getItem('building'));
    this.oldData.objUnit = this.oldData.objBuilding.units[this.$route.params.unitIdx];
    this.oldData.unitIdx = this.$route.params.unitIdx;

    this.postData = new floorObject();
    this.postData.worker_id = this.$store.state.user.userId;
    this.postData.unit_id = this.oldData.objUnit.unit_id;
    this.postData.floor_plate.unit_plate_id = this.oldData.objUnit.unit_plate_id;
    if (!this.isAddnew) {
      this.oldData.objFloor = this.oldData.objUnit.floors[this.$route.params.floorIdx];
      this.oldData.floorIdx = this.$route.params.floorIdx;
      this.oldFloorName = this.oldData.objUnit.unit_alias + '/' + this.oldData.objFloor.floor_alias;
      this.newFloorPlate = this.oldData.objFloor.floor_alias.replace('楼', '');
      this.postData.display_index = this.oldData.objFloor.display_index;
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
    [Stepper.name]: Stepper,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Row.name]: Row,
    [Col.name]: Col
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
