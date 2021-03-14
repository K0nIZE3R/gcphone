import PhoneAPI from './../../PhoneAPI'

const state = {
  keyChain: []
}

const getters = {
  keyChain: ({ keyChain }) => keyChain
}

const actions = {
  keyChainRemove ({commit}, {plate}) {
    commit('KEYCHAIN_REMOVE', {plate})
  },
  keyChainRemoved ({commit}, {plate}) {
    commit('KEYCHAIN_REMOVED', {plate})
  },
  keyChainGive ({commit}, {plate}) {
    commit('KEYCHAIN_GIVE', {plate})
  }
}

const mutations = {
  KEYCHAIN_SET (state, keyChain) {
    state.keyChain = keyChain
  },
  KEYCHAIN_ADD (state, plate) {
    state.keyChain.push(plate)
  },
  KEYCHAIN_REMOVE (state, plate) {
    state.keyChain = state.keyChain.filter(e => e !== plate.plate)
    PhoneAPI.keyChainRemove(plate)
  },
  KEYCHAIN_REMOVED (state, plate) {
    state.keyChain = state.keyChain.filter(e => e !== plate)
  },
  KEYCHAIN_GIVE (state, plate) {
    PhoneAPI.keyChainGive(plate)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  state.keyChain = [
    'BAT 5555',
    'LJH 1234',
    'NKW 1322',
    'NLO 6177'
  ]

  state.keyChain.push('la')
}
