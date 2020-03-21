<template>
  <div>
    <div id="audit-portal " class="qj-page">
      <div class="my-van">
        <van-nav-bar title="地址审核" />
        <van-tabs v-model="active">
          <van-tab title="未审核"> <audit-list auditStatus="unaudited"></audit-list> </van-tab>
          <van-tab title="已审核"> <audit-list auditStatus="audited"></audit-list> </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="estate-footer">
      <footer-nav></footer-nav>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
// import Estate from '@/views/Estate.vue'
import { NavBar, Icon, Cell, CellGroup, Tag, Tabs, Tab, Row } from 'vant';
import footerNav from '@/components/base/footer.vue';
import auditList from '@/components/audit/auditList.vue';
import 'vant/lib/nav-bar/style';
import 'vant/lib/cell/style';
import 'vant/lib/cell-group/style';
import 'vant/lib/tag/style';
import 'vant/lib/row/style';
import 'vant/lib/tabs/style';
import 'vant/lib/tab/style';

export default {
  name: 'audit-portal',
  data() {
    return {
      //用户单位，控制数据显示范围

      active: 0
    };
  },
  methods: {},
  created: function() {
    //设置foot当前选中的站点id
    this.$store.commit('site/setSite', 'audit');
    //用户角色不为auditor，不能显示本页，跳转至其它页面
    if (this.$store.state.user.role !== 'auditor') {
      this.$router.push('/estate');
    }
  },

  components: {
    footerNav,
    auditList,
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Tag.name]: Tag,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Row.name]: Row
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/style/my-vant';
.qj-page {
  width: 100%;
  //height: 100%;
}

.qj-page .summary-header {
  background-color: $blue;
  // margin-top: 10px;
  display: flex;
  width: 100%;
  height: 90px;
  //padding: 10px;
  .avatar {
    width: 20%;
    height: 100%;
    // margin-left: 20px;
    // margin-right: 20px;
    margin-top: 20px;
    padding-bottom: 10px;
    font-size: 20px;
    color: $white;
  }

  .content {
    width: 100%;
    margin-top: 15px;
    padding-bottom: 10px;
    color: $white;
    display: flex;
    flex-direction: column;
    .title {
      width: 100%;
      display: flex;
      font-size: $font-size-hg;
      color: $white;
    }
    .title-desc {
      font-size: $font-size-sm;
      color: $white;
      margin-top: 20px;
    }
  }
}
</style>
