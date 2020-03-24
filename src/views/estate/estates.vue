<template>
  <div id="estate-page " class="estate-page">
    <div class="estate-title">
      <div class="my-van">
        <!-- <estates-header></estates-header> -->
        <van-nav-bar
          title="门牌地址信息列表"
          right-text="新增"
          left-text="搜索"
          @click-right="onClickAddnew"
        />
      </div>
    </div>
    <div class="estate-main">
      <estate-list :estateList="estateList"></estate-list>
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
import { NavBar, Switch } from 'vant';
import footerNav from '@/components/base/footer.vue';
import 'vant/lib/nav-bar/style';
import 'vant/lib/switch/style';
// import estatesHeader from '@/components/estate/estatesHeader.vue';
import estateList from '@/components/estate/estateList.vue';

export default {
  name: 'estate',
  data() {
    return {
      //用户单位，控制数据显示范围
      userDept: '',
      estateList: {}
    };
  },
  methods: {
    onClickAddnew: function() {
      this.$router.push({
        name: 'estate_edit',
        params: {
          action: 'Addnew'
        }
      });
      // window.console.log(this.$router.params);
    }
  },
  created: function() {
    //用户角色不为worker，不能显示本页，跳转至其它页面
    if (this.$store.state.user.role !== 'worker') {
      this.$router.push('/audit/portal');
    }
    //设置footer的当前选中状态
    this.$store.commit('site/setSite', 'address');

    const params = Object.assign({}, params, {
      worker_id: '057249'
    });

    /*
     * 根据登录用户所在的网格编号查询地产数据列表
     * 输入： params
     * 输出： promise对象
     * */
    this.$api.estate.getEstateListByGrid(params).then(
      res => {
        Promise.resolve(res.data);
        this.estateList = res.data.result;
      },
      err => {
        window.console.log(err.data);
      }
    );
  },

  components: {
    footerNav,
    [NavBar.name]: NavBar,
    [Switch.name]: Switch,
    // estatesHeader,
    estateList
  }
};
</script>

<style lang="scss">
@import '@/assets/style/my-vant';
</style>
