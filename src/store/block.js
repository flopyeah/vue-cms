import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api/'

const initialState = {
  blocks: []
}

export default {
  state: { ...initialState },
  getters: {
    BLOCKS (state) {
      return state.blocks
    }
  },
  // asynchronous
  actions: {
    fetchBlocks ({ commit }) {
      let url = 'block-content'
      commit('SET_LOADING', true)
      axios
        .get(url)
        .then(response => {
          commit('SET_BLOCKS', response.data['hydra:member'])
          commit('SET_LOADING', false)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteBlocks ({ commit }, id) {
      axios
        .delete(`folder/${id}`)
        .then(({ status }) => {
          if (status === 204 || status === 200) {
            commit('REMOVE_LIST', id)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    saveBlock ({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_SAVING', true)
        axios
          .post(`folder`, data)
          .then(response => {
            commit('SET_SAVING', false)
            commit('SAVE_FOLDER', response.data)
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
    SET_BLOCKS: (state, blocks) => {
      state.blocks = blocks
    },
    SAVE_BLOCK: (state, blocks) => {
      state.blocks.push(blocks)
    }
  }
}
