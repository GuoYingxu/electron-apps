const state = {
  configPath:""
}

const mutations = {
  SET_CONFIG_PATH(state,value){
    state.configPath = value
  },
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
