<template>
  <div id="audited-list" class="estate-list">
    <estate-list :estateList="estateList"></estate-list>
  </div>
</template>

<script>
import { Skeleton, Icon, Tag, Row, Col } from 'vant';
import estateList from '@/components/estate/estateList.vue';
// import 'vant/lib/cell-group/style';
import 'vant/lib/row/style';
import 'vant/lib/col/style';
import 'vant/lib/tag/style';

export default {
  name: 'audited-list',
  data() {
    return {
      estateList: {}
    };
  },
  props: ['audit-status'],
  created() {
    this.loading = false;

    const params = Object.assign({}, params, {
      deptId: ''
    });
    params.deptId = this.$store.state.user.userInstance.department.deptId;

    /*
     * 根据登录用户所在的网格编号查询地产数据列表
     * 输入： params
     * 输出： promise对象
     * */

    if (this.auditStatus == 'unaudited') {
      this.$api.estate.getEstateListUnaudited(params).then(
        res => {
          Promise.resolve(res.data);
          this.estateList = res.data.resData.result;
        },
        err => {
          window.console.log(err.data.res);
        }
      );
    }

    if (this.auditStatus == 'audited') {
      this.$api.estate.getEstateListAudited(params).then(
        res => {
          Promise.resolve(res.data);
          this.estateList = res.data.resData.result;
        },
        err => {
          window.console.log(err.data.res);
        }
      );
    }
  },

  methods: {},
  components: {
    // [NavBar.name]: NavBar,
    estateList,
    [Skeleton.name]: Skeleton,
    [Icon.name]: Icon,
    // [Field.name]: Field,
    // [CellGroup.name]: CellGroup,
    [Tag.name]: Tag,
    [Row.name]: Row,
    [Col.name]: Col
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/style/my-vant';

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
  width: 50px;
  height: 100%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  // margin-right: 20px;
  margin-top: 5px;
  font-size: 25px;
  color: $green;
  .van-icon {
    padding: 5px;
  }
}

.estate-summary-content {
  width: 100%;
  margin-top: 5px;
  margin-left: 10px;
  padding-bottom: 10px;
  color: $gray-8;
}

.estate-summary-content .estate-summary-content-header .estate-summary-content-right {
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
