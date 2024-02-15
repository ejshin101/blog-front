<template>
      <option value="">Options</option>
  <template v-for="(categories, idx) in searchCategories" :key="categories.categoryCd">
      <option :value="categories.categoryCd">{{categories.categoryNm}}</option>
  </template>
</template>

<script>
export default {
  name: "Category",
  props: {
    searchCategories:{
      type:Array
    }
  }
}
</script>

<style scoped>

</style>