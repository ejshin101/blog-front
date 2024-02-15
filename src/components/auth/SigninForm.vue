<template>
  <form @submit.prevent="fnSignin">
      <div class="row">
        <div class="col field">
          <input type="text" id="email" v-model="userId" class="field__input field--name" required>
          <label for="email" class="field__label">E-mail</label>
        </div>
      </div>
      <div class="row">
        <div class="col field">
          <input type="password" id="password" v-model="password" class="field__input field--name" required>
          <label for="password" class="field__label">Password</label>
        </div>
      </div>
      <div class="row">
        <div class="col cols" >
          <button type="submit" class="btns">Sign In</button>
        </div>
      </div>
    <div class="row">
      <div class="col cols">
        <router-link class="btns" :to="{name:'AdminSetupView'}">Sign UP</router-link>
      </div>
    </div>
    <div class="row">
      <div class="col cols">
        <a class="icon icon--google" href="https://api.shin-eunji.com/oauth2/authorization/google?redirect_uri=https://blog.shin-eunji.com/redirect">
        </a>
      </div>
    </div>
  </form>
</template>

<script>
import {ref} from 'vue'
export default {
  name: "SigninForm",
  emits: ['sign-in'],
  setup(props, context) {
    //components data
    const userId = ref('')
    const password = ref('')

    const fnSignin = () => {
      context.emit('sign-in', {
        userId: userId.value,
        password: password.value
      })
    }

    //변수 반환
    return {
      userId,
      password,
      fnSignin,
    }
  }
}
</script>

<style scoped>

</style>