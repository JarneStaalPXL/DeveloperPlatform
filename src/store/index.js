import { createStore } from 'vuex'

export default createStore({
  state: {
    selectedLinearGradient: {}
  },
  getters: {
  },
  mutations: {
    setSelectedLinearGradient(state, payload) {
      state.selectedLinearGradient = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
