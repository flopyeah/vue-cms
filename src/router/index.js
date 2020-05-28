import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import routesAdmin from './admin'
import routesFront from './front'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: routesAdmin.concat(routesFront),
  base: '/admin',
  mode: 'history'
})

// before routes
router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // TODO check user connexion
    const isAuthenticated = store.getters.loggedIn

    if (isAuthenticated) {
      next()
    } else {
      next({
        path: '/login',
        query: { from: to.fullPath }
      })
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
