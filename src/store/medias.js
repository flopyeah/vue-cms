import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api/'

const initialState = {
  medias: [],
  media: {},
  loading: false,
  saving: false,
  nbPage: 1,
  page: 1,
  nbParPage: 10
}

export default {
  state: { ...initialState },
  getters: {
    MEDIAS (state) {
      return state.medias
    }
  },
  // asynchronous
  actions: {
    fetchMedias ({ commit }, id = false) {
      commit('SET_LOADING', true)
      axios
        .get('media')
        .then(response => {
          commit('SET_MEDIAS', response.data['hydra:member'])
          commit('SET_LOADING', false)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteArticles ({ commit }, id) {
      axios
        .delete(`media/${id}`)
        .then(({ status }) => {
          if (status === 204 || status === 200) {
            commit('REMOVE_LIST', id)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    addMedia ({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_SAVING', true)
        axios
          .post(`media/upload`, data,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              maxContentLength: 11268599,
              maxBodyLength: 11268599
            })
          .then(response => {
            commit('SET_SAVING', false)
            commit('ADD_IMAGE', response.data)
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
            commit('SET_SAVING', false)
          })
      })
    },
    updateMedia ({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_BUTTON_SAVING', true)
        axios
          .put('media/' + data.id, data)
          .then(response => {
            // commit('ADD_IMAGE', response.data)
            commit('SET_BUTTON_SAVING', false)
            resolve(response.data)
          })
          .catch(error => {
            commit('SET_BUTTON_SAVING', false)
            reject(error)
          })
      })
    }
  },
  // synchronous
  mutations: {
    ADD_IMAGE: (state, data) => {
      // state.article.cover = data
      state.medias.unshift(data)
    },
    SET_MEDIAS: (state, payload) => {
      state.medias = payload
    },
    SET_LOADING: (state, payload) => {
      state.loading = payload
    },
    SET_SAVING: (state, payload) => {
      state.saving = payload
    }
  }
}
