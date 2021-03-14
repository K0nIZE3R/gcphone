import PhoneAPI from './../../PhoneAPI'
import Vue from 'vue'

const state = {
  twitterUsername: localStorage['gcphone_twitter_username'],
  twitterPassword: localStorage['gcphone_twitter_password'],
  twitterAvatarUrl: localStorage['gcphone_twitter_avatarUrl'],
  twitterNotification: localStorage['gcphone_twitter_notif'] ? parseInt(localStorage['gcphone_twitter_notif']) : 1,
  twitterNotificationSound: localStorage['gcphone_twitter_notif_sound'] !== 'false',
  tweets: [],
  favoriteTweets: []
}

const getters = {
  twitterUsername: ({ twitterUsername }) => twitterUsername,
  twitterPassword: ({ twitterPassword }) => twitterPassword,
  twitterAvatarUrl: ({ twitterAvatarUrl }) => twitterAvatarUrl,
  twitterNotification: ({ twitterNotification }) => twitterNotification,
  twitterNotificationSound: ({ twitterNotificationSound }) => twitterNotificationSound,
  tweets: ({ tweets }) => tweets,
  favoriteTweets: ({ favoriteTweets }) => favoriteTweets
}

const actions = {
  twitterCreateNewAccount (_, {username, password, avatarUrl}) {
    PhoneAPI.twitter_createAccount(username, password, avatarUrl)
  },
  twitterLogin ({ commit }, { username, password }) {
    PhoneAPI.twitter_login(username, password)
  },
  twitterChangePassword ({ state }, newPassword) {
    PhoneAPI.twitter_changePassword(state.twitterUsername, state.twitterPassword, newPassword)
  },
  twitterLogout ({ commit }) {
    localStorage.removeItem('gcphone_twitter_username')
    localStorage.removeItem('gcphone_twitter_password')
    localStorage.removeItem('gcphone_twitter_avatarUrl')
    commit('UPDATE_ACCOUNT', {
      username: undefined,
      password: undefined,
      avatarUrl: undefined
    })
  },
  twitterSetAvatar ({ state }, { avatarUrl }) {
    PhoneAPI.twitter_setAvatar(state.twitterUsername, state.twitterPassword, avatarUrl)
  },
  twitterPostTweet ({ state, commit }, { message }) {
    if (/^https?:\/\/.*\.(png|jpg|jpeg|gif)$/.test(message)) {
      PhoneAPI.twitter_postTweetImg(state.twitterUsername, state.twitterPassword, message)
    } else {
      PhoneAPI.twitter_postTweet(state.twitterUsername, state.twitterPassword, PhoneAPI.convertEmoji(message))
    }
  },
  twitterToogleLike ({ state }, { tweetId }) {
    PhoneAPI.twitter_toggleLikeTweet(state.twitterUsername, state.twitterPassword, tweetId)
  },
  setAccount ({ commit }, data) {
    localStorage['gcphone_twitter_username'] = data.username
    localStorage['gcphone_twitter_password'] = data.password
    localStorage['gcphone_twitter_avatarUrl'] = data.avatarUrl
    commit('UPDATE_ACCOUNT', data)
  },
  addTweet ({ commit, state }, tweet) {
    let notif = state.twitterNotification === 2
    if (state.twitterNotification === 1) {
      notif = tweet.message && tweet.message.toLowerCase().indexOf(state.twitterUsername.toLowerCase()) !== -1
    }
    if (notif === true) {
      Vue.notify({
        message: tweet.message,
        title: tweet.author + ' :',
        icon: 'fab fa-twitter',
        sound: state.twitterNotificationSound ? 'Twitter_Sound_Effect.ogg' : undefined,
        duration: 6000
      })
    }
    commit('ADD_TWEET', { tweet })
  },
  fetchTweets ({ state }) {
    PhoneAPI.twitter_getTweets(state.twitterUsername, state.twitterPassword)
  },
  fetchFavoriteTweets ({ state }) {
    PhoneAPI.twitter_getFavoriteTweets(state.twitterUsername, state.twitterPassword)
  },
  setTwitterNotification ({ commit }, value) {
    localStorage['gcphone_twitter_notif'] = value
    commit('SET_TWITTER_NOTIFICATION', { notification: value })
  },
  setTwitterNotificationSound ({ commit }, value) {
    localStorage['gcphone_twitter_notif_sound'] = value
    commit('SET_TWITTER_NOTIFICATION_SOUND', { notificationSound: value })
  }
}

