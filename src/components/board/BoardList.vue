<template>
  <div class="blog">
    <div class="container">
      <div class="comments__header">
        <div class="comments__label">

        </div>
<!--        <span class="comments__count">{{ boardTotal }}</span>-->
      </div>
      <div class="comments__header">
        <div class="col col--sm-12">
          <button class="comments__count" @click="fetchBoardList(0),fetchCountCategory(), fnResetBackground()">All</button>
          <template v-for="(category, idx) in countCategory" :key="idx">
            <button class="comments__count" @click="fnSendCategory(category.category), fnBackground(category.category)" :id="category.category">
              {{category.categoryNm}}({{category.count}})
            </button>
          </template>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="blog__grid">
            <!-- blog grid -->
            <div class="row">
              <div class="col" v-if="!boards || Array.isArray(boards) && boards.length === 0">
                <span>Board is empty.</span>
              </div>
              <div class="col col--sm-6 col--md-4" v-else v-for="board in boards" :key="board.boardNo">
                <router-link class="blog__item" :to="{name:'BoardReadView', params: {boardNo: board.boardNo}}">
                  <figure class="blog__item-img">
                    <p v-if="fnGetThumbnail(board.content).length > 0">
                      <p v-dompurify-html="fnGetThumbnail(board.content)"/>
                    </p>
                    <p v-else>
                      <!-- if the content is no added image, show this image as a thumbnail. -->
                      <img src="../../assets/img/welcome.png">
                    </p>
                  </figure>
                  <h5 class="blog__item-title">{{board.title}}</h5>
                  <p class="blog__item-text" v-dompurify-html="fnGetFirstParagraph(board.content)"></p>
                  <p class="blog__item-date">{{board.regDate}}</p>
                </router-link>
              </div>
            </div>
            <!-- end of blog grid -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


import {inject, onMounted, ref} from "vue";

export default {
  name: 'BoardList',
  props: {
    boards: {
      type: Array
    },
    countCategory: {
      type: Array
    }
  },
  emits: ['category-value'],
  setup(props, context) {
    const boardTotal = inject("boardTotal")
    const fetchBoardList = inject("fetchBoardList")
    const fetchCountCategory = inject("fetchCountCategory")

    let categoryCd = ref('')
    const backgroundCheck = ref(false)

    const fnGetFirstParagraph = (str) => {
      // show the first paragraph on the board list.
      const indexNum = str.indexOf("</p>") + 4
      const getParagraph = str.substring(0, indexNum)
      return getParagraph
    }
    const fnGetThumbnail = (str) => {
      // make the first added image as a thumbnail.
      const startNum = str.indexOf("<img")
      const endNum = str.indexOf("</figure>")
      const getImg = str.substring(startNum, endNum)
      return getImg
    }

    const fnSendCategory = (value) => {
      categoryCd.value = value
      const idStr = "#"+value
      context.emit('category-value', {
        categoryCd: categoryCd.value
      })
    }
    const fnBackground = (value) => {
      props.countCategory.forEach((value) => {
        if (document.getElementById(value.category.toString()) !== null) {
          document.getElementById(value.category.toString()).classList.remove('comment__checked')
        }
      })
      document.getElementById(value.toString()).classList.add('comment__checked')
    }

    const fnResetBackground = () => {
      props.countCategory.forEach((value) => {
        if (document.getElementById(value.category.toString()) !== null) {
          document.getElementById(value.category.toString()).classList.remove('comment__checked')
        }
      })
    }

    return {
      boardTotal,
      fetchBoardList,
      fetchCountCategory,
      categoryCd,
      backgroundCheck,
      fnGetFirstParagraph,
      fnGetThumbnail,
      fnSendCategory,
      fnBackground,
      fnResetBackground
    }
  }
}
</script>

<style scoped>

</style>