//Vuex.store module
const state = {
  tabIndex: 0,
  isModify: false,
  room: {
    unitIdx: '',
    floorIdx: '',
    roomIdx: ''
  }
};
const mutations = {
  setTabIndex(state, index) {
    state.tabIndex = index;
  },
  setModifyStatus(state, index) {
    state.isModify = index;
  },
  setUnitIdx(state, index) {
    state.room.unitIdx = index;
  },
  setRoomIdx(state, index) {
    state.room.roomIdx = index;
  },
  setFloorIdx(state, index) {
    state.room.floorIdx = index;
  }
};

export default {
  namespaced: true,
  state,
  mutations
  // actions,
  // gretters
};
