<template>
  <div id="plate_prefix_control">
    <van-field label="楼栋前缀:" v-model="value" right-icon="arrow-down" input-align="right" placeholder="请输入楼栋门牌" @click="onFieldClick()">
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
  name: 'plate-prefix-control',
  data() {
    return {
      columns: [], //pick控件的选择列表对象
      value: '',
      keyId: '',
      showPicker: false
    };
  },
  // props: ['selected-unit-name'],
  created() {
    var dictionary = JSON.parse(sessionStorage.getItem('dictionary'));
    this.columns = dictionary.buildingPlatePrefixList;
    this.keyId = this.$store.state.building.platePrefixId;
    this.value = this.$store.state.building.platePrefixValue;
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
      this.$store.commit('building/setPlatePrefix', this.columns[i]);

      this.showPicker = false;
    },
    onCancel() {
      this.value = '';
      this.keyId = '';
      const r = { keyId: '', value: '' };
      this.$store.commit('building/setPlatePrefix', r);

      this.showPicker = false;
    },
    onFieldClick() {
      //选择单元field点击动作
      this.showPicker = true;
    }
  }
};
</script>


