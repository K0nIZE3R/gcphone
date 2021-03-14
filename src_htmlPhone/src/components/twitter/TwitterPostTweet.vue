<template>
  <div class="phone_content">
    <div class='tweet_write'>
        <textarea
          class="textarea-input"
          v-model.trim="message"
          v-autofocus
          :placeholder="IntlString('APP_TWITTER_PLACEHOLDER_MESSAGE')"
        ></textarea>
        <span class='tweet_send' @click="tweeter">{{ IntlString('APP_TWITTER_BUTTON_ACTION_TWEETER') }}</span>
        <span class='tweet_send' @click="tweeterImg">Camera</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {},
  data () {
    return {
      message: ''
    }
  },
  computed: {
    ...mapGetters(['IntlString', 'useMouse'])
  },
  watch: {
  },
  methods: {
    ...mapActions(['twitterPostTweet']),
    async onEnter () {
      try {
        const rep = await this.$phoneAPI.getReponseText({title: 'Tweet message'})
        if (rep !== undefined && rep.text !== undefined) {
          const message = rep.text.trim()
          if (message.length !== 0) {
            this.twitterPostTweet({ message })
          }
        }
      } catch (e) {}
    },
    async tweeter () {
      if (this.message === '') return
      if (this.message.length > 140) return
      await this.twitterPostTweet({ message: this.message })
      this.message = ''
    },
    async tweeterImg () {
      const { url } = await this.$phoneAPI.takePhoto()
      if (url !== null && url !== undefined) {
        await this.twitterPostTweet({ message: url })
      }
    },
    onBack () {
      if (this.useMouse === true && document.activeElement.tagName !== 'BODY') return
      this.$bus.$emit('twitterHome')
    }
  },
  created () {
    if (!this.useMouse) {
      this.$bus.$on('keyUpEnter', this.onEnter)
    }
    this.$bus.$on('keyUpBackspace', this.onBack)
  },
  async mounted () {
  },
  beforeDestroy () {
    this.$bus.$off('keyUpBackspace', this.onBack)
    this.$bus.$off('keyUpEnter', this.onEnter)
  }
}
</script>

<style scoped>
.phone_content {
  background: #c0deed;
}

.tweet_write {
  widows: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
}

.tweet_write .textarea-input {
  margin-left: 5%;
  align-self: center;
  width: 90%;
  margin-top: 20px;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 13px 16px;
  height: 336px;
  background-color: #ffffff;
  color: white;
  border-radius: 16px;
  resize: none;
  color: #222;
  font-size: 18px;
}

.tweet_send {
  display: inline-block;
  width: 30%;
  height: 10%;
  border-radius: 16px;
  background-color: rgb(29, 161, 242);
  color: white;
  line-height: 32px;
  text-align: center;
  margin: 26px 20px;
  font-size: 16px;
}

.tweet_send:hover {
  cursor: pointer;
  background-color: #0084b4;
}
</style>
