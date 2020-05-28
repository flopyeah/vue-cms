<template>
<div></div>
</template>

<script>
export default {
  name: 'NavBarLinks',
  props: {
    link: {
      type: Object,
      required: false
    }
  },
  methods: {
    clickFunction (name, link) {
      console.log(name)
    }
  }
}
</script>
