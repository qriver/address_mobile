<template>
  <div>
    <div id="mine-portal "
         class="qj-page">
      <div class="summary-header">
        <div class="avatar">
          <div style="margin-left: 20px;   ">
            <van-icon name="contact"
                      size="30"
                      color="#fff" />
          </div>
        </div>
        <div class="content">
          <div class="title">
            <span> 全江</span>
          </div>
          <div class="title-desc">
            <span>用户单位： 西陵公安分局</span>
            <!-- <van-tag plain class="small" type="primary"> 西陵公安分局</van-tag> -->
          </div>
        </div>
      </div>
      <van-cell-group>
        <van-cell is-link
                  title="我的审核员"
                  @click="onClickAuditor" />
        <van-cell is-link
                  title="我的街路巷"
                  @click="onClickMyStreet" />
      </van-cell-group>
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
import { NavBar, Icon, Cell, CellGroup, Tag, Row } from 'vant';
import footerNav from '@/components/base/footer.vue';
import 'vant/lib/nav-bar/style';
import 'vant/lib/cell/style';
import 'vant/lib/cell-group/style';
import 'vant/lib/tag/style';
import 'vant/lib/row/style';

export default {
  name: 'mine-portal',
  data () {
    return {
      //用户单位，控制数据显示范围
      userDept: 'asdfasdf'
    };
  },
  methods: {
    onClickAuditor: function () {
      this.$router.push({
        name: 'mine_auditor'
      });
      //this.$router.push('/building/edit');
    }, onClickMyStreet: function () {
      this.$router.push({
        name: 'mine_mystreet'
      });
      //this.$router.push('/building/edit');
    }
  },
  created: function () { },

  components: {
    footerNav,
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Tag.name]: Tag,
    [Row.name]: Row
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/style/my-vant";
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
