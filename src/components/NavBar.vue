<template>
  <nav class="header-nav">
    <div class="nav-link flex-left pointer drawer" @click="drawerLeft"><fa-icon icon="bars" /></div>

    <div v-if="right" class="nav-link flex-right pointer drawer" @click="drawerRight"><fa-icon icon="columns" /></div>

    <ul class="nav-ul">
      <li class="nav-item" v-for="(link, index) in links" v-bind:key="index" >
        <a class="nav-link" @link="link" @click="action( link.action, link)" >
          <fa-icon :icon="link.icon" />{{ link.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import NavBarLinks from './NavBarLinks'
export default {
  name: 'NavBar',
  components: {NavBarLinks},
  props: {
    right: {
      type: Boolean,
      required: false
    },
    links: {
      type: Array,
      required: false
    }
  },
  methods: {
    drawerLeft () {
      this.$store.commit('SET_LEFT_DRAWER')
    },
    drawerRight () {
      this.$store.commit('SET_RIGHT_DRAWER')
    },
    action (func) {
      // return func
      this[func]()
    },
    save () {
      console.log('saved')
    }
  }
}
</script>
