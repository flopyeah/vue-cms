import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api/'

const initialState = {
  categories: []
}

export default {
  state: { ...initialState },
  getters: {
    CATEGORIES (state) {
      return state.categories
    }
  },
  // asynchronous
  actions: {
    fetchCategories ({ commit }, id = false) {
      commit('SET_LOADING', true)
      axios
        .get('categories')
        .then(response => {
          commit('SET_CATEGORIES', response.data['hydra:member'])
          commit('SET_LOADING', false)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteCategory ({ commit }, id) {
      axios
        .delete('categories/' + id)
        .then(({ status }) => {
          if (status === 204 || status === 200) {
            commit('REMOVE_LIST', id)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    saveCategory ({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_SAVING', true)
        axios
          .post('categories', data)
          .then(response => {
            commit('SET_SAVING', false)
            commit('SAVE_CATEGORY', response.data)
            resolve(response.data)
          })
          .catch(error => {
            commit('SET_SAVING', false)
            reject(error)
          })
      })
    }
  },
  // synchronous
  mutations: {
    SET_CATEGORIES: (state, categories) => {
      state.categories = categories
    },
    SAVE_CATEGORY: (state, categories) => {
      state.categories.push(categories)
    }
  }
}
