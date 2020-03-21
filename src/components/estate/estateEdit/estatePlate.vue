props: ['estateInstance','action']
<template>
  <div id="estate-plate">
    <!-- 项目情况介绍 -->

    <van-row style="margin-top:10px;">
      <van-field v-show="false" label="省/市/区:" required input-align="right" right-icon="arrow" placeholder="请输入省/市/区" />
      <van-field label="街路巷:" v-model="estatePlate.streetValue" required readonly clickable right-icon="arrow-down" input-align="right" placeholder="请输入街路巷" @click="onFieldClick('street')">
        <van-icon size="25" class-prefix="my-icon" name="arrow-right" slot="right-icon" />
      </van-field>
      <van-field v-show="false" label="门牌前缀:" v-model="estatePlate.platePrefixValue" readonly clickable right-icon="arrow-down" input-align="right" placeholder="请输入门牌前缀" @click="onFieldClick('prefix')">
        <van-icon size="25" class-prefix="my-icon" name="arrow-right" slot="right-icon" />
      </van-field>
      <van-field label="门牌号:" v-model="estatePlate.plateNumber" type="digit" required input-align="right" placeholder="请输入门牌号" />
      <van-field label="门牌后缀:" v-model="estatePlate.plateSuffixValue" required right-icon="arrow-down" input-align="right" placeholder="请输入门牌后缀" @click="onFieldClick('suffix')">
        <van-icon size="25" class-prefix="my-icon" name="arrow-right" slot="right-icon" />
      </van-field>

      <van-row style="margin-top:1px;">
        <van-field label="门牌别名:" v-model="estatePlate.plateAlias" required input-align="right" placeholder="例:XX小区/xxx私宅/xxx大厦" />
      </van-row>
      <van-row v-show="false" style="margin-top:1px;">
        <van-field label="门牌全称:" v-model="estatePlate.plateDesc" readonly input-align="right" placeholder="门牌拼接后的全称" />
      </van-row>
    </van-row>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script>
// @ is an alias to /src
// import Estate from '@/views/Estate.vue'
import { Icon, Row, Col, Field, Popup, Picker } from 'vant';
import 'vant/lib/nav-bar/style';
import 'vant/lib/row/style';
import 'vant/lib/col/style';
import 'vant/lib/field/style';
import 'vant/lib/popup/style';
import 'vant/lib/picker/style';
import { estateObject } from '@/api/type/estate.type.js';

export default {
  data() {
    return {
      dictionary: {},
      showPicker: false,
      streetColumns: {},
      prefixColumns: {},
      suffixColumns: {},
      attachedSuffixColumns: {},
      action: '',
      currentFieldName: '',
      currentValue: '',
      columns: {},
      orgEstatePlate: {}, //避免restful接口返回的数据结构与本地定义不一致，原始对象不直接参与渲染
      estatePlate: {}
    };
  },
  created: function() {
    this.dictionary = JSON.parse(sessionStorage.getItem('dictionary'));
    this.streetColumns = this.dictionary.streetList;
    this.prefixColumns = this.dictionary.estatePlatePrefixList;
    this.suffixColumns = this.dictionary.estatePlateSuffixList;
    // this.attachedSuffixColumns = this.dictionary.estateAttachedPlateSuffixList;
    this.estatePlate = new estateObject().estatePlate;
    this.action = this.$attrs.action;
    if (this.action === 'edit') {
      //var estateInstance = JSON.parse(sessionStorage.getItem('estate'));
      //  this.orgEstatePlate = estateInstance.estatePlate;
      this.estatePlate = JSON.parse(sessionStorage.getItem('estate')).estatePlate;
    }
  },
  methods: {
    onConfirm(value) {
      if (this.currentFieldName == 'street') {
        this.estatePlate.streetValue = value.text;
        this.estatePlate.streetId = value.keyId;
      }
      if (this.currentFieldName == 'prefix') {
        this.estatePlate.platePrefixValue = value.text;
        this.estatePlate.platePrefixId = value.keyId;
      }
      if (this.currentFieldName == 'suffix') {
        this.estatePlate.plateSuffixValue = value.text;
        this.estatePlate.plateSuffixId = value.keyId;
      }

      // this.value = value.text;
      this.showPicker = false;
    },
    onFieldClick(name) {
      if (name == 'street') {
        this.currentFieldName = 'street';
        this.showPicker = true;
        this.currentValue = this.estatePlate.streetValue;
        this.columns = this.streetColumns;
      }
      if (name == 'prefix') {
        this.currentFieldName = 'prefix';
        this.showPicker = true;
        this.currentValue = this.estatePlate.platePrefixValue;
        this.columns = this.prefixColumns;
      }
      if (name == 'suffix') {
        this.currentFieldName = 'suffix';
        this.showPicker = true;
        this.currentValue = this.estatePlate.plateSuffixvalue;
        this.columns = this.suffixColumns;
      }
    }
  },
  // computed: {
  //   prefix() {
  //     // window.log.console(this.$store.state.estate);
  //     return this.$store.state.estate.estateInstance.estatePlate.estatePlateId;
  //   }
  // },
  components: {
    // [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  }
};
</script>

<style lang="scss" scoped>
// @import '@/assets/style/my-vant';
</style>
