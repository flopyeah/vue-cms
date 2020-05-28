<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Preview</a>
    </nav>
    <div v-if="article.cover" class="front-bg" :style="{ backgroundImage: `url('${article.cover.url}')` }">
      <h1>{{ article.title }}</h1>
    </div>
    <div v-else class="front-bg">
      <h1>{{ article.title }}</h1>
    </div>
    <div class="container py-3 front-article">
      <p v-html="article.description"></p>
    </div>
    <div v-for="(content, key) in article.postContents" :key="key">
      <b>{{ content.blockTypeItem }}</b>
      <p  v-html="content.contentData"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticlesFront',
  data () {
    return {
    }
  },
  props: {
    article: {
      type: Object,
      required: false
    }
  }
}
</script>
