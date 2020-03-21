<template>
  <div id="estate-portal " class="estate-page">
    <div class="estate-title">
      <div id="estates-header" class="my-van">
        <van-nav-bar title="门牌地址综合信息" @click-left="onClickReturn">
          <van-icon size="25" class-prefix="my-icon" name="arrow-left" slot="left" />
        </van-nav-bar>
      </div>
    </div>
    <div id="loading" v-if="loading">
      <van-loading size="60" type="spinner" />
    </div>
    <div v-if="!loading" class="estate-main">
      <es-portal-main-content :estateInstance="objEstate"></es-portal-main-content>

      <van-cell-group>
        <van-cell :value="'门牌:  ' + objEstate.estatePlate.plateDesc" />
      </van-cell-group>

      <van-cell-group title="楼栋信息" border>
        <van-button type="info" color="#409eff" @click="onClickAddBuilding" block>
          增加楼栋</van-button>
        <van-cell v-for="(item, building_id) in objEstate.buildings" :key="building_id" :label="'门牌: ' + objEstate.estatePlate.plateDesc+item.plate_desc" :title="'楼栋名称: ' + item.building_alias" @click="building_click(item.building_id)">
          <van-icon size="25" class-prefix="my-icon" name="arrow-right" slot="right-icon" />
        </van-cell>
      </van-cell-group>
      <!-- <es-input-main-buildings></es-input-main-buildings> -->
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
//import estateSummary from '@/components/estate/estate-summary.vue';
import { NavBar, Icon, CollapseItem, Collapse, Field, Button, Cell, CellGroup } from 'vant';
import 'vant/lib/nav-bar/style';
import 'vant/lib/tabs/style';
// import 'vant/lib/collapse/style';
// import 'vant/lib/collapse-item/style';
import 'vant/lib/tab/style';
import 'vant/lib/field/style';
import 'vant/lib/button/style';
import 'vant/lib/cell/style';
import 'vant/lib/cell-group/style';

import { commonFunction } from '@/api/base.js';
import esPortalMainContent from '@/components/estate/estatePortal/esPortalMainContent.vue';

export default {
  name: 'estatePortal',
  data() {
    return {
      loading: true,
      //声明一个产权登记项目实例
      // estateInstance: {
      //   estatePlate: ''
      // },
      objEstate: {}
    };
  },

  methods: {
    building_click: function(building_id) {
      // this.$router.push('/building/portal');
      this.$router.push({
        name: 'building_portal',
        params: {
          buildingId: building_id
        }
      });
    },
    onClickAddBuilding: function() {
      //只有用户角色为worker，才可以增加楼栋
      if (this.$store.state.user.role == 'worker') {
        //初使化building对象
        sessionStorage.setItem('building', '{}');
        this.$router.push({
          name: 'building_edit',
          params: {
            action: 'addnew'
          }
        });
      }
    },
    onClickReturn: function() {
      //用户角色不同，退回的地址也不同
      //  window.console.log(this.$store.state.user.role);
      if (this.$store.state.user.role == 'worker') {
        this.$router.push('/estate');
      }
      if (this.$store.state.user.role == 'auditor') {
        this.$router.push('/audit/portal');
      }
    },
    fetchData: function() {
      //接收传递进的ID

      const params = Object.assign({}, params, {
        params: { estate_id: this.$route.params.estateId }
      });

      /*   
         说明：  页面传参id是否没有值（，
         有值是从列表选中点击进入的，需要重新通过api获取实例对象）,
         无值是从其它页面回退的，需要从vuex中获取缓存对象
    */
      if (this.$route.params.estateId !== undefined) {
        //清理vuex中的缓存，设置为空

        this.$store.commit('estate/cleanEstate');
        // 根据用户ID获取用户信息
        this.$api.estate.getEstateById(params).then(
          res => {
            this.objEstate = commonFunction.objectLineToHump(res.data.result);
            this.objEstate.estatePlate = commonFunction.objectLineToHump(this.objEstate.estatePlate);

            this.$store.commit('estate/setEstate', this.objEstate);
            sessionStorage.setItem('estate', JSON.stringify(this.objEstate));
            this.loading = false;
          },
          err => {
            this.loading = false;
            this.$toast.fail('请求服务器数据出错', '3000');
            window.console.log('estateProtal.vue: 请求服务器数据出错' + err);
          }
        );
      } else {
        this.loading = false;
        this.objEstate = JSON.parse(sessionStorage.getItem('estate'));
        // this.estateInstance = this.$store.state.estate.estateInstance;
      }
    }
  },
  created() {
    //清理缓存

    this.fetchData();
  },
  beforeMount() {},

  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    // esPortalHeader,
    esPortalMainContent

    // esInputMainBuildings
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/style/my-vant';
</style>
