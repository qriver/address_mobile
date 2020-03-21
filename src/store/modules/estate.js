// import { estateObject } from '@/api/type/estate.type.js';
const state = {
  estateId: '',
  estatePlateId: '',
  estatePlateDesc: '',
  estateName: '',
  estatePlateAlias: ''
};

const mutations = {
  setEstate(state, estate) {
    state.estateId = estate.estateId;
    state.estatePlateId = estate.estatePlate.estatePlateId;
    state.estatePlateDesc = estate.estatePlate.plateDesc;
    state.estateName = estate.estateName;
    state.estatePlateAlias = estate.estatePlate.plateAlias;
  },
  cleanEstate(state) {
    //window.console.log(estateObject);
    for (let key in state) {
      state[key] = '';
    }
  }
};
// const actions = {};

const getters = {
  getters_estateId: state => {
    return state.estateId;
  },
  getters_estatePlateId: state => {
    return state.estatePlateId;
  },

  getters_plateDesc: state => {
    return state.estatePlateDesc;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters
  // actions,
  // gretters
};
