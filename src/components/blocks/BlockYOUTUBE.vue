<template>
  <div class="card">
    <div class="card-body">
      Youtube
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
export default {
  name: 'BlockYOUTUBE',
  props: {
    content: {
      type: Object,
      required: false
    }
  },
  methods: {
    validLink () {
      const id = this.content.contentData.split('?v=')[1]
      this.content.contentHtml = '<div class="embed-responsive embed-responsive-21by9">' +
        '<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
        '</div>'
    }
  }
}
</script>
