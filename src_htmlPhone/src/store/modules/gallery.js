const LOCAL_NAME = 'gc_gallery'

const state = {
  gallery: JSON.parse(localStorage[LOCAL_NAME] || null) || []
}

const getters = {
  gallery: ({gallery}) => gallery
}

const actions = {
  resetGallery ({commit}) {
    commit('GALLERY_RESET')
  },
  galleryAddImage ({commit}, imageUrl) {
    commit('GALLERY_ADD_IMAGE', imageUrl)
  },
  galleryRemoveImage ({commit}, galleryIndex) {
    commit('GALLERY_REMOVE_IMAGE', galleryIndex)
  }
}

const mutations = {
  GALLERY_ADD_IMAGE (state, imageUrl) {
    state.gallery.push(imageUrl)
    localStorage[LOCAL_NAME] = JSON.stringify(state.gallery)
  },
  GALLERY_REMOVE_IMAGE (state, galleryIndex) {
    state.gallery.splice(galleryIndex, 1)
    localStorage[LOCAL_NAME] = JSON.stringify(state.gallery)
  },
  GALLERY_RESET (state) {
    state.gallery = []
    localStorage[LOCAL_NAME] = JSON.stringify(state.gallery)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

if (process.env.NODE_ENV !== 'production') {
  state.gallery = ['https://i.imgur.com/95ApAzs.jpg', 'https://i.imgur.com/xJymFbI.jpg', 'https://i.imgur.com/95ApAzs.jpg', 'https://i.imgur.com/xJymFbI.jpg', 'https://i.imgur.com/95ApAzs.jpg', 'https://i.imgur.com/xJymFbI.jpg', 'https://i.imgur.com/95ApAzs.jpg', 'https://i.imgur.com/xJymFbI.jpg', 'https://i.imgur.com/95ApAzs.jpg', 'https://i.imgur.com/xJymFbI.jpg']
  state.gallery.push('https://i.imgur.com/7I60Jcq.jpg')
}
