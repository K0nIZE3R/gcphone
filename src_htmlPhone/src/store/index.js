import Vue from 'vue'
import Vuex from 'vuex'

import phone from './modules/phone'
import contacts from './modules/contacts'
import keychain from './modules/keychain'
import messages from './modules/messages'
import appels from './modules/appels'
import bank from './modules/bank'
import stockmarket from './modules/stockmarket'
import skills from './modules/skills'
import reddit from './modules/reddit'
import notes from './modules/notes'
import twitter from './modules/twitter'
import gallery from './modules/gallery'
import camera from './modules/camera'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    phone,
    contacts,
    keychain,
    messages,
    appels,
    bank,
    stockmarket,
    skills,
    reddit,
    notes,
    twitter,
    gallery,
    camera
  },
  strict: true
})
