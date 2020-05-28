<template>
  <admin-layout>
    <NavBar :links="links" slot="navbar" ></NavBar>
    <button class="btn btn-danger" @click="deleteArticle" :disabled="!checked.length">Supprimer</button>
    <router-link :to="{name: 'ArticlesAdd'}"  class="btn-primary btn">Ajouter</router-link>
    <h1>Articles</h1>
    <b-overlay
      id="overlay-background"
      :variant="variant"
      :opacity="opacity"
      spinner-type="grow"
      :blur="blur"
      rounded="sm"
      :show="LOADING"
    >
      <table class="table table-striped" v-bind:class="{'loading': LOADING}">
        <thead>
        <tr>
          <th scope="col"><b-form-checkbox @change="selectAll" v-model="checkAll"></b-form-checkbox></th>
          <th scope="col" class="tab-title">Titre</th>
          <th scope="col">Description</th>
          <th scope="col" class="tab-date">Date</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(article) in getAll" :key="article.id" :class="{'table-primary': checked.includes(article.id)}">
          <th><b-form-checkbox v-model="checked" :value="article.id" ></b-form-checkbox></th>
          <td><router-link :to="{name: 'ArticlesDetail', params : { id : article.id }}">{{ article.title.substring(0, 40) }}</router-link></td>
          <td>{{ article.description.substring(0, 120)|striptag }}</td>
          <td>{{ article.dateUpdated | formatDateTime }}</td>
        </tr>
        </tbody>
      </table>
    </b-overlay>
    <div class="overflow-auto" >
      <b-row>
        <b-col cols="5">
          <div class="sort-by">
            Par page :
          </div>
          <div class="sort-by">
            <b-form-select @change="numberItems($event)" name="sort-by"
              :options="[{ text: '10', value: 10 }, '20', '30']"
              :value="limit"
            ></b-form-select>
          </div>
        </b-col>
        <b-col cols="7">
          <b-pagination-nav v-model="page" :link-gen="linkGen" :number-of-pages="getNbPage" align="right"></b-pagination-nav>
        </b-col>
      </b-row>
    </div>

  </admin-layout>
</template>

<script>
import NavBar from '../components/NavBar'

export default {
  components: {
    NavBar
  },
  name: 'ArticlesList',
  created () {
    this.loadArticles()
  },
  computed: {
    getAll () {
      return this.$store.getters.getAll
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
      loading: false,
      variant: 'light',
      opacity: 0.85,
      blur: 'none',
      checked: [],
      checkAll: false,
      page: this.$route.query.page || 1,
      limit: this.$route.query.limit || 15,
      links: [
        {
          'label': 'Ajouter',
          'icon': 'plus-circle',
          'action': 'addLink'
        },
        {
          'label': 'Supprimer',
          'icon': 'trash-alt',
          'action': 'delete'
        }
      ]
    }
  },
  watch: {
    $route (to, from) {
      this.loadArticles()
    }
  },
  methods: {
    loadArticles () {
      let page = this.$route.query.page || 1
      let limit = this.$route.query.limit || 15
      this.page = page
      this.$store.dispatch('fetchArticles', {page, limit})
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    numberItems (value) {
      this.$router.push({query: { limit: value }})
    },
    linkGen (pageNum) {
      return pageNum === 1 ? {currentPage: 1} : {query: { ...this.$route.query, page: pageNum }}
    },
    save () {
      console.log('save')
    },
    selectAll () {
      this.checked = []

      if (!this.checkAll) {
        this.getAll.forEach(element => {
          this.checked.push(element.id)
        })
      }
    },
    deleteArticle () {
      this.boxOne = ''
      this.$bvModal.msgBoxConfirm('Êtes vous sûr(e) de vouloir supprimer ' + this.checked.length + ' élément(s) ?', {
        title: 'Confirmation',
        okVariant: 'danger',
        okTitle: 'Oui',
        cancelTitle: 'Annuler',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          if (value) {
            this.checked.forEach(element => {
              // suppression element id = element
              this.$store.dispatch('deleteArticles', element)
                .then(response => {
                  // remove element from state
                  this.checked.splice(this.checked.indexOf(element), 1)
                  // toast
                  this.$bvToast.toast('Bien supprimé', {
                    title: 'Article',
                    toaster: 'b-toaster-bottom-right',
                    solid: true
                  })
                })
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
