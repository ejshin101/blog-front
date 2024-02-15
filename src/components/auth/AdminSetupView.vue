<template>
  <div class="article">
    <div class="col col--sm-8 col--sm-offset-2 col--md-12 col--md-offset-0 col--lg-10 col--lg-offset-1">
      <h1 class="page__title works__title">Sign Up</h1>
      <div>
        <admin-setup-form @register-admin="registerAdmin"/>
      </div>
    </div>
  </div>
</template>

<script>
import client from '../../modules/client.js'
import {router} from '@router/router'
import AdminSetupForm from '@components/member/AdminSetupForm.vue'

export default {
  name: "AdminSetupView",
  components: {
    AdminSetupForm
  },
  setup() {
    const registerAdmin = (payload) => {
      const {userId, userName, userPw, job} = payload
      client.post('/api/users/setup', {userId, userName, userPw, job}).
          then(res => {
            alert('등록이 완료 되었습니다.')
            //등록 후 페이지 이동
            router.push({
              name: 'Signin'
            })
      })
          .catch(err => {
            alert(err)
          })
    }
    return {
      registerAdmin
    }
  }
}
</script>
<style scoped>

</style>