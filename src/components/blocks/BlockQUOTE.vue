<template>
  <div class="card">
    <div class="card-body">
      <b-form-group
        class="mb-0"
        label="Citation"
        label-for="title-for"
      >
        <b-form-textarea
          id="title-for"
          v-model="content.contentData"
          placeholder="Citation" />
      </b-form-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockQUOTE',
  props: {
    content: {
      type: Object,
      required: false
    }
  }
}
</script>
