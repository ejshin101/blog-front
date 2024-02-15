<template>
  <section class="section section--portfolio home__portfolio">
    <div class="container">
      <!-- portfolio -->

      <div class="portfolio portfolio--grid">

        <template v-if="!boards || Array.isArray(boards) && boards.length === 0">
        </template>

        <template v-else v-for="board in boards.slice(1)">
          <div class="portfolio__item">
            <router-link :to="{name: 'BoardReadView', params: {boardNo: board.boardNo}}" target="_top" class="portfolio__item-link">
              <div class="portfolio__item-img">
                <p v-if="fnGetThumbnail(board.content).length > 0">
                  <p v-dompurify-html="fnGetThumbnail(board.content)"/>
                </p>
                <p v-else>
                  <!-- if the content is no added image, show this image as a thumbnail. -->
                  <img src="../../assets/img/welcome.png">
                </p>
              </div>
              <div class="portfolio__item-title">
                <h5 class="portfolio__title">{{ board.title }}</h5>
                <small class="portfolio__subtitle">{{board.regDate}}</small>
              </div>
            </router-link>
          </div>
        </template>




        <div class="portfolio__more">
          <router-link :to="{name:'BoardListView'}" class="btn home__blog-link">
            View all posts
          </router-link>
        </div>
      </div>

      <!-- end of portfolio -->
    </div>
  </section>
</template>

<script>
export default {
  name: "Portfolio",
  props: {
    boards:{
      type: Array
    }
  },
  setup(props, context) {
    const fnGetThumbnail = (str) => {
      // make the first added image as a thumbnail.
      const startNum = str.indexOf("<img")
      const endNum = str.indexOf("</figure>")
      const getImg = str.substring(startNum, endNum)
      return getImg
    }

    return {
      fnGetThumbnail
    }
  }
}
</script>
