<template>
  <div id="footer-nav">
    <van-tabbar
      v-model="active"
      active-color="#1989fa"
      inactive-color="#969799"
      @change="onChange"
      z-Index="999"
    >
      <van-tabbar-item name="address">
        <span>地址登记</span>
        <van-icon
          slot="icon"
          slot-scope="props"
          :color="props.active ? icon.active : icon.inactive"
          size="28"
          class-prefix="my-icon"
          name="company"
        />
      </van-tabbar-item>

      <van-tabbar-item name="audit">
        <span>审核</span>
        <van-icon
          slot="icon"
          slot-scope="props"
          :color="props.active ? icon.active : icon.inactive"
          size="28"
          class-prefix="my-icon"
          name="viewlist"
        />
      </van-tabbar-item>

      <van-tabbar-item name="3">
        <span>我的</span>
        <van-icon
          slot="icon"
          slot-scope="props"
          :color="props.active ? icon.active : icon.inactive"
          size="28"
          class-prefix="my-icon"
          name="discount"
        />
      </van-tabbar-item>

      <van-tabbar-item name="mine">
        <span>我的</span>
        <van-icon
          slot="icon"
          slot-scope="props"
          :color="props.active ? icon.active : icon.inactive"
          size="28"
          class-prefix="my-icon"
          name="bussiness-man"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
// import Estate from '@/views/Estate.vue'
import { Tabbar, TabbarItem, Icon, Notify } from 'vant';
import 'vant/lib/tabbar/style';
import 'vant/lib/tabbar-item/style';
// import 'vant/lib/icon/local.css';
import 'vant/lib/notify/style';

export default {
  name: 'footer-nav',
  data() {
    return {
      active: 'address',
      icon: {
        active: '#1989fa',
        inactive: '#969799'
      }
    };
  },

  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon,
    [Notify.name]: Notify
  },
  created() {
    this.active = this.$store.state.site.siteId;
    // window.console.log(this.active);
  },

  methods: {
    onChange(index) {
      //  window.console.log(index);
      // Notify({ type: 'primary', message: index });
      this.active = index;
      this.$store.commit('site/setSite', index);
      if (index == 'mine') {
        this.$router.push({
          name: 'mine_portal'
        });
      }
      if (index == 'address') {
        this.$router.push({
          name: 'estate'
        });
      }
      if (index == 'audit') {
        this.$router.push({
          name: 'audit_portal'
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/style/my-vant';
#footer-nav {
  height: 35px;
  /* background-color: blueviolet; */
  bottom: 0;
  position: fixed;
  text-align: center;
}
</style>
