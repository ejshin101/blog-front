<template>
  <div class="socials">
    <nav class="socials__nav">
      <div class="socials__nav-item">
        <router-link :to="{name:'GuestListView'}" class="socials__link">
          Guest
        </router-link>
      </div>
      <div class="socials__nav-item">
        <router-link :to="{name:'BoardListView'}" class="socials__link">
          Board
        </router-link>
      </div>
      <div class="socials__nav-item">
        <router-link :to="{name:'ResumeView'}" class="socials__link">
          resume
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: "MenuBar",
}
</script>

<style scoped>

</style>