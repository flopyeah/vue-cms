import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api/'

const initialState = {
  users: []
}

export default {
  state: { ...initialState },
  getters: {
    USERS (state) {
      return state.users
    }
  },
  // asynchronous
  actions: {
    fetchUsers ({ commit }, id = false) {
      commit('SET_LOADING', true)
      axios
        .get('users')
        .then(response => {
          commit('SET_USERS', response.data['hydra:member'])
          commit('SET_LOADING', false)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  // synchronous
  mutations: {
    SET_USERS: (state, users) => {
      state.users = users
    },
    SAVE_USERS: (state, user) => {
      state.users.push(user)
    }
  }
}
