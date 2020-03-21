const state = {
  role: '',
  user_id: ''
};

const mutations = {
  changeDept(state, mdeptId) {
    state.deptId = mdeptId;
  },
  setUser(state, user) {
    for (let key in user) {
      state[key] = user[key];
    }
  }
};
// const actions = {};
// const getters = {};

export default {
  namespaced: true,
  state,
  mutations

  // actions,
  // gretters
};
