<template>
  <div class="phone_app">
    <PhoneTitle :title="IntlString('APP_BOURSE_TITLE')" @back="onBackspace"/>
    <div class='elements'>
      <div class='element'
          v-for='(elem, key) in stockMarketData'
          v-bind:class="{ select: key === currentSelect}"
          v-bind:key="key">
        <div class="elem-arrow"><i class="fa" :class="classInfo(elem)"></i></div>
        <div class="elem-label">{{elem.label}}</div>
        <div class="elem-img"><img :src="'nui://rpuk_inventory/html/img/items/'+ elem.img + '.png'" width="48" height="48"/></div>
        <div class="elem-price" :style="{color: colorStockByDifference(elem)}">£{{elem.currentPrice.toLocaleString()}} </div>
        <div class="elem-difference" :style="{color: colorStockByDifference(elem)}">{{stockDifferenceLabel(elem)}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import PhoneTitle from './../PhoneTitle'

export default {
  components: {
    PhoneTitle
  },
  data () {
    return {
      currentSelect: 0
    }
  },
  computed: {
    ...mapGetters(['IntlString', 'useMouse', 'stockMarketData'])
  },
  methods: {
    scrollIntoViewIfNeeded: function () {
      this.$nextTick(() => {
        this.$el.querySelector('.select').scrollIntoViewIfNeeded()
      })
    },
    colorStockByDifference (stockItem) {
      if (stockItem.currentPrice === stockItem.previousPrice) {
        return '#1565c0'
      } else if (stockItem.currentPrice < stockItem.previousPrice) {
        return '#c62828'
      } else {
        return '#2e7d32'
      }
    },
    classInfo (stockItem) {
      if (stockItem.currentPrice === stockItem.previousPrice) {
        return ['fa-arrow-right', 'iblue']
      } else if (stockItem.currentPrice > stockItem.previousPrice) {
        return ['fa-arrow-up', 'igreen']
      } else {
        return ['fa-arrow-down', 'ired']
      }
    },
    stockDifferenceLabel (stockItem) {
      if (stockItem.currentPrice === stockItem.previousPrice) {
        return 0
      } else if (stockItem.currentPrice > stockItem.previousPrice) {
        return '+ ' + (stockItem.currentPrice - stockItem.previousPrice).toLocaleString()
      } else {
        return '- ' + (stockItem.previousPrice - stockItem.currentPrice).toLocaleString()
      }
    },
    onBackspace () {
      this.$router.go(-1)
    },
    onUp () {
      this.currentSelect = this.currentSelect === 0 ? 0 : this.currentSelect - 1
      this.scrollIntoViewIfNeeded()
    },
    onDown () {
      this.currentSelect = this.currentSelect === this.stockMarketData.length - 1 ? this.currentSelect : this.currentSelect + 1
      this.scrollIntoViewIfNeeded()
    }
  },
  created () {
    if (!this.useMouse) {
      this.$bus.$on('keyUpArrowDown', this.onDown)
      this.$bus.$on('keyUpArrowUp', this.onUp)
    }
    this.$bus.$on('keyUpBackspace', this.onBackspace)
  },
  beforeDestroy () {
    this.$bus.$off('keyUpArrowDown', this.onDown)
    this.$bus.$off('keyUpArrowUp', this.onUp)
    this.$bus.$off('keyUpBackspace', this.onBackspace)
  }
}
</script>

<style scoped>
.elements{
  height: calc(100% - 34px);
  overflow-y: auto;
}

.element{
  height: 56px;
  width: 100%;
  line-height: 56px;
  display: flex;
  position: relative;
}
.element.select{
  background-color: #DDD;
}

.element .fa{
  color: #2e7d32;
  font-size: 18px;
  margin-left: 6px;
}

.element .fa-arrow-down{
  color: #c62828;
}

.element .fa-arrow-right{
  color: #1565c0;
}

.elem-label{
  padding-left: 6px;
  width: 20%;
  flex: 1;
  font-size: 22px;
  white-space: nowrap;
}

.elem-price{
  text-align: center;
  width: 20%;
  font-size: 18px;
  font-weight: 700;
}

.elem-difference{
  text-align: center;
  width: 20%;
  font-size: 14px;
}
</style>
