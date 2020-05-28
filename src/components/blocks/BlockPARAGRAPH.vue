<template>
  <div class="card">
    <div class="card-body">
      <b-form-group
        class="mb-0"
        label="Paragraphe"
        label-for="textarea-form"
      >
        <quill-editor
          ref="myQuillEditor"
          v-model="content.contentData"
        />
      </b-form-group>
    </div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'BlockPARAGRAPH',
  components: { quillEditor },
  props: {
    content: {
      type: Object,
      required: false
    }
  }
}
</script>
