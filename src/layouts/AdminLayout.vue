<template>
  <div class="admin-layout" v-bind:class="{'side-left-hide': !openLeft, 'side-right-show': openRight}">
    <LeftSide></LeftSide>
    <div class="main-content">

      <slot name="navbar">
        <NavBar></NavBar>
      </slot>

      <div class="content">
        <slot/>
      </div>

    </div>

    <div class="side-right">
      <slot name="side-right"/>
    </div>
  </div>
</template>

<script>
import LeftSide from '../components/LeftSide'
import NavBar from '../components/NavBar'
export default {
  name: 'AdminLayout',
  components: {
    NavBar,
    LeftSide
  },
  computed: {
    openLeft: {
      get () {
        return this.$store.getters.LEFT_DRAWER
      }
    },
    openRight: {
      get () {
        return this.$store.getters.RIGHT_DRAWER
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
