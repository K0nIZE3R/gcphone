<template>
  <div class="phone_app">
    <PhoneTitle :title="'Key Chain'" backgroundColor="#586BD9" @back="quit"/>
    <table>
      <tr>
        <th>Plate</th>
      </tr>
      <tr
        @click="asyncOpenContextMenu(index)"
        :class="getClass(index, data)"
        v-for="(data, index) in keyChain">
        <td>{{data}}</td>
      </tr>
    </table>
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
      currentSelectedIndex: -1,
      currentSelectedPlate: '',
      ignoreControls: false
    }
  },
  computed: {
    ...mapGetters(['keyChain'])
  },
  methods: {
    ...mapActions(['keyChainGive', 'keyChainRemove']),
    quit: function () {
      if (this.ignoreControls === true) return
      this.$router.go(-1)
    },
    onDown: function () {
      if (this.ignoreControls === true) return
      var keyChainLength = Object.keys(this.keyChain).length
      this.currentSelectedIndex = this.currentSelectedIndex === keyChainLength - 1 ? this.currentSelectedIndex : this.currentSelectedIndex + 1
    },
    onUp: function () {
      if (this.ignoreControls === true) return
      this.currentSelectedIndex = this.currentSelectedIndex === 0 ? 0 : this.currentSelectedIndex - 1
    },
    onEnter: function () {
      if (this.currentSelectedIndex === -1) return
      if (this.ignoreControls === true) return
      this.asyncOpenContextMenu()
    },
    getClass: function (index, plate) {
      if (this.currentSelectedIndex === index) {
        this.currentSelectedPlate = plate
        return { highlight: true }
      } else {
        return ''
      }
    },
    async asyncOpenContextMenu (index) {
      if (index !== undefined ? index > -1 : false) this.currentSelectedIndex = index
      if (this.currentSelectedIndex === -1) return
      this.ignoreControls = true

      const data = await Modal.CreateModal({choix: [
        {id: 1, title: 'Give Key', icons: 'fa-key'},
        {id: 2, title: 'Throw Key', icons: 'fa-trash-alt', color: 'orange'}
      ]})

      this.ignoreControls = false

      if (data.id === 1) {
        this.keyChainGive({plate: this.currentSelectedPlate})
      } else if (data.id === 2) {
        this.keyChainRemove({plate: this.currentSelectedPlate})
        this.currentSelectedIndex = -1
        this.currentSelectedPlate = ''
      }
    }
  },
  created: function () {
    this.$bus.$on('keyUpBackspace', this.quit)
    this.$bus.$on('keyUpArrowDown', this.onDown)
    this.$bus.$on('keyUpArrowUp', this.onUp)
    this.$bus.$on('keyUpEnter', this.onEnter)
  },
  beforeDestroy: function () {
    this.$bus.$off('keyUpBackspace', this.quit)
    this.$bus.$off('keyUpArrowDown', this.onDown)
    this.$bus.$off('keyUpArrowUp', this.onUp)
    this.$bus.$off('keyUpEnter', this.onEnter)
  }
}
</script>

<style scoped>
  .highlight {
    color: red;
  }

  tr {
    text-align: center;
  }
</style>
