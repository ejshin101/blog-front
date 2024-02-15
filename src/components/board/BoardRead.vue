<template>
  <div className="article">
    <div className="container container--x1">
      <div className="row">
        <div className="col col--lg-10 col--lg-offset-1">
          <div><input :value="board.boardNo" type="hidden"></div>
          <h1 className="page__title article__title">{{ board.title }}</h1>
          <div className="page__subtitle article__subtitle">
            <div className="article__date">{{ board.regDate }}</div>
            <a href="" className="article__stat"><i className="icon icon--comment"></i></a>
          </div>
        </div>
        <div className="col">
          <div className="article__content">
            <div className="row">
              <div className="col col--sm-10 col--sm-offset-1 col-md-10 col--md-offset-1 col--lg-8 col--lg-offset-2">
                <div className="article__text article__text--large">
                  <p v-dompurify-html="board.content"></p>
                </div>
              </div>
            </div>
          </div>

          <div class="article__shares">
            <div class="row">
              <div class="col col--sm-10 col--sm-offset-1 col--md-10 col--md-offset-1 col--lg-8 col--lg-offset-2">
<!--                <div class="article__shares-icon">-->
<!--                  <a href="#"><i class="icon icon&#45;&#45;twitter"></i></a>-->
<!--                </div>-->
<!--                <div class="article__shares-icon">-->
<!--                  <a href="#"><i class="icon icon&#45;&#45;facebook"></i></a>-->
<!--                </div>-->
<!--                <div class="article__shares-icon">-->
<!--                  <a href="#"><i class="icon icon&#45;&#45;pinterest"></i></a>-->
<!--                </div>-->
                <template v-if="isAuthorized && board && (myinfo.userId === board.author) || isAdmin">
                  <div class="article__button">
                    <router-link :to="{name: 'BoardModifyView', params: {boardNo : board.boardNo}}" class="btn">EDIT</router-link>
                  </div>
                  <div class="article__button">
                    <button @click="deletePost" class="btn" >DELETE</button>
                  </div>
                </template>
                <div class="article__button">
                  <router-link :to="{name: 'BoardListView'}" class="btn" >list</router-link>
                </div>
              </div>
            </div>
          </div>



          <board-comment-form />

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BoardCommentForm from '@components/board/BoardCommentForm.vue'
import {inject} from 'vue'
import {router} from '@router/router'
import client from '@/modules/client'

export default {
  name: 'BoardRead',
  components: {BoardCommentForm},
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const board = inject("board")
    const myinfo = inject("myinfo")
    const isAuthorized = inject("isAuthorized")
    const isAdmin = inject("isAdmin")

    const deletePost = () => {
      const {boardNo, author} = board.value
      client.delete(`/api/boards/${boardNo}?author=${author}`)
          .then(res => {
            alert('삭제되었습니다.')
            router.push({name: 'BoardListView'})
          })
          .catch(err => {
            if (err.response.status === 401) {
              alert('로그인이 필요합니다.')
              router.push({name:'Signin'})
            } else if (err.response.status === 403) {
              alert('접근 권한이 없습니다.')
              router.back()
            } else {
              alert("deletePost"+err.response.data.message)
            }
          })
    }
    return {
      board,
      deletePost,
      isAdmin,
      isAuthorized,
      myinfo
    }
  }
}
</script>

<style scoped>

</style>