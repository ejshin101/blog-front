<template>
  <div class="row">
    <table border="1">
      <tr>
        <th><input type="checkbox"></th>
        <th v-for="header in headers">{{header}}</th>
      </tr>
      <template v-if="!categories || Array.isArray(categories) && categories.length === 0">
        <tr>
          Modal List is empty.
        </tr>
      </template>
        <tr v-else v-for="category in categories">
          <template v-for="(value, i) in category" :key="i">
            <!-- i가 key값으로 나온다. 해당하는 key값은 제외하고 출력할 수 있도록 만듦 -->
            <td v-if="i==='categoryNo'"> <!--1행 반복-->
              <input type="checkbox" name="categoryCd" :value="value">
            </td>
            <td v-else-if="i !== 'regDate' && i !== 'updDate'">
              {{value}} <!--1데이터 반복-->
            </td>
          </template>
        </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'ModalList',
  props: {
    categories: {
      type: Array
    }
  },
  setup(props) {
    const headers = ['그룹ID', '코드', '코드명', '코드순서']

    return {
      headers
    }
  }
}
</script>
<style scoped>

</style>