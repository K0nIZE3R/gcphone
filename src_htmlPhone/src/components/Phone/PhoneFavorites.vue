<template>
  <div>
    <list :list='callList' :showHeader="false" :disable='disableList' v-on:select="onSelect"></list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import List from './../List.vue'
import Modal from '@/components/Modal/index.js'

export default {
  name: 'Favoris',
  components: { List },
  data () {
    return {
      disableList: false
    }
  },
  computed: {
    ...mapGetters(['config']),
    callList () {
      return this.config.serviceCall || []
    }
  },
  methods: {
    back () {
      if (this.disableList === true) return
      this.$router.push({name: 'home'})
    },
    onSelect (itemSelect) {
      if (this.disableList === true) return
      this.disableList = true

      Modal.CreateModal({choix: [...itemSelect.subMenu, {title: 'Return', icons: 'fa-undo'}]}).then(rep => {
        if (rep.title !== 'Return' && rep.title !== 'cancel') {
          this.$phoneAPI.callEvent(rep.eventName, rep.type)
        }

        this.disableList = false
      })
    }
  },

  created () {
    this.$bus.$on('keyUpBackspace', this.back)
  },

  beforeDestroy () {
    this.$bus.$off('keyUpBackspace', this.back)
  }
}
</script>

<style scoped>

</style>
