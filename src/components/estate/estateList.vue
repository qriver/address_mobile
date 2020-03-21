/* 房产信息列表 */
<template>
  <div id="estate-list" class="estate-list">
    <div v-for="(item, estate_id) in estateList" :key="estate_id" class="estate-summary">
      <div class="estate-summary-avatar">
        <!-- <i class="van-icon van-icon-hotel-o" /> -->
        <van-icon size="28" color="#409eff" class-prefix="my-icon" name="company" />
        <van-tag plain round size="small" :color="getAuditColor(item.audit_status)">{{
          getAuditText(item.audit_status)
        }}</van-tag>
      </div>
      <div class="estate-summary-content">
        <div class="estate-summary-content-header">
          <div style="width: 80%;margin-bottom:5px;">
            <span> {{ item.name }}</span>
          </div>
          <div class="estate-summary-content-right">
            <!-- 房地产详细信息维护录入 -->
            <router-link :to="{ name: 'estate_portal', params: { estateId: item.estate_id } }">
              <!-- <i class="van-icon van-icon-arrow" style="margin-left: 10px;" /> -->
              <van-icon size="25" color="#409eff" class-prefix="my-icon" name="arrow-right" />
            </router-link>
          </div>
        </div>
        <van-row gutter="0">
          <span class="small">用地单位：</span>
          <van-tag plain class="small" type="primary"> {{ item.owner }}</van-tag>
        </van-row>
        <van-row gutter="0">
          <span class="small">门牌号码：</span>
          <van-tag plain class="small" type="primary">{{ item.plate_desc }}</van-tag>
        </van-row>
      </div>
    </div>
    <div style="width: 100%;height:60px;"></div>
  </div>
</template>

<script>
import { Skeleton, Icon, Tag, Row, Col } from 'vant';
// import 'vant/lib/cell-group/style';
import 'vant/lib/row/style';
import 'vant/lib/col/style';
import 'vant/lib/tag/style';

export default {
  data() {
    return {
      tagType: 'primary',
      audit: {
        text: '',
        color: ''
      },
      auditStatus: {
        readying: { id: 0, color: '#8896B3', text: '未提交' },
        waiting: { id: 1, color: '#E6a23c', text: '待审核' },
        back: { id: 2, color: '#F56C6C ', text: '已退回' },
        ok: { id: 3, color: '#5cbb7a  ', text: '已审核' }
      },
      deptId: '',

      loading: true
    };
  },
  created() {
    // #409EFF #5cbb7a  #E6a23c #F56C6C  #8896B3 #409eff
    this.loading = false;
    //构造查询参数
    // const params = Object.assign({}, params, {
    //   deptId: ''
    // });
    // params.deptId = this.$store.state.user.department.deptId;

    // /*
    //  * 根据登录用户所在的网格编号查询地产数据列表
    //  * 输入： params
    //  * 输出： promise对象
    //  * */
    // this.$api.estate.getEstateListByWg(params).then(
    //   res => {
    //     Promise.resolve(res.data);
    //     this.estateList = res.data.resData.result;
    //   },
    //   err => {
    //     window.console.log(err.data.res);
    //   }
    // );
  },
  props: ['estate-list'],
  methods: {
    // 计算属性的 getter
    getAuditText: function(code) {
      // window.console.log(code);
      var text = '';
      if (code == this.auditStatus.readying.id) {
        text = this.auditStatus.readying.text;
      }
      if (code == this.auditStatus.waiting.id) {
        text = this.auditStatus.waiting.text;
      }
      if (code == this.auditStatus.back.id) {
        text = this.auditStatus.back.text;
      }
      if (code == this.auditStatus.ok.id) {
        text = this.auditStatus.ok.text;
      }
      return text;
    },
    getAuditColor: function(code) {
      var color = '';
      if (code == this.auditStatus.readying.id) {
        color = this.auditStatus.readying.color;
      }
      if (code == this.auditStatus.waiting.id) {
        color = this.auditStatus.waiting.color;
      }
      if (code == this.auditStatus.back.id) {
        color = this.auditStatus.back.color;
      }
      if (code == this.auditStatus.ok.id) {
        color = this.auditStatus.ok.color;
      }
      return color;
    }
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