const mutations = {
  SET_TWITTER_NOTIFICATION (state, { notification }) {
    state.twitterNotification = notification
  },
  SET_TWITTER_NOTIFICATION_SOUND (state, { notificationSound }) {
    state.twitterNotificationSound = notificationSound
  },
  UPDATE_ACCOUNT (state, { username, password, avatarUrl }) {
    state.twitterUsername = username
    state.twitterPassword = password
    state.twitterAvatarUrl = avatarUrl
  },
  SET_TWEETS (state, { tweets }) {
    state.tweets = tweets
  },
  SET_FAVORITE_TWEETS (state, { tweets }) {
    state.favoriteTweets = tweets
  },
  ADD_TWEET (state, { tweet }) {
    state.tweets = [tweet, ...state.tweets]
  },
  UPDATE_TWEET_LIKE (state, { tweetId, likes }) {
    const tweetIndex = state.tweets.findIndex(t => t.id === tweetId)
    if (tweetIndex !== -1) {
      state.tweets[tweetIndex].likes = likes
    }
    const tweetIndexFav = state.favoriteTweets.findIndex(t => t.id === tweetId)
    if (tweetIndexFav !== -1) {
      state.favoriteTweets[tweetIndexFav].likes = likes
    }
  },
  UPDATE_TWEET_ISLIKE (state, { tweetId, isLikes }) {
    const tweetIndex = state.tweets.findIndex(t => t.id === tweetId)
    if (tweetIndex !== -1) {
      Vue.set(state.tweets[tweetIndex], 'isLikes', isLikes)
    }
    const tweetIndexFav = state.favoriteTweets.findIndex(t => t.id === tweetId)
    if (tweetIndexFav !== -1) {
      Vue.set(state.favoriteTweets[tweetIndexFav], 'isLikes', isLikes)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

if (process.env.NODE_ENV !== 'production') {
  state.tweets = [{
    id: 1,
    message: 'Test 1',
    author: 'Test User 1',
    time: '2021-02-09 14:10',
    likes: 3,
    isLikes: 60
  },
  {
    id: 2,
    message: 'Test 2',
    author: 'Test User 2',
    time: '2021-02-09 14:18',
    likes: 3,
    isLikes: 60
  },
  {
    id: 3,
    message: 'Test 3',
    author: 'Test User 3',
    time: '2021-02-09 14:12',
    likes: 3,
    isLikes: 60
  },
  {
    id: 4,
    message: 'Test 4',
    author: 'Test User 4',
    time: '2021-02-09 14:13',
    likes: 3,
    isLikes: 60
  }]

  state.favoriteTweets = [{
    id: 1,
    message: 'https://pbs.twimg.com/profile_images/702982240184107008/tUKxvkcs_400x400.jpg',
    author: 'I am from 2020-12-05',
    time: '2020-12-05',
    likes: 3,
    isLikes: 60
  }, {
    id: 2,
    message: 'I am from 2020-12-03',
    author: 'test 2',
    authorIcon: 'https://pbs.twimg.com/profile_images/702982240184107008/tUKxvkcs_400x400.jpg',
    time: '2020-12-03',
    likes: 65
  }, {
    id: 3,
    message: 'https://cdn.discordapp.com/attachments/563443658192322576/563473765569396746/samurai-background-hd-1920x1200-45462.jpg',
    author: 'test 3',
    time: '2020-10-05'
  }, {
    id: 4,
    message: 'I am from 2020-05-05',
    author: 'test 4',
    authorIcon: 'https://pbs.twimg.com/profile_images/986085090684960768/AcD9lOLw_bigger.jpg',
    likes: 0,
    time: '2020-05-05'
  }]
}
