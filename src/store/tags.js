import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api/'

const initialState = {
  folders: []
}

export default {
  state: { ...initialState },
  getters: {
    TAGS (state) {
      return state.folders
    }
  },
  // asynchronous
  actions: {
    fetchFolders ({ commit }, id = false) {
      let url = 'folder?folderParent=null'
      if (id !== false) {
        url = 'folder?folderParent=' + id
      }
      commit('SET_LOADING', true)
      axios
        .get(url)
        .then(response => {
          commit('SET_FOLDER', response.data['hydra:member'])
          commit('SET_LOADING', false)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteArticles ({ commit }, id) {
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
    saveFolder ({ commit }, data) {
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
    SET_FOLDER: (state, folders) => {
      state.folders = folders
    },
    SAVE_FOLDER: (state, folders) => {
      state.folders.push(folders)
    }
  }
}
