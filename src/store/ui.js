
export default {
  state: {
    leftDrawer: true,
    rightDrawer: false,
    loading: false,
    saving: false,
    buttonSaving: false
  },
  getters: {
    LEFT_DRAWER: state => {
      return state.leftDrawer
    },
    RIGHT_DRAWER: state => {
      return state.rightDrawer
    },
    LOADING (state) {
      return state.loading
    },
    /**
     * @return {boolean}
     */
    SAVING (state) {
      return state.saving
    },
    /**
     * @return {boolean}
     */
    BUTTON_SAVING (state) {
      return state.buttonSaving
    }
  },
  actions: {
  },
  mutations: {
    SET_LEFT_DRAWER: (state, active = 'toggle') => {
      if (active === 'toggle') {
        state.leftDrawer = !state.leftDrawer
      } else {
        state.leftDrawer = active
      }
      // close right panel when the right is open
      if (state.leftDrawer === true) {
        state.rightDrawer = false
      }
    },
    SET_RIGHT_DRAWER: (state, active = 'toggle') => {
      if (active === 'toggle') {
        state.rightDrawer = !state.rightDrawer
      } else {
        state.rightDrawer = active
      }
    },
    SET_LOADING: (state, payload) => {
      state.loading = payload
    },
    SET_SAVING: (state, payload) => {
      state.saving = payload
    },
    SET_BUTTON_SAVING: (state, payload) => {
      state.buttonSaving = payload
    }
  }
}
