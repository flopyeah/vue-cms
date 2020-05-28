<template>
  <div v-if="media">
    <img class="img-100" :src="media.url" :alt="media.title" :title="media.title">
    <div class="container py-3">
      <form @submit.prevent="formMedia">
        <b-form-group
          class="mb-0"
          label="Titre"
          label-for="input-title"
        >
          <b-form-input
            id="input-title"
            v-model="media.title"
            placeholder="Enter your name"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          class="mb-0"
          label="Description"
          label-for="input-description"
        >
          <b-form-input
            id="input-description"
            v-model="media.description"
            placeholder="Enter your description"
          ></b-form-input>
        </b-form-group>
        <button type="submit" class="btn-150 mt-2 btn btn-primary">
          <b-spinner v-if="BUTTON_SAVING" small type="grow"></b-spinner>
          Enregistrer
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'MediaFormRight',
  computed: {
    ...mapGetters([
      'BUTTON_SAVING'
    ])
  },
  props: {
    media: [Boolean, Object]
  },
  methods: {
    formMedia () {
      let mediaSave = this.media
      delete mediaSave.dateUpdated
      delete mediaSave.dateCreated
      delete mediaSave.postsCover
      delete mediaSave.filename

      this.$store.dispatch('updateMedia', mediaSave)
        .then(response => {
          // console.log(response)
        })
    }
  }
}
</script>
