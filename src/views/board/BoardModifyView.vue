<template>
  <div class="article">
    <div class="col col--sm-8 col--sm-offset-2 col--md-12 col--md-offset-0 col--lg-10 col--lg-offset-1">
      <div>
        <board-modify-form v-if="board" :board="board" @modify-post="modifyPost"/>
        <p v-else>loading...</p>
      </div>
    </div>
  </div>
</template>
<script>
import BoardModifyForm from '@components/board/BoardModifyForm.vue'
import client from '@/modules/client'
import {router} from '@router/router'
import {inject} from 'vue'

export default {
  name: 'BoardModifyView',
  components: {BoardModifyForm},
  props: {
    boardNo: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const board = inject("board")
    const fetchBoard = inject("fetchBoard")

    fetchBoard(props.boardNo)
        .catch(err => {
          alert(err.response.data.message)
          router.back()
        })

    const modifyPost = (payload) => {
      const {title, content} = payload
      client.put(`/api/boards/${props.boardNo}`, {title, content})
          .then(res => {
            alert('수정 되었습니다.')
            router.push({
              name: 'BoardReadView',
              params: {boardNo: res.data.boardNo.toString()}
            })
          })
          .catch(err => {
            if (err.response.status === 401) {
              alert('로그인이 필요합니다.')
              router.push({name:'Signin'})
            } else if (err.response.status === 403) {
              alert('접근 권한이 없습니다.')
              router.back()
            } else {
              alert(err.response.data.message)
            }
          })
    }
    return {
      board,
      modifyPost,
    }
  }
}
</script>

<style scoped>

</style>