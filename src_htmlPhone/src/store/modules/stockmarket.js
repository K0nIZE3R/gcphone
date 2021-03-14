const state = {
  stockMarketData: []
}

const getters = {
  stockMarketData: ({ stockMarketData }) => stockMarketData
}

const actions = {
  resetBourse ({ commit }) {
    commit('SET_BOURSE_INFO', [])
  }
}

const mutations = {
  SET_BOURSE_INFO (state, stockMarketData) {
    state.stockMarketData = stockMarketData
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
  state.stockMarketData = [{
    label: 'Redgull',
    previousPrice: 5000,
    currentPrice: 5000,
    img: 'redgull'
  }, {
    label: 'Bread',
    previousPrice: 500,
    currentPrice: 200,
    img: 'bread'
  }, {
    label: 'Water',
    previousPrice: 1000,
    currentPrice: 2000,
    img: 'water'
  }, {
    label: 'Marijuana',
    previousPrice: 10000,
    currentPrice: 9000,
    img: 'marijuana'
  }]
}
