<template>
  <admin-layout>
    <NavBar :right="true" slot="navbar" ></NavBar>
    <button :disabled="SAVING" class="btn btn-primary" form="form_article" @click="saveArticle">
      <b-spinner v-if="SAVING" small type="grow"></b-spinner>
      Enregistrer
    </button>
    <button class="btn btn-danger" @click="deleteArticle">Supprimer</button>
    <b-breadcrumb :items="items"></b-breadcrumb>
      <div class="d-flex justify-content-center mb-3" v-if="LOADING">
        <b-spinner label="Text Centered" type="grow"></b-spinner>
      </div>
      <div v-else>
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

          <b-button class="my-3 btn-lg" @click="showModal(mediaContent)">Selectionner un media cover</b-button>
          <!-- modal Select media -->
          <b-modal id="modal-scrollable" scrollable size="xl" ref="modal-media" title="Selectionner la cover de l'article ">
            <media-card-list :medias="MEDIAS" :multiple="false" @selelectedItems="mediaChecked = $event"/>
            <template v-slot:modal-footer>
              <div class="modal-footer-button">
                <b-button variant="danger" size="sm" class="float-right" @click="hideModal">
                  Annuler
                </b-button>
                <b-button variant="primary" size="sm" class="float-right" @click="selectMedia">
                  Enregister
                </b-button>
              </div>
            </template>
          </b-modal>

          <div v-if="article.cover" class="thumbnail">
            <img :src="article.cover.url" height="50" />
          </div>
          <b-form-group
            class="mb-0"
            label="Descrition"
            label-for="desc-for"
          >
            <b-form-textarea
              id="desc-for"
              v-model="article.description"
              placeholder="Citation" />
          </b-form-group>

          <!-- affichage des differents blocs -->
          <Container @drop="onDrop" class="block-content" lock-axis="y" drag-handle-selector=".column-drag-handle" :drop-placeholder="upperDropPlaceholderOptions">
            <Draggable v-for="(bloc, key) in article.postContents" :key="key">
              <div class="draggable-item">
                <span class="column-drag-handle"><fa-icon icon="sort" /></span>
                <component v-bind:is="'Block'+bloc.blockTypeItem" :content="bloc"></component>
                <div class="close-right"><a v-on:click.once="deleteContent(key)"><fa-icon icon="times-circle" /></a></div>
              </div>
            </Draggable>
          </Container>

          <!-- Ajouter un bloc de contenu -->
          <b-dropdown id="dropdown-1" size="lg" text="Ajouter un bloc de contenu" class="m-md-2 block-content-button">
            <b-dropdown-item v-for="bloc in BLOCKS" :key="bloc.id" @click="addBlock(bloc)"><fa-icon :icon="[bloc.prefix, bloc.icon]" />{{ bloc.title }}</b-dropdown-item>
          </b-dropdown>

        </form>
      </div>
      <div slot="side-right">
        <div class="d-flex justify-content-center mb-3" v-if="LOADING">
          <b-spinner label="Text Centered" type="grow"></b-spinner>
        </div>
        <div v-else>
          <articles-front :article="article" />
        </div>
      </div>
  </admin-layout>
</template>

<script>
import NavBar from '../components/NavBar'
import ArticlesFront from './ArticlesFront'
import { quillEditor } from 'vue-quill-editor'
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag } from '../common/dnd-helpers'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

import MediaCardList from '../components/MediaCardList'
import BlockINSTAGRAM from '../components/blocks/BlockINSTAGRAM'
import BlockPARAGRAPH from '../components/blocks/BlockPARAGRAPH'
import BlockYOUTUBE from '../components/blocks/BlockYOUTUBE'
import BlockCAROUSEL from '../components/blocks/BlockCAROUSEL'
import BlockCOVER from '../components/blocks/BlockCOVER'
import BlockFILE from '../components/blocks/BlockFILE'
import BlockQUOTE from '../components/blocks/BlockQUOTE'
import BlockRELATED from '../components/blocks/BlockRELATED'

// import 'quill/dist/quill.bubble.css'

