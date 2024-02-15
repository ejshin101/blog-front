<template>
    <div class="article">
      <div class="col col--sm-8 col--sm-offset-2 col--md-12 col--md-offset-0 col--lg-10 col--lg-offset-1">
        <h1 class="page__title works__title">Sign In</h1>
        <signin-form @sign-in="login"/>
      </div>
    </div>
</template>

<script>
import SigninForm from '@components/auth/SigninForm.vue'
import {router} from '@router/router'
import {inject, ref, watch} from 'vue'

export default {
  name: "Signin",
  components: {SigninForm},
  setup() {
    //공유된 로그인 함수 주입
    const signin = inject('signin')

    const login = (payload) => {
      signin(payload).then(res => {
        alert('Welcome😍')
        router.push({name: 'Home'})
      }).catch(err => {
        alert(err)
      })
    }


    //메서드 변수 반환
    return {
      login,
    }
  }
}
</script>

<style scoped>

</style>