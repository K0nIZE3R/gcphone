const state = {
  isCameraActive: false
}

const getters = {
  isCameraActive: ({isCameraActive}) => isCameraActive
}

const actions = {
  setCameraActive ({commit}, newState) {
    commit('CAMERA_SET_ACTIVE', newState)
  }
}

const mutations = {
  CAMERA_SET_ACTIVE (state, newState) {
    state.isCameraActive = newState
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
