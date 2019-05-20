import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    address : '',
    wizards : []
  },
  mutations: {

  },
  actions: {
    reloadWizards({ state }) {

    },
    setAccount({ state, dispatch }, { address }) {
      state.address = address;

      return dispatch('reloadWizards');
    }
  }
})
