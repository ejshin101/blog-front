<template>
<div>
</div>
</template>
<script>

import {getCurrentInstance, onMounted, ref} from "vue";
import {useAuth} from "@/compositions/useAuth";
import {router} from "@router/router";

export default {
  name: "Redirect",
  setup() {
    const token = ref('')

    onMounted(() => {
      token.value = getCurrentInstance().proxy.$route.query.token //vue-router를 쓰면 $route로 접근 가능
      if (token.value) {
        useAuth().SET_ACCESS_TOKEN(token.value)
        alert('Welcome😍️')
        router.push({name: 'Home'})
      }
    })

    return {
      token,
    }
  }
}

</script>