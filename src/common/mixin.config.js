import Vue from 'vue'

Vue.filter('striptag', function (value) {
  if (value) {
    return value.replace(/(<([^>]+)>)/ig, '')
  }
})
