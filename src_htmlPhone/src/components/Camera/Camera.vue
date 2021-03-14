<script>
import { mapGetters, mapActions } from 'vuex'
import PhoneAPI from './../../PhoneAPI'

export default {
  computed: {
    ...mapGetters(['isCameraActive'])
  },
  methods: {
    ...mapActions(['galleryAddImage', 'setCameraActive'])
  },
  async created () {
    if (!this.isCameraActive) {
      this.setCameraActive(true)
      const { url } = await PhoneAPI.takePhoto()

      if (url !== null && url !== undefined) {
        this.galleryAddImage(url)
      }

      this.$router.push({name: 'home'})
      this.setCameraActive(false)
    }
  }
}
</script>
