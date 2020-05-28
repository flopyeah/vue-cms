import axios from 'axios'
import router from '../router/index'

axios.defaults.baseURL = 'http://localhost:8000/api/'

const initialState = {
  articles: [],
  article: {},
  nbPage: 1,
  page: 1,
  nbParPage: 15
}

export default {
  state: { ...initialState },
  getters: {
    getAll (state) {
      return state.articles
    },
    getArticle (state) {
      return state.article
    },
    getNbPage (state) {
      return state.nbPage
    }
  },
  // asynchronous
  actions: {
    fetchArticles ({ commit }, { limit = 15, page = 1 }) {
      this.state.nbParPage = limit

      commit('SET_LOADING', true)
      axios
        .get('posts?page=' + page + '&itemsPerPage=' + limit)
        .then(response => {
          commit('setArticles', {data: response.data['hydra:member'], item: response.data['hydra:totalItems'], limit})
          commit('SET_LOADING', false)
        })
        .catch(error => {
          console.log(error)
          router.push({ name: 'Login' })
        })
    },
    fetchOneArticle ({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit('SET_LOADING', true)
        axios
          .get('posts/' + id)
          .then(response => {
            commit('setArticle', response.data)
            commit('SET_LOADING', false)
            resolve(response.data)
          })
          .catch(error => {
            console.log(error)
            reject(error)
            router.push({name: 'ArticlesList'})
          })
      })
    },
    deleteArticles ({ commit }, id) {
      axios
        .delete(`posts/${id}`)
        .then(({ status }) => {
          if (status === 204 || status === 200) {
            commit('REMOVE_LIST', id)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    newArticles ({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_SAVING', true)
        axios
          .post(`posts`, data)
          .then(response => {
            commit('SET_SAVING', false)
            commit('SAVE_ARTICLE', response)
            resolve(response.data)
          })
          .catch(error => {
            commit('SET_SAVING', false)
            reject(error)
          })
      })
    },
    saveArticles ({ commit, dispatch }, data) {
      let content = data.postContents
      let deleteContent = data.deletedPostContents
      delete data.postContents
      delete data.deletedPostContents

      return new Promise((resolve, reject) => {
        commit('SET_SAVING', true)
        axios
          .put(`posts/${data.id}`, data)
          .then(response => {
            commit('SET_SAVING', false)
            // ajout des contenus additionnels
            response.data.postContents = content
            commit('SAVE_ARTICLE', response.data)
            dispatch('saveContent', content)
            dispatch('deleteContent', deleteContent)
            resolve(response.data)
          })
          .catch(error => {
            commit('SET_SAVING', false)
            reject(error)
          })
      })
    },
    saveContent ({ commit }, data) {
      commit('SET_SAVING', true)
      let i = 1
      data.forEach(content => {
        content.contentOrder = i
        if (content.id) {
          axios
            .put(`content/${content.id}`, content)
            .then(response => { commit('SET_SAVING', false) })
            .catch(error => {
              console.log(error)
              commit('SET_SAVING', false)
            })
        } else {
          axios
            .post('content', content)
            .then(response => { commit('SET_SAVING', false) })
            .catch(error => {
              console.log(error)
              commit('SET_SAVING', false)
            })
        }
        i++
      })
    },
    deleteContent ({ commit }, data) {
      commit('SET_SAVING', true)
      data.forEach(content => {
        axios
          .delete(`content/${content.id}`, content)
          .then(response => { commit('SET_SAVING', false) })
          .catch(error => {
            console.log(error)
            commit('SET_SAVING', false)
          })
      })
    },
    changeCover ({ commit }, data) {
      commit('CHANGE_COVER', data)
    }
  },
  // synchronous
  mutations: {
    setArticles: (state, articles) => {
      state.nbPage = Math.ceil(articles.item / articles.limit)
      state.nbParPage = articles.limit
      state.articles = articles.data
    },
    setArticle: (state, article) => {
      state.article = article
    },
    SAVE_ARTICLE: (state, article) => {
      state.article = article
    },
    REMOVE_LIST: (state, articleId) => {
      state.articles.filter(obj => {
        if (articleId === obj.id) {
          state.articles.splice(state.articles.indexOf(obj), 1)
        }
      })
    },
    CHANGE_COVER: (state, data) => {
      state.article.cover = data
    }
  }
}
