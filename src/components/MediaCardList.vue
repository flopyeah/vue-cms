<template>
  <b-card-group columns>
    <div class="custom-file">
      <input type="file"
             id="customFile"
             class="custom-file-input"
             name="media"
             ref="media"
             multiple
             accept="image/*"
             v-on:change="onFilePicked" />
      <label class="custom-file-button" for="customFile">
        <div class="custom-file-click">
          <div>Ajouter une photo</div>
          <fa-icon icon="upload" />
        </div>
      </label>
    </div>
    <b-card  v-if="file.url !== ''" :img-src="file.url" img-top>
      <b-card-text>
        <b-spinner small label="Small Spinner" type="grow"></b-spinner>
      </b-card-text>
    </b-card>
    <div class="card" v-for="(media) in medias" :key="media.id" :class="{'bg-selected': (checked !== undefined && checked.includes(media.id))}">

      <img class="card-img-top pointer" @click="descriptionImage(media.id)" :src="media.url" :alt="media.title" :title="media.title">
      <div class="card-body">
        <p class="card-text">
          <b-form-checkbox :id="'media_'+media.id" v-model="checked" @change="checkedItem($event)" :value="media.id" >{{ media.title }}</b-form-checkbox>
          <!-- media['@id'] -->
        </p>
      </div>
    </div>
  </b-card-group>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'MediaCardList',
  computed: {
    ...mapGetters([
      'BUTTON_SAVING'
    ])
  },
  props: {
    medias: [Array],
    multiple: [Boolean]
  },
  data () {
    return {
      file: {
        loading: false,
        name: '',
        url: '',
        image: ''
      },
      checked: []
    }
  },
  methods: {
    onFilePicked (e) {
      const files = e.target.files

      const uploadFile = this.$refs.media.files[0]

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
          // this.$store.dispatch('addMedia', this.file.url)
          // this.$store.dispatch('addMedia', files[0])

          let formData = new FormData()
          /*
              Add the form data we need to submit
          */
          console.log(uploadFile)

          formData.append('file', uploadFile)

          this.$store.dispatch('addMedia', formData).then(() => {
            this.resetImage()
          }).catch((error) => {
            console.log('ERROR', error)
            this.resetImage()
          })
        })
      } else {
        this.resetImage()
      }
    },
    resetImage () {
      this.file.name = ''
      this.file.image = ''
      this.file.url = ''
    },
    checkedItem (event) {
      if (this.multiple === false) {
        if (event !== null) {
          this.checked = [event]
        } else {
          this.checked = []
        }
      }
      this.$emit('selelectedItems', this.checked)
    },
    descriptionImage (media) {
      if (this.multiple === true) {
        this.$store.commit('SET_RIGHT_DRAWER', true)
        this.$store.commit('SET_LEFT_DRAWER', false)
        let mediaInfo = this.medias.find(obj => obj.id === media)
        this.$emit('mediaInfo', mediaInfo)
        let photoInfo = document.getElementById('right-photo-info')
        // console.log(photoInfo.scrollHeight)
        photoInfo.scrollTo({bottom: 2000, behavior: 'smooth'})
      } else {
        this.checkedItem(media)
      }
    }
  }
}
</script>
