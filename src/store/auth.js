import axios from 'axios'

export default {
  state: {},
  mutations: {},
  getters: {
    loggedIn (state) {
      return state.token !== null
    }
  },
  actions: {
    LOGIN (context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/login_check', {
          email: credentials.email,
          password: credentials.password
        })
          .then(response => {
            const token = response.data.token

            localStorage.setItem('access_token', token)
            // context.commit('retrieveToken', token)
            resolve(response)
            // console.log(response);
            // context.commit('addTodo', response.data)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    }
  }
}
