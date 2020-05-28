<template>
  <admin-layout>
    <NavBar :right="true" :links="links" slot="navbar" ></NavBar>
    <button v-b-modal.modal-prevent-closing class="btn btn-primary"><fa-icon icon="folder-plus" />Nouveau dossier</button>
    <button v-b-modal.modal-prevent-closing class="btn btn-danger" :disabled="!checked.length"><fa-icon icon="trash-alt" />Supprimer</button>
    <!--<button v-b-modal.modal-prevent-closing class="btn btn-primary"><fa-icon icon="plus-circle" />Nouveau Media</button>-->
    <h2>Dossiers</h2>
    <media-folder-list :folders="FOLDERS" />
    <h2>Medias</h2>

    <div v-if="LOADING && !MEDIAS.length">
      <b-spinner small label="Small Spinner" type="grow"></b-spinner>
    </div>
    <media-card-list :medias="MEDIAS" :multiple="true" @mediaInfo="mediaInfo = $event"/>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Nouveau répertoire"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="folder.nameState"
          label="Nom"
          label-for="name-input"
          invalid-feedback="Folder is required"
        >
          <b-form-input
            id="name-input"
            v-model="folder.name"
            :state="folder.nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <div id="right-photo-info" slot="side-right">
      <media-form-right :media="mediaInfo" />
    </div>
  </admin-layout>
</template>

<script>
import NavBar from '../components/NavBar'
import { mapGetters } from 'vuex'
import MediaFormRight from '../components/MediaFormRight'
import MediaFolderList from '../components/MediaFolderList'
import MediaCardList from '../components/MediaCardList'

export default {
  name: 'MediasList',
  components: {MediaCardList, MediaFolderList, MediaFormRight, NavBar},
  created () {
    this.getMediaFolder()
  },
  computed: {
    ...mapGetters([
      'SAVING',
      'LOADING',
      'FOLDERS',
      'MEDIAS'
    ])
  },
  data () {
    return {
      folderId: this.$route.params.id || false,
      file: {
        loading: false,
        name: '',
        url: '',
        image: ''
      },
      checked: [],
      folder: {
        name: '',
        nameState: null
      },
      mediaInfo: false,
      links: [
        {
          'label': 'Nouvelle photo',
          'icon': 'plus-circle',
          'action': 'save'
        },
        {
          'label': 'Nouveau répertoire',
          'icon': 'folder-plus',
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
  watch: {
    $route (to, from) {
      this.folderId = to.params.id || false
      this.getMediaFolder()
    }
  },
  methods: {
    getMediaFolder () {
      this.$store.dispatch('fetchFolders', this.folderId)
      this.$store.dispatch('fetchMedias', this.folderId)
    },
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.folder.nameState = valid
      return valid
    },
    resetModal () {
      this.folder.name = ''
      this.folder.nameState = null
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }

      this.$store.dispatch('saveFolder', this.folder).then(
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
          // this.resetModal()
        })
      )
    }
  }
}
</script>
