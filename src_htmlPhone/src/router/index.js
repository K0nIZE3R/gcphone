import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Menu from '@/components/Menu'

import Notes from '@/components/Notes/Notes'

import Contacts from '@/components/Contacts/Contacts'
import Contact from '@/components/Contacts/Contact'

import KeyChain from '@/components/KeyChain/KeyChain'

import MessagesList from '@/components/Messages/MessagesList'
import Messages from '@/components/Messages/Messages'
import MessageContactsSelect from '@/components/Messages/MessageContactsSelect'

import Phone from '@/components/Phone/Phone'
import PhoneCall from '@/components/Phone/PhoneCall'
import PhoneDialer from '@/components/Phone/PhoneDialer'

import Reddit from '@/components/Reddit/Reddit'
import RedditChannel from '@/components/Reddit/RedditChannel'

import TwitterScreen from '@/components/Twitter/TwitterScreen'

import Settings from '@/components/Settings/Settings'
import Bank from '@/components/Bank/Bank'
import StockMarket from '@/components/StockMarket/StockMarket'
import Camera from '@/components/Camera/Camera'
import Gallery from '@/components/Gallery/Gallery'
import GalleryContacts from '@/components/Gallery/GalleryContacts'
import Skills from '@/components/Skills/Skills'

import App9GAG from '@/components/App9GAG/App9GAG'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/keychain',
      name: 'keychain',
      component: KeyChain
    },
    {
      path: '/contact/:id',
      name: 'contacts.view',
      component: Contact
    },
    {
      path: '/messages',
      name: 'messages',
      component: MessagesList
    },
    {
      path: '/messages/select',
      name: 'messages.selectcontact',
      component: MessageContactsSelect
    },
    {
      path: '/messages/:number/:display',
      name: 'messages.view',
      component: Messages
    }, {
      path: '/stockmarket',
      name: 'stockmarket',
      component: StockMarket
    }, {
      path: '/bank',
      name: 'bank',
      component: Bank
    }, {
      path: '/camera',
      name: 'camera',
      component: Camera
    }, {
      path: '/gallery',
      name: 'gallery',
      component: Gallery
    }, {
      path: '/gallerycontacts',
      name: 'gallery.contacts',
      component: GalleryContacts
    }, {
      path: '/skills',
      name: 'skills',
      component: Skills
    }, {
      path: '/settings',
      name: 'settings',
      component: Settings
    }, {
      path: '/appels',
      name: 'appels',
      component: Phone
    }, {
      path: '/appelsactive',
      name: 'appels.active',
      component: PhoneCall
    }, {
      path: '/appelsNumber',
      name: 'appels.number',
      component: PhoneDialer
    }, {
      path: '/reddit',
      name: 'reddit',
      component: Reddit
    }, {
      path: '/reddit/:channel',
      name: 'reddit.channel',
      component: RedditChannel
    }, {
      path: '/twitter/view',
      name: 'twitter.screen',
      component: TwitterScreen
    }, {
      path: '/notes',
      name: 'notes',
      component: Notes
    }, {
      path: '/9gag',
      name: '9gag',
      component: App9GAG
    }, {
      path: '*',
      redirect: '/'
    }
  ]
})
