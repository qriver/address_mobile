/* 房产信息列表 */
<template>
  <div id="floor-picker">
    <van-field label="新的楼层" required readonly :value="value" clickable input-align="right" placeholder="请选择楼层" @click="onFieldClick()">
      <van-icon size="25" class-prefix="my-icon" name="arrow-right" slot="right-icon" />
    </van-field>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker ref="picker" show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script>
import { Icon, Field, Popup, Picker } from 'vant';
// import 'vant/lib/cell-group/style';

import 'vant/lib/popup/style';
import 'vant/lib/picker/style';
import 'vant/lib/field/style';

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
    [Icon.name]: Icon
  },

  methods: {
    onConfirm() {
      //pick选择界面弹出后，确认选择的数据对象

      this.showPicker = false;
      var unit = this.objUnit;
      var floor = unit.floors[this.$refs.picker.getIndexes()[0]];
      floor.displayIndex = this.$refs.picker.getIndexes()[0];
      this.value = floor.floor_alias;

      this.$emit('floor-picker-confirm', floor);
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
