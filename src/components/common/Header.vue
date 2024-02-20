<template>
  <header class="header" id="header">
    <div class="container">
      <div class="header__menu">
        <div class="header__logo">
            <router-link :to="{name:'Home'}">
              <img src="/logo2.png" alt="logo">
            </router-link>
        </div>
<!--        <div class="col&#45;&#45;lg-2">-->
<!--          <router-link :to="{name:'ResumeView'}" class="header__nav-link text&#45;&#45;uppercase">-->
<!--            resume-->
<!--          </router-link>-->
<!--        </div>-->
<!--        <div class="col&#45;&#45;lg-2">-->
<!--          <router-link :to="{name:'BoardListView'}" class="header__nav-link text&#45;&#45;uppercase">-->
<!--            Board-->
<!--          </router-link>-->
<!--        </div>-->
<!--        <div class="col&#45;&#45;lg-2">-->
<!--          <router-link :to="{name:'GuestListView'}" class="header__nav-link text&#45;&#45;uppercase">-->
<!--            Guest-->
<!--          </router-link>-->
<!--        </div>-->


        <div style="float: right">
          <div v-if="isAuthorized">
            <span class="welcome__title">Welcome,
              <span v-if="myinfo.authList[0].auth === 'ROLE_ADMIN'">
                🥇
              </span>
              <span v-else>
                🥈
              </span>
              {{myinfo.userName}}</span>
            <button @click="logout" class="btn">Sign Out</button>
          </div>
          <div v-else>
<!--            <router-link :to="{name:'Signin'}">Sign In</router-link>-->
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Signin from "@/views/auth/Signin.vue";
import {inject} from "vue";
import {router} from "@router/router";
import {commonDom, scroll} from "@assets/js/common";

export default {
  name: "Header",
  components: {Signin},
  setup() {
    const isAuthorized = inject('isAuthorized')
    const myinfo = inject('myinfo')
    const signout = inject('signout')

    commonDom()
    scroll()

    const logout = () => {
      signout()
      alert('Good Bye🥺')
      router.push({name: 'Home'})
    }


    return{
      isAuthorized,
      myinfo,
      logout
    }
  }
}
</script>

<style scoped>

</style>