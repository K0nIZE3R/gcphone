<template>
  <div class="contact">
    <list :list='lcontacts' title="Send image to contact" @back="back" @select='onSelect'></list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { generateColorForStr } from '@/Utils'
import List from './../List.vue'
import Vue from 'vue'

export default {
  components: {
    List
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['IntlString', 'contacts', 'useMouse']),
    lcontacts () {
      return this.contacts.map(e => {
        e.backgroundColor = e.backgroundColor || generateColorForStr(e.number)
        return e
      })
    }
  },
  methods: {
    ...mapActions(['sendMessage']),
    onSelect (contact) {
      this.sendMessage({
        phoneNumber: contact.number,
        message: this.$route.params.imageUrl
      })

      Vue.notify({
        title: 'The image has been sent',
        message: ''
      })

      this.$router.go(-1)
    },
    back () {
      this.$router.go(-1)
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
.contact{
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
