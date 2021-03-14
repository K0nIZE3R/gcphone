const LOCAL_NAME = 'gc_notes'

const state = {
  notes: JSON.parse(localStorage[LOCAL_NAME] || null) || []
}

const getters = {
  notes: ({notes}) => notes
}

const actions = {
  resetNotes ({commit}) {
    commit('NOTES_RESET')
  },
  notesAddNote ({commit}, note) {
    commit('NOTES_ADD_NOTE', note)
  },
  notesRemoveNote ({commit}, noteIndex) {
    commit('NOTES_REMOVE_NOTE', noteIndex)
  }
}

const mutations = {
  NOTES_ADD_NOTE (state, note) {
    state.notes.push(note)
    localStorage[LOCAL_NAME] = JSON.stringify(state.notes)
  },
  NOTES_REMOVE_NOTE (state, noteIndex) {
    state.notes.splice(noteIndex, 1)
    localStorage[LOCAL_NAME] = JSON.stringify(state.notes)
  },
  NOTES_RESET (state) {
    state.notes = []
    localStorage[LOCAL_NAME] = JSON.stringify(state.notes)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

if (process.env.NODE_ENV !== 'production') {
  state.notes = ['Test Note 1', 'Test Note 2', 'Test Note 3']
  state.notes.push('a')
}
