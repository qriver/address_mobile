<template>
  <div id="draw-rooms" class="building-portal-page">
    <div class="estate-title">
      <div class="my-van">
        <van-nav-bar title="楼栋结构图" left-text="返回" right-text='保存' @click-right="onClickRight" @click-left="onClickReturn">

          <van-icon class-prefix="my-icon" name="arrow-left" size="20" slot="left" />

        </van-nav-bar>
      </div>
    </div>

    <div class="estate-main">
      <!-- 项目简要信息 -->
      <van-cell-group>
        <van-cell title='门牌号码' :value="estatePlateDesc " />

        <van-cell title='楼栋号码' :value="objBuilding.buildingPlate.plateDesc" />
      </van-cell-group>
      <!-- 单元\房间 结构显示-->
      <div id="display-area">
        <van-tabs v-model="active">
          <van-tab v-for="(unit, id) in objBuilding.units" :key="id" :title="unit.unitAlias">
            <van-row v-for="(floor, id) in unit.floors" :key="id">
              <van-col span="4">
                <div class="span">{{ floor.floorAlias }}</div>
              </van-col>
              <van-col span="20">
                <!-- <van-row type="flex" justify="center"> -->
                <div class="room">
                  <van-tag v-for="(room, id) in floor.rooms" :key="id" type="sucess" round size="medium" plain>门牌:{{ room.roomAlias }}</van-tag>
                </div>
                <!-- </van-row> -->
              </van-col>
            </van-row>
          </van-tab>
        </van-tabs>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
//import estateSummary from '@/components/estate/estate-summary.vue';
import { NavBar, Icon, CollapseItem, Collapse, Tag, Field, Button, Cell, CellGroup, Row, Col, Tabs, Tab, ActionSheet } from 'vant';
import 'vant/lib/nav-bar/style';
import 'vant/lib/tabs/style';
import 'vant/lib/collapse/style';
import 'vant/lib/collapse-item/style';
import 'vant/lib/tab/style';
import 'vant/lib/field/style';
import 'vant/lib/button/style';
import 'vant/lib/cell/style';
import 'vant/lib/cell-group/style';
import 'vant/lib/row/style';
import 'vant/lib/col/style';
import 'vant/lib/tag/style';
import 'vant/lib/action-sheet/style';

import { createBuildingStruct } from './drawRooms.addon';
import { $dialog, $toast } from '@/assets/common/common.js';

// import esPortalMainBuildings from '@/components/estate/estatePortal/esPortalMainBuildings.vue';

export default {
  name: 'building-portal',
  data() {
    return {
      active: 0,
      buildingId: '',
      objBuilding: {},
      menuShow: false,
      actions: [
        //菜单操作item
        { name: '操作' },
        { name: '单元维护' },
        { name: '楼层维护' },
        { name: '房间维护' }
      ]
    };
  },
  created() {
    this.objBuilding = JSON.parse(sessionStorage.getItem('building'));
    createBuildingStruct(this.objBuilding);
  },
  computed: {
    estatePlateDesc: function() {
      return this.$store.state.estate.estatePlateDesc;
    },

    isAddnew: function() {
      if (this.objBuilding.status == '0') {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    onClickReturn: function() {
      this.$router.push('/building/edit');
    },

    onClickRight: function() {
      $dialog('提示', '您确定要保存数据吗？')
        .then(() => {
          $toast.loading('正在保存...', 0);
          // var aBuilding = createBuildingStruct(this.objBuilding);
          const params = Object.assign({}, params, {
            building: this.objBuilding
          });

          this.$api.building.createBuilding(params).then(
            res => {
              if (res.data.statusCode !== '-1') {
                $toast.close();
                $toast.success('保存成功！', 1500);
                this.$router.push({
                  name: 'estate_portal',
                  params: {
                    estateId: this.objBuilding.estateId
                  }
                });
                // const params = Object.assign({}, params, {
                //   estateId: this.objBuilding.estateId
                // });
                // window.console.log(params);
                // this.$router.push('/estate/portal', params);
              } else {
                $toast.close();
                window.console.log('drawRoom.vue error:\n' + JSON.stringify(res.data.result));
                $toast.alert('保存失败\n' + JSON.stringify(res.data.result), 5000);
                return;
              }
            },
            err => {
              //$toast('保存失败！', 3000);
              $toast.close();
              window.console.log('drawRoom.vue error:\n' + JSON.stringify(err));
              $toast.alert('保存失败\n' + JSON.stringify(err), 5000);
              //$toast('保存失败！', 3000);
              return err;
            }
          );
        })
        .catch(() => {
          $toast('没有保存！', 1000);
        });

      //this.$router.push('/building/edit');
    }
  },

  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tag.name]: Tag,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [ActionSheet.name]: ActionSheet,
    [CellGroup.name]: CellGroup
    // esInputMainBuildings
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/style/my-vant';

#display-area {
  width: 100%;
  margin-top: 20px;
  text-align: center;
}

.building-portal-page .estate-main .van-row {
  background-color: white;
  margin-top: 2px;
  height: 100%;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
}
// .building-portal-page .estate-main .van-icon {
//   // color: white;
// }
.room {
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.building-portal-page .estate-main .van-col {
  background-color: white;
  height: 100%;
  white-space: normal;
  word-break: word-wrap;
  overflow: hidden;
  .span {
    margin-top: 0px;
    margin-left: 12px;
    color: $gray-7;
  }
}

.building-portal-page .van-button {
  height: 35px;
  line-height: 35px;
  .van-icon {
    color: white;
  }
  margin-top: 2px;
  scroll-margin-bottom: 2px;
}

.building-portal-page .van-tag {
  color: $green;
}
</style>
