<template>
  <admin-layout>
    <p>Tableau de bord</p>
    <div>selectioner les articles à mettre en avant sur la home page</div>

    <div>Les 5 derniers articles</div>

    <div>Les 5 derniers commentaires</div>

    <div>Les 5 derniers messages de contact</div>
  </admin-layout>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      msg: 'Dashboard'
    }
  }
}
</script>
