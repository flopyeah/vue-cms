<template>
  <admin-layout>
    <h1>Categories</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col" class="tab-title">Titre</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in CATEGORIES" :key="category.id" >
          <th><b-form-checkbox :value="category.id" ></b-form-checkbox></th>
          <th>{{ category.title }}</th>
        </tr>
      </tbody>
    </table>
  </admin-layout>
</template>

<script>
export default {
  name: 'CategoryList',
  created () {
    this.$store.dispatch('fetchCategories')
  },
  computed: {
    CATEGORIES () {
      return this.$store.getters.CATEGORIES
    },
    getNbPage () {
      return this.$store.getters.getNbPage
    },
    LOADING () {
      return this.$store.getters.LOADING
    }
  },
  data () {
    return {
      msg: 'Paramètres'
    }
  }
}
</script>
