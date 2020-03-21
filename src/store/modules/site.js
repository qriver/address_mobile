//Vuex.store module
const state = {
  siteId: ''
};
const mutations = {
  setSite(state, index) {
    state.siteId = index;
  }
};

export default {
  namespaced: true,
  state,
  mutations
  // actions,
  // gretters
};
