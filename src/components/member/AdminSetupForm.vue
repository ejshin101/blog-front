<template>
  <form @submit.prevent="fnRegisterAdmin">
    <div class="row">
      <div class="col field">
        <input type="email" id="email" v-model="userId" class="field__input field--name" required>
        <label for="email" class="field__label">E-mail</label>
      </div>
    </div>
    <div class="row">
      <div class="col field">
      <input type="password" id="password" v-model="userPw" class="field__input field--name" required>
        <label for="password" class="field__label">Password</label>
      </div>
    </div>
    <div class="row">
      <div class="col field">
        <input type="text" id="userName" v-model="userName" class="field__input field--name" required>
        <label for="userName" class="field__label">Name</label>
      </div>
    </div>
    <div class="row">
      <div class="col cols">
        <button type="submit" class="btns">Sign Up</button>
      </div>
    </div>
  </form>
</template>

<script>
import {ref} from 'vue'

export default {

  name: "AdminSetupForm",
  emits: ['register-admin'],
  setup(props, context) {
    const userId = ref('')
    const userName = ref('')
    const userPw = ref('')

    //register-admin 이벤트 발생
    const fnRegisterAdmin = (payload) => {
      context.emit('register-admin', {
        userId: userId.value,
        userName: userName.value,
        userPw: userPw.value,
        job: '이용자'
      })
    }
    return {
      userId,
      userName,
      userPw,
      fnRegisterAdmin
    }
  }
}
</script>

<style scoped>

</style>