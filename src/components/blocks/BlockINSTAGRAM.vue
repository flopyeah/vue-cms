<template>
  <div class="card">
    <div class="card-body">
      Instagram
      <b-input-group
        class="mb-3"
      >
        <b-form-input v-model="content.contentData" @keyup.enter="validLink" />
        <b-input-group-append>
          <b-button text="Button" @click="validLink" variant="success">Ajouter</b-button>
        </b-input-group-append>
      </b-input-group>
      <div v-html="content.contentHtml"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BlockINSTAGRAM',
  props: {
    content: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      dataHtml: {}
    }
  },
  methods: {
    validLink () {
      const getUrl = 'https://api.instagram.com/oembed/?url=' + this.content.contentData

      const instaResponse = axios.get(getUrl, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Expose-Headers': 'Access-Control-*',
          'Access-Control-Allow-Headers': 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept'
        }
      })

      instaResponse.then(function (response) {
        this.content.contentHtml = response.data.html
      })
    }
  }
}
</script>
