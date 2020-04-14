<template>
  <div id="plate_prefix_control">
    <van-field label="楼栋后缀:" v-model="value" right-icon="arrow-down" input-align="right" placeholder="请输入楼栋门牌" @click="onFieldClick()">
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
  name: 'plate-suffix-control',
  data() {
    return {
      columns: [], //pick控件的选择列表对象
      showPicker: false,
      value: '',
      keyId: ''
    };
  },
  // props: ['selected-unit-name'],
  created() {
    var dictionary = JSON.parse(sessionStorage.getItem('dictionary'));
    this.columns = dictionary.buildingPlateSuffixList;
    this.keyId = this.$store.state.building.plateSuffixId;
    this.value = this.$store.state.building.plateSuffixValue;
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

      var i = this.$refs.picker.getIndexes()[0];
      this.value = this.columns[i].text;
      this.keyId = this.columns[i].keyId;
      this.$store.commit('building/setPlateSuffix', this.columns[i]);
      this.showPicker = false;
      this.$emit('suffix-picker-confirm', this.columns[i]);
    },
    onCancel() {
      const r = { keyId: '', text: '' };
      this.$store.commit('building/setPlateSuffix', r);
      this.$emit('suffix-picker-confirm', r);
      this.showPicker = false;
    },
    onFieldClick() {
      //选择单元field点击动作
      this.showPicker = true;
    }
  }
};
</script>


