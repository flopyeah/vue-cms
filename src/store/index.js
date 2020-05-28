import Vue from 'vue'
import Vuex from 'vuex'
import AuthModule from './auth'
import ArticlesModule from './articles'
import MediasModule from './medias'
import FoldersModule from './folder'
import BlockModule from './block'
import UIModule from './ui'
import TagsModule from './tags'
import CategoriesModule from './categories'
import UsersModule from './user'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:8000/api'

// TODO token log
axios.defaults.headers = {Authorization: 'bearer ' + localStorage.getItem('access_token')}
/*
axios.interceptors.request.use((config) => {
  this.$store.commit('loading', true)
  return config
}, (error) => {
  this.$store.commit('loading', false)
  return error
})
*/
export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null
  },
  modules: {
    ui: UIModule,
    security: AuthModule,
    articles: ArticlesModule,
    folders: FoldersModule,
    users: UsersModule,
    medias: MediasModule,
    block: BlockModule,
    tags: TagsModule,
    categories: CategoriesModule
  }
})
