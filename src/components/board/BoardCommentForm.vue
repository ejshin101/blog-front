<template>
  <div class="article__comments">
    <div class="row">
      <div class="col col--md-10 col--md-offset-1 col--lg-8 col--lg-offset-2">
        <!-- comments -->
        <div ref="comments"></div>


        <!-- end of comments -->
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "BoardCommentForm",
  mounted() {
    const utterances = document.createElement('script')
    utterances.type = 'text/javascript'
    utterances.async = true
    utterances.crossOrigin = 'anonymous'
    utterances.src = 'https://utteranc.es/client.js'
    utterances.setAttribute("issue-term", "pathname"); // pathname|url|title|og:title 중 택 1
    utterances.setAttribute("theme", "boxy-light"); // theme 설정 (github-light, github-dark, preferred-color-scheme, github-dark-orange, icy-dark, dark-blue, photon-dark, boxy-light) 중 하나 선택
    utterances.setAttribute('repo', 'ejshin101/comments')// 주의!! 사용할 repository

    this.$refs.comments.appendChild(utterances)
  }
}
</script>

<style scoped>

</style>