<template>
  <div class="phone_app">
    <PhoneTitle :title="'Gallery'" backgroundColor="#6EACDF" @back="quit"/>
    <div class="img-fullscreen" v-if="imgZoom !== undefined" @click.stop="imgZoom = undefined">
      <img :src="imgZoom" alt="" />
    </div>

    <div class="grid-container">
      <img v-for="(imageUrl, index) in gallery" :src="imageUrl" alt="" v-bind:class="{active: index === currentSelect}" class="grid-item" height=200 width=200 @click.stop="openContextMenu(imageUrl, index)" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PhoneTitle from './../PhoneTitle'
import Modal from '@/components/Modal/index.js'

export default {
  components: {
    PhoneTitle
  },
  data () {
    return {
      imgZoom: undefined,
      currentSelect: 0,
      ignoreControls: false
    }
  },
  computed: {
    ...mapGetters(['gallery', 'useMouse'])
  },
  methods: {
    ...mapActions(['galleryRemoveImage', 'twitterPostTweet']),

    async openContextMenu (imageUrl, index) {
      this.ignoreControls = true

      const data = await Modal.CreateModal({choix: [
        {id: 1, title: 'Share image (Message)', icons: 'fa-share'},
        {id: 2, title: 'Share image (Twitter)', icons: 'fa-share'},
        {id: 3, title: 'Enlarge image', icons: 'fa-search'},
        {id: 4, title: 'Copy to clipboard', icons: 'fa-copy'},
        {id: 5, title: 'Delete image', icons: 'fa-trash-alt', color: 'orange'}
      ]})

      switch (data.id) {
        case 1:
          this.$router.push({ name: 'gallery.contacts', params: { imageUrl: imageUrl } })
          break
        case 2:
          await this.twitterPostTweet({ message: imageUrl })
          break
        case 3:
          this.imgZoom = imageUrl
          break
        case 4:
          navigator.clipboard.writeText(imageUrl)
          break
        case 5:
          this.galleryRemoveImage(index)
          break
      }

      this.ignoreControls = false
    },
    scrollIntoViewIfNeeded: function () {
      this.$nextTick(() => {
        document.querySelector('.active').scrollIntoViewIfNeeded()
      })
    },
    onLeft () {
      if (this.ignoreControls === true) return
      if (this.imgZoom) return
      this.currentSelect = (this.currentSelect - 1 + this.gallery.length) % (this.gallery.length)
      this.scrollIntoViewIfNeeded()
    },
    onRight () {
      if (this.ignoreControls === true) return
      if (this.imgZoom) return
      this.currentSelect = (this.currentSelect + 1) % (this.gallery.length)
      this.scrollIntoViewIfNeeded()
    },
    onDown () {
      if (this.ignoreControls === true) return
      if (this.imgZoom) return
      this.currentSelect = Math.min(this.currentSelect + 2, this.gallery.length - 1)
      this.scrollIntoViewIfNeeded()
    },
    onUp () {
      if (this.ignoreControls === true) return
      if (this.imgZoom) return
      this.currentSelect = Math.max(this.currentSelect - 2, 0)
      this.scrollIntoViewIfNeeded()
    },
    onEnter () {
      if (this.ignoreControls === true) return

      if (this.imgZoom) {
        this.imgZoom = undefined
      } else {
        this.openContextMenu(this.gallery[this.currentSelect], this.currentSelect)
      }
    },
    quit () {
      if (this.ignoreControls === true) return

      if (this.imgZoom) {
        this.imgZoom = undefined
      } else {
        this.$router.go(-1)
      }
    }
  },
  created: function () {
    if (!this.useMouse) {
      this.$bus.$on('keyUpArrowLeft', this.onLeft)
      this.$bus.$on('keyUpArrowRight', this.onRight)
      this.$bus.$on('keyUpArrowDown', this.onDown)
      this.$bus.$on('keyUpArrowUp', this.onUp)
      this.$bus.$on('keyUpEnter', this.onEnter)
    } else {
      this.currentSelect = -1
    }

    this.$bus.$on('keyUpBackspace', this.quit)
  },
  beforeDestroy: function () {
    this.$bus.$off('keyUpArrowLeft', this.onLeft)
    this.$bus.$off('keyUpArrowRight', this.onRight)
    this.$bus.$off('keyUpArrowDown', this.onDown)
    this.$bus.$off('keyUpArrowUp', this.onUp)
    this.$bus.$off('keyUpEnter', this.onEnter)
    this.$bus.$off('keyUpBackspace', this.quit)
  }
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  overflow-y: auto;
}

.grid-item {
  padding: 1px;
}

.img-fullscreen {
  position: fixed;
  z-index: 999999;
  background-color: rgba(20, 20, 20, 0.8);
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-fullscreen img {
  display: flex;
  max-width: 90vw;
  max-height: 95vh;
}

.grid-item:hover, .active {
  opacity: 0.4;
  filter: alpha(opacity=40); /* msie */
}
</style>
