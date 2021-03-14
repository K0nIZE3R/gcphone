const state = {
  skills: {},
  skillLabels: {
    pro_mechanic: 'Mechanic',
    pro_ranger: 'Ranger',
    pro_smelt: 'Smelting',
    pro_mining: 'Mining',
    pro_coke: 'Cocaine Processing',
    pro_meth: 'Meth Processing',
    pro_weed: 'Weed Processing',
    pro_food: 'Food',
    strength: 'Strength',
    stamina: 'Stamina'
  }
}

const getters = {
  skills: ({ skills }) => skills,
  skillLabels: ({ skillLabels }) => skillLabels
}

const actions = {}

const mutations = {
  SET_SKILL (state, skill) {
    state.skills[skill.skill] = skill.value
  },
  SET_SKILLS (state, _skills) {
    state.skills = _skills
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
  state.skills = {
    'mechanic': 0.1,
    'taxi': 2.1,
    'strength': 1.6,
    'shooting': 2.6
  }
}
