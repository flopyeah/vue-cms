<template>
  <div id="application-wrap">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    layout () {
      return (this.$route.meta.layout || 'PublicLayout')
    }
  }
}
</script>

<style lang="scss" scoped>
    // @import "./styles/scss/main.scss";
</style>
