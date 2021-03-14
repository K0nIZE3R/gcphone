<template>
  <div style="width: 100%; height: 742px; color: white" class="phone_app">
    <PhoneTitle :title="IntlString('APP_NOTES_TITLE')" backgroundColor="#f8d344" color="white" @back="onBack" />
    <div  style="backgroundColor: white;" class="elements">
        <div>
            <div v-for='(value, key) in notes'
          v-bind:key="value"
          @click="asyncOpenContextMenu(key)"
          v-bind:class="{select: key === currentSelect}" class="elem-title">
              <h3 style="margin-left: 7px; font-size: 16px; font-weight: 400;">{{value}}</h3>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from '@/components/Modal/index.js'
import PhoneTitle from './../PhoneTitle'

export default {
  components: { PhoneTitle },
  data: function () {
    return {
      currentSelect: 0,
      ignoreControls: false
    }
  },
  watch: {
    list: function () {
      this.currentSelect = 0
    }
  },
  computed: {
    ...mapGetters(['IntlString', 'useMouse', 'notes'])
  },
  methods: {
    ...mapActions(['notesAddNote', 'notesRemoveNote']),
    scrollIntoViewIfNeeded () {
      this.$nextTick(() => {
        const $select = this.$el.querySelector('.select')
        if ($select !== null) {
          $select.scrollIntoViewIfNeeded()
        }
      })
    },
    onUp () {
      if (this.ignoreControls === true) return
      this.currentSelect = this.currentSelect === 0 ? 0 : this.currentSelect - 1
      this.scrollIntoViewIfNeeded()
    },
    onDown () {
      if (this.ignoreControls === true) return
      this.currentSelect = this.currentSelect === this.notes.length - 1 ? this.currentSelect : this.currentSelect + 1
      this.scrollIntoViewIfNeeded()
    },
    async asyncOpenContextMenu (index) {
      if (index !== undefined ? index > -1 : false) this.currentSelect = index
      if (this.currentSelect === -1) return
      if (this.ignoreControls === true) return
      this.ignoreControls = true
      let choix = [
        {id: 1, title: this.IntlString('APP_NOTES_NEW_NOTE'), icons: 'fa-plus', color: 'dodgerblue'},
        {id: 2, title: this.IntlString('APP_NOTES_DELETE_NOTE'), icons: 'fa-minus', color: 'tomato'},
        {id: 3, title: this.IntlString('APP_NOTES_CANCEL'), icons: 'fa-undo'}
      ]
      if (this.notes.length === 0) {
        choix.splice(1, 1)
      }
      const rep = await Modal.CreateModal({ choix })
      this.ignoreControls = false

      switch (rep.id) {
        case 1:
          this.addChannelOption()
          break
        case 2:
          this.asyncRemoveNote()
          break
      }
    },
    onBack () {
      if (this.ignoreControls === true) return
      this.$router.go(-1)
    },
    async addChannelOption () {
      try {
        const rep = await Modal.CreateTextModal({limit: 280, title: this.IntlString('APP_NOTES_NEW_NOTE')})
        let note = (rep || {}).text || ' '
        if (note.length > 0) {
          this.currentSelect = 0
          this.notesAddNote(note)
        }
      } catch (e) {}
    },
    async asyncRemoveNote () {
      this.notesRemoveNote(this.currentSelect)
      this.currentSelect = 0
    }
  },
  created () {
    if (!this.useMouse) {
      this.$bus.$on('keyUpArrowDown', this.onDown)
      this.$bus.$on('keyUpArrowUp', this.onUp)
      this.$bus.$on('keyUpEnter', this.asyncOpenContextMenu)
      this.$bus.$on('keyUpBackspace', this.onBack)
    } else {
      this.currentSelect = -1
    }
  },
  beforeDestroy () {
    this.$bus.$off('keyUpArrowDown', this.onDown)
    this.$bus.$off('keyUpArrowUp', this.onUp)
    this.$bus.$off('keyUpEnter', this.asyncOpenContextMenu)
    this.$bus.$off('keyUpBackspace', this.onBack)
  }
}
</script>

<style scoped>
.list{
  height: 100%;
}
.title{
  padding-top: 22px;
  padding-left: 16px;
  height: 54px;
  line-height: 34px;
  font-weight: 700;
  color: white;
}

.elements{
  height: calc(100% - 54px);
  overflow-y: auto;
  background-color: #20201d;
  color: #34302f
}
.element{
  margin-top: 50px;
  height: 42px;
  line-height: 42px;
  display: flex;
  align-items: center;
  position: relative;
}

.elem-title{
  margin-left: 6px;
  width: 300px;
  font-size: 20px;
  transition: .15s;
  font-weight: 200;
  color: #34302f;
  margin-left: 13px;
  border-radius: 13px;
  
}
.elem-title .diese {
  color: #34302f;
  font-size: 22px;
  font-weight: 700;
  line-height: 40px;
}

.elem-title.select, .elem-title:hover{
   background-color:rgba(112, 108, 108, 0.1);
   color: #34302f;
   
}
.element.select .elem-title, .element:hover .elem-title {
   margin-left: 12px;
}
.element.select .elem-title .diese, .element:hover .elem-title .diese {
   color:#f8d344;
}
 .elements::-webkit-scrollbar-track
    {
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        background-color: #F5F5F5;
    }
  .elements::-webkit-scrollbar
    {
        width: 3px;
        background-color: transparent;
    }
  .elements::-webkit-scrollbar-thumb
    {
        background-color: white;
    }
</style>
