<template>
  <div id="unit-edit " class="estate-page">
    <div class="estate-title">
      <div class="my-van">
        <van-nav-bar title="单元信息维护" left-text="返回" @click-left="onClickReturn" />
      </div>
    </div>

    <div class="estate-main">
      <div id="edit">
        <div v-show="!this.isAddnew">
          <van-cell-group title="原单元信息:">
            <van-field
              :value="this.oldData.objUnit.unit_alias"
              label="原门牌"
              input-align="right"
              right-icon=""
            />
          </van-cell-group>
        </div>
        <van-cell-group title="单元信息:">
          <van-field
            label="单元号："
            v-model="newPlateNumber"
            type="digit"
            required
            placeholder="请输入单元门牌号"
            right-icon=""
          />
          <van-field label="门牌后缀:" value="单元" required readonly />
          <van-field
            v-show="false"
            label="单元名称:"
            required
            placeholder="请输入单元名称"
            right-icon=""
          />
          <van-cell title="排位顺序 ">
            <van-stepper v-model="postData.display_index" min="1" max="20" />
          </van-cell>
          <van-cell v-show="false" title="每单元楼层数">
            <van-stepper min="1" max="20" />
          </van-cell>
          <van-cell v-show="false" title="每层户数">
            <van-stepper min="1" max="20" />
          </van-cell>
        </van-cell-group>
      </div>
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
          v-show="!isAddnew"
          type="danger"
          style=" height:30px;margin-top:4px;line-height:30px;"
          block
        >
          删除</van-button
        >
      </van-row>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import {
  NavBar,
  Icon,
  Stepper,
  Field,
  Button,
  Cell,
  CellGroup,
  Row,
  Col,
  RadioGroup,
  Radio,
  Popup,
  Picker
} from 'vant';
import 'vant/lib/nav-bar/style';
import 'vant/lib/stepper/style';
import 'vant/lib/field/style';
import 'vant/lib/button/style';
import 'vant/lib/cell/style';
import 'vant/lib/cell-group/style';
import 'vant/lib/row/style';
import 'vant/lib/col/style';
import 'vant/lib/radio-group/style';
import 'vant/lib/radio/style';
import 'vant/lib/popup/style';
import 'vant/lib/picker/style';
import { unitObject } from '@/api/type/building.type.js';
import dbAction from './db.action';

export default {
  name: 'unit-edit',
  data() {
    return {
      oldData: {
        objUnit: {},
        objBuilding: {}
      },
      newPlateNumber: '',
      postData: {}
    }; //保存选择需要修改的单元数据对象
  },
  created() {
    if (this.$route.params.action == undefined) {
      this.$router.push({
        name: 'building_portal'
      });
      return;
    }
    //从sessionStorage中获取当前修改的数据对象

    this.oldData.objBuilding = JSON.parse(sessionStorage.getItem('building'));
    this.postData = new unitObject();

    if (!this.isAddnew) {
      this.oldData.objUnit = this.oldData.objBuilding.units[this.$route.params.unitIdx];
      this.oldData.unitIdx = this.$route.params.unitIdx;
      this.newPlateNumber = this.oldData.objUnit.unit_alias.replace('单元', '');
      this.postData.display_index = this.oldData.objUnit.display_index;
    }
  },
  methods: {
    onClickReturn: function() {
      this.$router.push('/building/portal');
    },
    onSaveClick: function() {
      if (this.isAddnew) {
        this.postData.unit_plate.plate_number = this.newPlateNumber;
        dbAction.addNew(this.oldData, this.postData);
      } else {
        this.postData.plate_number = this.newPlateNumber;
        dbAction.update(this.oldData, this.postData);
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
    // 计算属性的 getter
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
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Stepper.name]: Stepper
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
