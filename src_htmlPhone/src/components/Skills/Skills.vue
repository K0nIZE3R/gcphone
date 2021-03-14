<template>
  <div class="phone_app">
    <PhoneTitle :title="'Skills'" backgroundColor="#A0D89E" @back="quit"/>
    <table>
      <tr>
        <th>Skill</th>
        <th>Level</th>
      </tr>
      <tr v-for="(value, key) in skills">
        <td>{{getSkillLabel(key)}}</td>
        <td>{{value}}</td>
      </tr>
    </table>
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
    }
  },
  computed: {
    ...mapGetters(['skills', 'skillLabels'])
  },
  methods: {
    quit: function () {
      this.$router.go(-1)
    },
    getSkillLabel: function (name) {
      var skillLabel = this.skillLabels[name]

      if (skillLabel !== undefined) return skillLabel
      return 'Unknown skill "' + name + '"'
    }
  },
  created: function () {
    this.$bus.$on('keyUpBackspace', this.quit)
  },
  beforeDestroy: function () {
    this.$bus.$off('keyUpBackspace', this.quit)
  }
}
</script>

<style scoped>
  tr {
    text-align: center;
  }
</style>
