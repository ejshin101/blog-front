<template>
  <div class="blog">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="row">
            <board-read v-if="board" :board="board"/>
            <p v-else>loading...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
<script>
import BoardRead from '@components/board/BoardRead.vue'
import client from '@/modules/client'
import {inject} from 'vue'
import {router} from '@router/router'

export default {
  name: 'BoardReadView',
  components: {BoardRead},
  props: {
    boardNo: {
      type: String,
      required: true,
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


    return {
      board,
    }
  }
}
</script>