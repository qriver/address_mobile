<template>
  <div id="estate-edit " class="estate-page">
    <div class="estate-title my-van">
      <van-nav-bar title="门牌地址登记" left-text="返回" @click-left="onClickReturn">
        <van-icon size="25" class-prefix="my-icon" name="arrow-left" slot="left" />
      </van-nav-bar>
    </div>

    <div class="estate-main">
      <van-tabs v-model="active">
        <!-- 门牌 -->
        <van-tab title="门牌号">
          <estate-plate ref="plateComponent" :estateInstance="objEstate" :action="action"></estate-plate>
          <van-row style="margin-top:10px;">
            <van-field label="项目名称:" v-model="objEstate.name" required input-align="right" placeholder="请输入土地证登记项目名称" />
            <van-field label="建设单位:" v-model="objEstate.owner" required input-align="right" placeholder="请输入土地证登记使用单位" />
          </van-row>

          <van-row style="margin-top:10px;">
            <van-field label="用地位置:" v-model="objEstate.position" input-align="right" placeholder="请输入用地位置" />
            <van-field label="宗地号:" v-model="objEstate.areaNo" input-align="right" placeholder="请输入宗地号" />
            <van-field label="建筑性质:" v-model="objEstate.type" input-align="right" placeholder="请输入建筑性质" />
            <van-field label="立项时间:" v-model="objEstate.createDate" input-align="right" placeholder="请输入立项时间" />
          </van-row>
          <van-row style="margin-top:10px;">
            <van-field label="栋数:" v-model="objEstate.buildingCount" input-align="right" placeholder="请输入栋数" />
            <van-field label="建筑面积:" v-model="objEstate.space" input-align="right" placeholder="请输入建筑面积" />
            <van-field label="建筑功能:" v-model="objEstate.purpose" input-align="right" placeholder="请输入建筑功能" />
          </van-row>
          <div style="width: 100%;height:60px;"></div>
          <div v-show="this.$store.state.user.role == 'worker'" class="estate-footer">
            <!-- <van-row v-show="this.$store.state.user.role == 'worker'" style="width:100%;margin-bottom:2px;margin-right:10px; "> -->
            <van-button style=" height:100%;width:100%;margin-right:10px" @click="onSaveClick()" plain type="info"> 保存</van-button>

            <van-button v-show="!isAddnew" plain type="info" color="#ff976a" style=" height:100%;width:100%;margin-right:10px" block @click="onDeleteClick()"> 删除</van-button>
            <!-- </van-row> -->
          </div>
        </van-tab>

        <van-tab title="权限分享"> </van-tab>
        <van-tab title="门牌历史"> </van-tab>
      </van-tabs>

      <div id="edit"></div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
//import estateSummary from '@/components/estate/estate-summary.vue';
import { NavBar, Field, Button, Row, Col, Tabs, Tab, Icon } from 'vant';
import 'vant/lib/nav-bar/style';
import 'vant/lib/tabs/style';
import 'vant/lib/tab/style';
import 'vant/lib/field/style';
import 'vant/lib/button/style';
import 'vant/lib/cell/style';
import 'vant/lib/cell-group/style';
import 'vant/lib/row/style';
import 'vant/lib/col/style';
import estatePlate from '@/components/estate/estateEdit/estatePlate.vue';
import { estateObject } from '@/api/type/estate.type.js';
import { SaveEstateToDb, UpdateEstateToDb, DeleteEstateFromDb } from './estateEdit.addon.js';

export default {
  name: 'estate-edit',
  data() {
    return {
      active: 0,
      objEstate: {},
      action: ''
    };
  },
  created: function() {
    this.action = this.$route.params.action;
    // var estate_id = this.$route.params.estate_id;
    // window.console.log(this.action);
    if (this.action == undefined) {
      this.$router.go(-1);
    }
    if (this.action === 'Addnew') {
      this.objEstate = new estateObject();
    }
    if (this.action === 'edit') {
      this.objEstate = JSON.parse(sessionStorage.getItem('estate'));
    }
  },
  computed: {
    // 计算属性的 getter
    isAddnew: function() {
      if (this.action == 'Addnew') {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    building_click: function() {
      this.$router.push('/building/portal');
    },
    onSaveClick: function() {
      if (this.action === 'Addnew') {
        this.objEstate.estatePlate = this.$refs.plateComponent.estatePlate;
        SaveEstateToDb(this.objEstate, this);
      }
      if (this.action === 'edit') {
        this.objEstate.estatePlate = this.$refs.plateComponent.estatePlate;
        UpdateEstateToDb(this);
      }
    },
    onDeleteClick: function() {
      this.objEstate.estatePlate = this.$refs.plateComponent.estatePlate;
      DeleteEstateFromDb(this);
    },
    onClickReturn: function() {
      this.$router.push('/estate/portal');
    }
  },
  components: {
    [NavBar.name]: NavBar,
    // [Icon.name]: Icon,
    [Field.name]: Field,
    [Button.name]: Button,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    estatePlate
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
