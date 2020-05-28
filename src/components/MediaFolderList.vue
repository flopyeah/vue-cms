<template>
  <div class="folders row">
    <div class="folder col-3" v-for="(folder) in folders" :key="folder.id">
      <router-link :to="{name: 'MediasListFolder', params : { id : folder.id }}" class="btn btn-outline-secondary btn-block mt-2">
        <fa-icon icon="folder" /> {{ folder.name }}<br>
        <span class="small">4 items</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'MediaFolderList',
  computed: {
    ...mapGetters([
      'BUTTON_SAVING'
    ])
  },
  props: {
    folders: [Array]
  },
  methods: {
    clickFolder () {
      console.log('folder')
    }
  }
}
</script>
