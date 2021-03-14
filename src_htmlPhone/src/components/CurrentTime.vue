<template>
  <span>{{time}}</span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      time: '',
      myInterval: 0
    }
  },
  computed: {
    ...mapGetters(['currentTime'])
  },
  methods: {
    updateTime: function () {
      this.time = this.currentTime
    }
  },
  created: function () {
    this.updateTime()
    this.myInterval = setInterval(this.updateTime, 1000)
  },
  beforeDestroy: function () {
    clearInterval(this.myInterval)
  }
}
</script>

<style scoped>
</style>
