<template>
  <auth-layout>
      <b-form @submit.prevent="login">

        <b-form-group
          id="input-group-1"
          label="Adresse e-mail de connexion"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="email"
            type="email"
            :class="{'is-invalid' : serverError}"
            required
            placeholder="e-mail"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Mot de passe" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="password"
            type="password"
            :class="{'is-invalid' : serverError}"
            required
            placeholder="Mot de passe"
          ></b-form-input>
        </b-form-group>

        <b-alert v-if="serverError" variant="danger" show>
          {{ serverErrorMessage }}
        </b-alert>

        <b-button :disabled="loading" block type="submit" variant="primary">
          <b-spinner v-if="loading" small type="grow"></b-spinner>
          Connexion
        </b-button>

        <router-link class="nav-link" :to="{name: 'Password'}"><fa-icon icon="key" />Mot de passe oublié</router-link>

      </b-form>
  </auth-layout>
</template>

<script>
export default {
  name: 'Login',
  props: {
    dataSuccessMessage: {
      type: String
    }
  },
  data () {
    return {
      email: 'florian.fazer@gmail.com',
      password: 'password',
      serverError: false,
      serverErrorMessage: '',
      loading: false
    }
  },
  methods: {
    login () {
      this.loading = true
      this.serverError = false
      this.$store.dispatch('LOGIN', {
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.loading = false
          this.$router.push({ name: 'Dashboard' })
        })
        .catch(error => {
          this.loading = false
          this.serverError = true
          if (error.response) {
            this.serverErrorMessage = error.response.data.message
          } else {
            this.serverErrorMessage = 'Connexion impossible'
          }

          this.password = ''
        })
    }
  }
}
</script>
