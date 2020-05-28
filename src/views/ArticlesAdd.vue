<template>
  <admin-layout>
    <NavBar :right="true" :links="links" slot="navbar" ></NavBar>
    <button :disabled="SAVING" class="btn btn-primary" form="form_article" @click="saveArticle">
      <b-spinner v-if="SAVING" small type="grow"></b-spinner>
      Enregistrer
    </button>
    <h1>Article</h1>
      <div>
        <form id="form_article" @submit.prevent>
          <b-form-group
            class="mb-0"
            label="Titre"
            label-for="title-form"
          >
            <b-form-input
              id="title-form"
              v-model="article.title"
              placeholder="Enter your name" />
          </b-form-group>
          <b-form-group
            class="mb-0"
            label="Descrition"
            label-for="textarea-form"
          >
            <b-form-textarea
              id="textarea-form"
              v-model="article.description"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            />
          </b-form-group>
        </form>
      </div>
    <div slot="side-right">
      <articles-front :article="article" />
    </div>
  </admin-layout>
</template>

<script>
import NavBar from '../components/NavBar'
import ArticlesFront from './ArticlesFront'

export default {
  name: 'ArticlesAdd',
  components: {ArticlesFront, NavBar},
  computed: {
    LOADING () {
      return this.$store.getters.LOADING
    },
    SAVING () {
      return this.$store.getters.SAVING
    }
  },
  data () {
    return {
      article: {
        title: null,
        description: null,
        status: 1,
        cover: false
      },
      links: [
        {
          'label': 'Enregistrer',
          'icon': 'save',
          'action': 'save'
        },
        {
          'label': 'Supprimer',
          'icon': 'trash-alt',
          'action': 'delete'
        }
      ]
    }
  },
  methods: {
    saveArticle () {
      this.$store.dispatch('newArticles', this.article)
        .then(response => {
          console.log(response)
          this.$router.push({name: 'ArticlesDetail', params: { id: response.id }})
        })
    },
    slugify () {
      return 'slug' // this.article.title.toLowerCase()
    }
  }
}
</script>
