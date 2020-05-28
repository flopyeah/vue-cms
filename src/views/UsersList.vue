<template>
  <admin-layout>
    <h1>Utilisateurs</h1>
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Titre</th>
        <th scope="col">Titre</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in USERS" :key="user.id" >
        <th><b-form-checkbox :value="user.id" ></b-form-checkbox></th>
        <th>{{ user.firstname }}</th>
        <th>{{ user.lastname }}</th>
      </tr>
      </tbody>
    </table>
  </admin-layout>
</template>

<script>
export default {
  name: 'UserList',
  created () {
    this.$store.dispatch('fetchUsers')
  },
  computed: {
    USERS () {
      return this.$store.getters.USERS
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
