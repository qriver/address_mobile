const state = {
  buildingId: '',
  plateId: '',
  plateDesc: '',
  buildingAlias: '',
  platePrefixId: '',
  platePrefixValue: '',
  plateSuffixId: '',
  plateSuffixValue: ''
};

const mutations = {
  setBuilding(state, obj) {
    state.buildingId = obj.buildingId;
    state.plateId = obj.buildingPlate.buildingPlateId;
    state.plateDesc = obj.buildingPlate.plateDesc;
    state.buildingAlias = obj.buildingAlias;
    state.platePrefixId = obj.buildingPlate.platePrefixId;
    state.platePrefixValue = obj.buildingPlate.platePrefixValue;
    state.plateSuffixId = obj.buildingPlate.plateSuffixId;
    state.plateSuffixValue = obj.buildingPlate.plateSuffixValue;
  },
  cleanBuilding(state) {
    //window.console.log(estateObject);
    for (let key in state) {
      state[key] = '';
    }
  },
  setPlatePrefix(state, obj) {
    state.platePrefixId = obj.keyId;
    state.platePrefixValue = obj.text;
  },

  setPlateSuffix(state, obj) {
    state.plateSuffixId = obj.keyId;
    state.plateSuffixValue = obj.text;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