export default {
  name: 'ArticlesDetail',
  components: { MediaCardList, ArticlesFront, NavBar, quillEditor, BlockINSTAGRAM, BlockPARAGRAPH, BlockYOUTUBE, BlockCAROUSEL, BlockFILE, BlockQUOTE, BlockCOVER, BlockRELATED, Container, Draggable },
  created () {
    this.$store.commit('SET_RIGHT_DRAWER', true)
    this.$store.commit('SET_LEFT_DRAWER', false)
    this.$store.dispatch('fetchOneArticle', this.$route.params.id).then((data) => {
      document.title = document.title + ' - ' + data.title
      this.items.push({
        text: data.title,
        active: true
      })
    })
    this.$store.dispatch('fetchMedias')
    this.$store.dispatch('fetchBlocks')
  },
  computed: {
    article () {
      return this.$store.getters.getArticle
    },
    LOADING () {
      return this.$store.getters.LOADING
    },
    SAVING () {
      return this.$store.getters.SAVING
    },
    MEDIAS () {
      return this.$store.getters.MEDIAS
    },
    BLOCKS () {
      return this.$store.getters.BLOCKS
    }
  },
  data () {
    return {
      file: {
        loading: false,
        name: '',
        url: '',
        image: ''
      },
      items: [
        {
          text: 'Articles',
          to: { name: 'ArticlesList' }
        }
      ],
      mediaContent: 'cover',
      mediaChecked: [],
      upperDropPlaceholderOptions: {
        className: 'cards-drop-preview',
        animationDuration: '150',
        showOnTop: true
      },
      deletedPostContents: [],
      cover: null,
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
  beforeRouteLeave (to, from, next) {
    this.$store.commit('SET_RIGHT_DRAWER', false)
    next()
  },
  methods: {
    saveArticle () {
      let articleSave = this.article
      articleSave.deletedPostContents = this.deletedPostContents
      delete articleSave.dateUpdated
      delete articleSave.dateCreated
      if (articleSave.cover !== null) {
        articleSave.cover = articleSave.cover['@id']
      }
      this.$store.dispatch('saveArticles', articleSave)
        .then(data => {
          // recharge information de l'article
          // this.$store.dispatch('fetchOneArticle', data.id)
        })
    },
    deleteArticle () {
      this.$bvModal.msgBoxConfirm('Êtes vous sûr(e) de vouloir supprimer cet article ?', {
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
            this.$store.dispatch('deleteArticles', this.data.id)
              .then(response => {
                this.$router.push({ name: 'ArticlesList' })
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    onFilePicked (e) {
      const files = e.target.files

      if (files[0] !== undefined) {
        this.file.name = files[0].name
        if (this.file.name.lastIndexOf('.') <= 0) {
          return
        }

        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.file.url = fr.result
          this.file.image = files[0]
          this.$store.dispatch('addImage', this.file)
        })
      } else {
        this.file.name = ''
        this.file.image = ''
        this.file.url = ''
      }
    },
    showModal (media) {
      this.mediaContent = media
      this.$refs['modal-media'].show()
    },
    hideModal () {
      // cover cancel
      this.$refs['modal-media'].hide()
    },
    selectMedia () {
      this.mediaChecked.forEach(element => {
        this.MEDIAS.filter(obj => {
          if (element === obj.id) {
            this.cover = obj
            this.$store.dispatch('changeCover', obj)
          }
        })
      })

      console.log({'content': this.mediaContent, 'media': this.cover})
      this.$refs['modal-media'].hide()
    },
    addBlock (item) {
      let block = {}
      block.blockTypeItem = item.item
      block.blockTypeId = item.id
      block.contentBlockType = item['@id']
      block.post = this.article['@id']
      block.contentData = ''
      block.contentHtml = ''
      this.article.postContents.push(block)
    },
    onDrop (dropResult) {
      this.article.postContents = applyDrag(this.article.postContents, dropResult)
    },
    deleteContent (bloc) {
      if (bloc.id) {
        this.deletedPostContents.push(bloc)
      }
      // remove element from state
      this.article.postContents.splice(bloc, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
