/* 房产信息列表 */
<template>
  <div id="estates-summary"
       class="estate-list">
    <div v-for="(item, estateId) in estateList"
         :key="estateId"
         class="estate-summary">
      <div class="estate-summary-avatar">
        <i class="van-icon van-icon-hotel-o" />
      </div>
      <div class="estate-summary-content">
        <div class="estate-summary-content-header">
          <div style="width: 80%;margin-bottom:5px;">
            <span> {{ item.name }}</span>
          </div>
          <div class="estate-summary-content-right">
            <!-- 房地产详细信息维护录入 -->
            <router-link :to="{ name: 'estate_portal', params: { estateId: item.estateId } }">
              <i class="van-icon van-icon-arrow"
                 style="margin-left: 10px;" />
            </router-link>
          </div>
        </div>
        <van-row gutter="0">
          <span class="small">用地单位：</span>
          <van-tag plain
                   class="small"
                   type="primary"> {{ item.owner }}</van-tag>
        </van-row>
        <van-row gutter="0">
          <span class="small">门牌号码：</span>
          <van-tag plain
                   class="small"
                   type="primary">{{item.estatePlate.fullName}}</van-tag>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Skeleton, Icon, Tag, Row, Col } from 'vant';
// import 'vant/lib/cell-group/style';
import 'vant/lib/row/style';
import 'vant/lib/col/style';
import 'vant/lib/tag/style';

export default {
  data () {
    return {
      deptId: '',
      estateList: {},
      loading: true
    };
  },
  created () {
    this.loading = false;
    //构造查询参数
    const params = Object.assign({}, params, {
      deptId: ''
    });
    params.deptId = this.$store.state.user.deptId;

    /*
     * 根据登录用户所在的网格编号查询地产数据列表
     * 输入： params
     * 输出： promise对象
     * */
    this.$api.estate.getEstateListByWg(params).then(
      res => {
        Promise.resolve(res.data);
        this.estateList = res.data.resData.result;
      },
      err => {
        window.console.log(err.data.res);
      }
    );
  },

  components: {
    // [NavBar.name]: NavBar,
    [Skeleton.name]: Skeleton,
    [Icon.name]: Icon,
    // [Field.name]: Field,
    // [CellGroup.name]: CellGroup,
    [Tag.name]: Tag,
    [Row.name]: Row,
    [Col.name]: Col
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/my-vant";

.estate-list {
  width: 100%;
  height: 100%;
}

.estate-list .estate-summary {
  background-color: rgb(255, 255, 255);
  margin-top: 10px;
  display: flex;
  width: 100%;
}

.estate-summary-avatar {
  width: 20px;
  height: 20px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 5px;
  font-size: 20px;
  color: $green;
}

.estate-summary-content {
  width: 100%;
  margin-top: 5px;
  padding-bottom: 10px;
  color: $gray-8;
}

.estate-summary-content
  .estate-summary-content-header
  .estate-summary-content-right {
  width: 100%;
  display: flex;
  right: 20px;
  position: absolute;
  width: 50px;
  font-size: $font-size-lg;
  color: $gray-8;
}

.estate-summary-content .small {
  font-size: $font-size-sm;
  color: $gray-8;
}
</style>
