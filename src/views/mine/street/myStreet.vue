<template>
  <div id="my-street" class="estate-page">
    <div class="my-van">
      <van-nav-bar title="我的街路巷" left-text="返回" @click-left="onClickReturn" left-arrow />
    </div>
    <div class="estate-main">
      <van-cell-group>
        <van-cell
          v-for="(item, keyId) in streetList"
          :key="keyId"
          is-link
          :title="item.text"
          icon="shop-o"
          @click="onSaveClick"
        >
          <van-icon slot="right-icon" name="delete" style="line-height: inherit;" />
        </van-cell>
      </van-cell-group>
      <van-row style="margin-top:10px; ">
        <van-button
          v-show="allowSave"
          style=" height:30px;line-height:30px;"
          type="info"
          color="#409eff"
          @click="onSaveClick()"
          block
        >
          增加</van-button
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

export default {
  name: 'my-street',
  data() {
    return {
      streetList: {}
    }; //保存选择需要修改的单元数据对象
  },
  created() {
    this.streetList = JSON.parse(sessionStorage.getItem('dictionary')).streetList;
  },
  methods: {
    onClickReturn: function() {
      this.$router.push('/mine/portal');
    },
    onSaveClick: function() {
      //
    }
  },
  computed: {
    // 计算属性的 getter
    allowSave: function() {
      // `this` 指向 vm 实例
      if (this.state !== 2) {
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
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Popup.name]: Popup,
    [Picker.name]: Picker
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
