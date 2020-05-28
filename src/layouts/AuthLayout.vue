<template>
  <b-row>
    <b-col>
      <div class="auth-left">
        <slot name="bg"></slot>
      </div>
    </b-col>
    <b-col>
      <div class="auth-right">
        <div class="auth-form">
          <slot/>
          <router-link class="nav-link" :to="{name: 'Dashboard'}">Administration</router-link>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>
