<template>
  <div id="unit-field">
    <van-field
      label="请选择单元:"
      :value="value"
      required
      readonly
      clickable
      input-align="right"
      placeholder="请选择待修改的单元"
      @click="onFieldClick()"
    >
      <van-icon size="25" class-prefix="my-icon" name="arrow-right" slot="right-icon" />
    </van-field>
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
import { Icon, Field, Popup, Picker } from 'vant';
// import 'vant/lib/cell-group/style';

import 'vant/lib/popup/style';
import 'vant/lib/picker/style';
import 'vant/lib/field/style';

export default {
  name: 'unit-field',
  data() {
    return {
      columns: [], //pick控件的选择列表对象
      buildingInstance: {},
      value: '',
      key: '',
      showPicker: false,
      currentUnitIndex: 0
    };
  },
  props: ['selected-unit-name'],
  created() {
    //从sessionStorage中获取当前修改的数据对象
    this.buildingInstance = JSON.parse(sessionStorage.getItem('building'));

    //从缓存对象中获得用于选择的"单元"对象
    if (this.columns.length == 0) {
      for (let i = 0; i < this.buildingInstance.units.length; i++) {
        let column = {
          keyId: '',
          text: ''
        };
        column.keyId = i;
        column.text = this.buildingInstance.units[i].unit_alias;
        this.columns.push(column);
      }
    }
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
      var index = this.$refs.picker.getIndexes()[0];
      this.showPicker = false;
      this.value = this.columns[index].text;
      this.key = this.columns[index].keyId;
      this.$emit('unit-picker-confirm', index);
    },
    onCancel() {
      //pick选择界面弹出后，确认选择的数据对象
      this.currentUnit = {};
      // this.state = 1;
      // this.radio = '1';
      //window.console.log(this.currentUnit);
      this.showPicker = false;
    },
    onFieldClick() {
      //选择单元field点击动作
      this.showPicker = true;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/style/my-vant';
</style>
