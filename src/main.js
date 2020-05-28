// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { BootstrapVue } from 'bootstrap-vue'
import './common/date.config'
import './common/mixin.config'

import './styles/fonts/font-awesome'

// import templates
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'
import PublicLayout from './layouts/PublicLayout'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin)

import('./styles/scss/main.scss')

Vue.config.productionTip = false

// templates layouts
Vue.component('AuthLayout', AuthLayout)
Vue.component('AdminLayout', AdminLayout)
Vue.component('PublicLayout', PublicLayout)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
