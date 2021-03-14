<template>
  <div class="contact">
    <list :list='lcontacts' :disable="disableList" :title="IntlString('APP_CONTACT_TITLE')" @back="back" @select='onSelect' @option='onOption'></list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { generateColorForStr } from '@/Utils'
import List from './../List.vue'
import Modal from '@/components/Modal/index.js'

export default {
  components: {
    List
  },
  data () {
    return {
      disableList: false
    }
  },
  computed: {
    ...mapGetters(['IntlString', 'contacts', 'useMouse']),
    lcontacts () {
      let addContact = {display: this.IntlString('APP_CONTACT_NEW'), letter: '+', num: '', id: -1}
      return [addContact, ...this.contacts.map(e => {
        e.backgroundColor = e.backgroundColor || generateColorForStr(e.number)
        return e
      })]
    }
  },
  methods: {
    ...mapActions(['startCall']),
    onSelect (contact) {
      this.disableList = true

      if (contact.num === '') {
        this.$router.push({ path: 'contact/' + contact.id })
      } else {
        let choix = [
          {id: 0, title: this.IntlString('APP_PHONE_CALL'), icons: 'fa-phone'},
          {id: 1, title: this.IntlString('APP_PHONE_CALL_ANONYMOUS'), icons: 'fa-mask'},
          {id: 2, title: this.IntlString('APP_MESSAGE_NEW_MESSAGE'), icons: 'fa-sms'}
        ]

        if (contact.id !== -1 && contact.id !== undefined) {
          choix = [
            {id: 0, title: this.IntlString('APP_PHONE_CALL'), icons: 'fa-phone'},
            {id: 1, title: this.IntlString('APP_PHONE_CALL_ANONYMOUS'), icons: 'fa-mask'},
            {id: 2, title: this.IntlString('APP_MESSAGE_NEW_MESSAGE'), icons: 'fa-sms'},
            {id: 3, title: this.IntlString('APP_CONTACT_EDIT'), icons: 'fa-edit', color: 'orange'},
            {id: 4, title: this.IntlString('APP_CONTACT_DELETE'), icons: 'fa-user-times', color: 'red'},
            {id: 5, title: this.IntlString('APP_CONTACT_CANCEL'), icons: 'fa-undo'}
          ]
        }

        Modal.CreateModal({choix}).then(rep => {
          switch (rep.id) {
            case 0:
              this.startCall({ numero: contact.number })
              break
            case 1:
              this.startCall({ numero: '#' + contact.number })
              break
            case 2:
              this.$router.push({ name: 'messages.view', params: contact })
              break
            case 3:
              this.$router.push({ path: 'contact/' + contact.id })
              break
            case 4:
              this.$phoneAPI.deleteContact(contact.id)
              break
          }

          this.disableList = false
        })
      }
    },
    back () {
      if (this.disableList === true) return
      this.$router.go(-1)
    }
  },
  created () {
    if (!this.useMouse) {
      this.$bus.$on('keyUpBackspace', this.back)
    }
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
