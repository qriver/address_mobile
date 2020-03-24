//Vuex.store module
const state = {
  tabIndex: 0,
  isModify: false
};
const mutations = {
  setTabIndex(state, index) {
    state.tabIndex = index;
  },
  setModifyStatus(state, index) {
    state.isModify = index;
  }
};

export default {
  namespaced: true,
  state,
  mutations
  // actions,
  // gretters
};
