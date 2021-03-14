<template>
  <div class="phone_app">
    <PhoneTitle :title="'Wallet'" backgroundColor="#8BBD30" @back="onBackspace"/>

    <div class='elements'>
      <div class="bankCard">
        <img src="/html/static/img/fleeca.png">
        <span class="moneyTitle">{{ IntlString('APP_BANK_BALANCE') }}: £{{ bankAmontFormat }}</span>
      </div>

      <div class="element-content">
        <input class="group select" v-model="targetId" placeholder="Player ID" v-autofocus oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');" v-autofocus>
        <input class="group" v-model="moneyTransferAmount" placeholder="£" oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');">
        <button class="group button-transfer" @click.stop="transferButtonClick">Transfer</button>
      </div>
    </div>
  </div>
</template>

<script>
import PhoneTitle from './../PhoneTitle'
import { mapGetters, mapActions } from 'vuex'
import InfoBare from '../InfoBare'
export default {
  components: {
    InfoBare,
    PhoneTitle
  },
  data () {
    return {
      targetId: '',
      moneyTransferAmount: '',
      currentSelect: 0
    }
  },
  methods: {
    ...mapActions(['sendBankBalance']),
    onBackspace () {
      this.$router.go(-1)
    },
    transferButtonClick () {
      const moneyTransferAmount = this.moneyTransferAmount.trim()

      if (moneyTransferAmount === '') return
      this.moneyTransferAmount = ''
      this.sendBankBalance({
        targetId: this.targetId,
        amount: moneyTransferAmount
      })
    },
    onEnter () {
      if (this.ignoreControls === true) return
      if (this.currentSelect === 2) {
        this.transferButtonClick()
      } else if (this.currentSelect === 0) {
        this.$phoneAPI.getReponseText({title: 'Player ID of the receiver'}).then(data => {
          let message = data.text.trim()
          this.targetId = message
        })
      } else if (this.currentSelect === 1) {
        this.$phoneAPI.getReponseText({title: 'Amount to transfer'}).then(data => {
          let message = data.text.trim()
          this.moneyTransferAmount = message
        })
      }
    },
    onUp () {
      if (this.ignoreControls === true) return
      let select = document.querySelector('.group.select')

      if (select.previousElementSibling !== null) {
        document.querySelectorAll('.group').forEach(elem => {
          elem.classList.remove('select')
        })

        select.previousElementSibling.classList.add('select')
        select.previousElementSibling.focus()
        this.currentSelect -= 1
      }
    },
    onDown () {
      if (this.ignoreControls === true) return
      let select = document.querySelector('.group.select')

      if (select.nextElementSibling !== null) {
        document.querySelectorAll('.group').forEach(elem => {
          elem.classList.remove('select')
        })

        select.nextElementSibling.classList.add('select')
        select.nextElementSibling.focus()
        this.currentSelect += 1
      }
    }
  },
  computed: {
    ...mapGetters(['bankAmont', 'IntlString']),
    bankAmontFormat () {
      return this.bankAmont.toLocaleString()
    }
  },
  created () {
    if (!this.useMouse) {
      this.$bus.$on('keyUpArrowDown', this.onDown)
      this.$bus.$on('keyUpArrowUp', this.onUp)
      this.$bus.$on('keyUpEnter', this.onEnter)
      this.$bus.$on('keyUpBackspace', this.onBackspace)
    }
  },
  beforeDestroy () {
    this.$bus.$off('keyUpArrowDown', this.onDown)
    this.$bus.$off('keyUpArrowUp', this.onUp)
    this.$bus.$off('keyUpEnter', this.onEnter)
    this.$bus.$off('keyUpBackspace', this.onBackspace)
  }
}
</script>

<style scoped>
input {
  margin-right: auto;
  margin-left: auto;
  margin-top: 10%;
}

button {
  outline: none;
}

.bankCard > img {
  width:80%;
}

.bankCard {
  margin-top: 1em;
  display: flex;
  justify-content: center;
}

.moneyTitle {
  color: white;
  font-size: 16px;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.title {
  padding-left: 16px;
  height: 34px;
  line-height: 34px;
  color: white;
  background-color: rgb(76, 175, 80);
}

.elements {
  margin-top: 5vh;
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  height: 100%;
}

.element-content {
  margin-top: 24px;
  display: block;
  width: 100%;
  text-align: center;
}

.element-content input.select {

}

.element-content input {
  display: block;
  height: calc(1.5em + .75rem + 2px);
  padding: .375rem .75rem;
  line-height: 1.5;
  color: #495057;
  border: 1px solid #ced4da;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  border-radius: 23px;
  font-size: 16px;
  width: 80%;
}

.button-transfer {
  border: none;
  width: 220px;
  color: #fff;
  background-color: rgb(76, 175, 80);
  padding: .5rem 1rem;
  line-height: 1.5;
  margin-top: 1.25rem;
  margin-bottom: .25rem;
  cursor: pointer;
  border-radius: 1.3rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  text-transform: none;
  font-size: 17px;
}

.button-transfer:hover {
  background: #7cb732;
}
.button-transfer.select {
  background: #7cb732;
}
</style>
