import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import estate from './modules/estate';
import site from './modules/site';
import building from './modules/building';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
});
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: user,
    estate: estate,
    site: site,
    building: building
  },
  plugins: [vuexLocal.plugin]
});
