/* 房产信息列表 */
<template>
  <div id="floor-picker">
    <van-row>
      <van-col span="20">
        <van-field
          label="修改楼层"
          required
          readonly
          :value="value"
          clickable
          input-align="left"
          placeholder="请选择楼层"
          @click="onFieldClick()"
        >
        </van-field>
      </van-col>
      <van-col span="4">
        <van-button
          style="margin-top:5px"
          size="small"
          hairline
          type="info"
          @click="onConfirm('save')"
          >保存
        </van-button>
      </van-col>
    </van-row>

    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        ref="picker"
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Icon, Field, Popup, Picker, Button, Row, Col } from 'vant';
// import 'vant/lib/cell-group/style';

import 'vant/lib/popup/style';
import 'vant/lib/picker/style';
import 'vant/lib/field/style';
import 'vant/lib/button/style';
import 'vant/lib/row/style';
import 'vant/lib/col/style';
export default {
  name: 'floor-picker',
  data() {
    return {
      columns: [], //pick控件的选择列表对象
      value: '',
      // objUnit: {},
      newRoomPlate: 0,
      postData: {},

      showPicker: false
    };
  },
  props: ['objUnit'],
  created() {
    //从sessionStorage中获取当前修改的数据对象
    // this.objUnit = JSON.parse(sessionStorage.getItem('building'));
    //  this.currentUnit.buildingId = this.buildingInstance.Id;
  },

  components: {
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Field.name]: Field,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon
  },

  methods: {
    onConfirm(action) {
      //pick选择界面弹出后，确认选择的数据对象

      this.showPicker = false;
      var unit = this.objUnit;
      var floor = unit.floors[this.$refs.picker.getIndexes()[0]];
      floor.displayIndex = this.$refs.picker.getIndexes()[0];
      this.value = floor.floor_alias;

      this.$emit('floor-picker-confirm', floor, action);
    },

    onCancel() {
      //pick选择界面弹出后，确认选择的数据对象

      // this.state = 1;
      // this.radio = '1';
      //window.console.log(this.currentUnit);
      this.showPicker = false;
    },
    onFieldClick() {
      //选择单元field点击动作
      if (this.columns.length == 0) {
        for (let i = 0; i < this.objUnit.floors.length; i++) {
          let column = {
            keyId: '',
            text: ''
          };
          column.keyId = i;
          column.text = this.objUnit.floors[i].floor_alias;
          this.columns.push(column);
        }
      }

      // if (this.roomPickValue.length) {
      //   var unit = this.buildingInstance.units[this.roomPickValue[0]];
      //   var floor = unit.floors[this.roomPickValue[1]];
      //   this.value = unit.unit_alias + '/' + floor.floor_alias;
      // }
      this.showPicker = true;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/style/my-vant';
</style>
