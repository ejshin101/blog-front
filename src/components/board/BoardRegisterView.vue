<template>
  <div class="article">
    <div class="col col--sm-8 col--sm-offset-2 col--md-12 col--md-offset-0 col--lg-10 col--lg-offset-1">
      <div>
        <board-register-form @add-post="addPost"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
<script>
import BoardRegisterForm from '@components/board/BoardRegisterForm.vue'
import client from '../../modules/client'
import {router} from '@router/router'
import BoardModifyForm from "@components/board/BoardModifyForm.vue";
import AdminSetupForm from "@components/member/AdminSetupForm.vue";

export default {
  name: 'BoardRegisterView',
  components: {AdminSetupForm, BoardModifyForm, BoardRegisterForm},
  setup() {
    const addPost = (payload) => {
      const{title, author, content, category} = payload
      client.post('/api/boards', {title, content, author, category})
          .then(res => {
            alert('등록 되었습니다.')

            router.push({
              name: 'BoardReadView',
              params: {boardNo: res.data.boardNo}
            })
          }).catch(err => {
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
      addPost,
    }
  }
}
</script>