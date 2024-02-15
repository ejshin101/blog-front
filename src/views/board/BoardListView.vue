<template>
  <div class="blog">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="page__title blog__title">BOARD</h1>
          <router-link v-if="isAdmin" :to="{name:'BoardRegisterView'}" class="btn" style="float:right;">write</router-link>
          <board-list :boards="boards" :countCategory="countCategory" @category-value="categoryValue"/>
          <div class="row" style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
            <div class="col col--sm-2">
              <select id="searchKeyword" class="field__input" v-model="searchKeyword" @change="fnReset">
                <category :searchCategories="searchCategories"/>
              </select>
            </div>
            <div class="col col--sm-5">
              <template v-if="searchKeyword !== 'C003'">
                <input type="text" class="field__input" id="search" @keyup.enter="fnGetOption" v-model="search">
              </template>
              <template v-else>
                <select id="search" class="field__input" @change="fnGetOption" v-model="search">
                  <category :searchCategories="optionCategories" />
                </select>
              </template>
            </div>
            <div class="col col--sm-1">
              <button class="btn" @click="fnGetOption">search</button>
            </div>
          </div>
          <pagination :totalPages="totalPages" :currentNum="currentNum" @pagination="fnGetOption"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BoardList from '@components/board/BoardList.vue'
import {ref, onMounted, inject} from 'vue'
import Pagination from "@components/common/Pagination.vue";
import Category from '@components/common/Category.vue'

export default {
  name: 'BoardListView',
  components: {Pagination, BoardList, Category},
  setup() {
    const boards = inject("boards")
    const isAdmin = inject("isAdmin")
    const fetchBoardList = inject("fetchBoardList")
    const searchBoard = inject("searchBoard")
    let currentPage = ref("")
    const totalPages = inject("totalPages")
    const currentNum = inject("currentNum")

    const searchCategory =  inject("searchCategory")
    const searchCategories = inject("searchCategories")

    const optionCategory = inject("searchCategory")
    const optionCategories = inject("optionCategories")

    const search = ref("")
    const searchKeyword = ref("")

    const countCategory = inject("countCategory")
    const fetchCountCategory = inject("fetchCountCategory")
    const searchCountCategory = inject("searchCountCategory")

    onMounted(() => {
      //board 최초로 불러올 1페이지
      fetchBoardList(0)
      optionCategory("group","ES002", "option")
      searchCategory("group","ES003", "search")
      fetchCountCategory()
    })

    // 검색기능 추가 전 사용한 페이지 조회 함수 -> 오직 페이지 쪽수에 따라 변함
    // const fnSetEmit = (param) => {
    //   console.log(param)
    //   currentPage = param.currentPage
    //   fetchBoardList(currentPage-1)
    // }

    // 검색 기능 추가 후 페이지 조회 함수, 검색 값을 포함해서 페이지 쪽수도 변화함
    const fnGetOption = (param) => {
      currentPage = param.currentPage

      if (searchKeyword.value === "" || searchKeyword.value === null) {
        alert("옵션을 선택하세요")
      } else {
        searchCountCategory(searchKeyword.value, search.value)
        if (param.currentPage === undefined) {
          searchBoard(searchKeyword.value, search.value, 0)
        } else {
          searchBoard(searchKeyword.value, search.value, currentPage-1)
        }

        window.scroll({
          top:250,
          left:0,
          behavior: 'auto'
        })
      }
    }

    const categoryValue = (payload) => {

      const {categoryCd} = payload

      searchCountCategory("C003", categoryCd)
      searchBoard("C003", categoryCd, 0)
      window.scroll({
        top:250,
        left:0,
        behavior: 'auto'
      })
    }

    const fnReset = () => {
      search.value = ""
    }

    return {
      boards,
      isAdmin,
      fetchBoardList,
      // fnSetEmit,
      searchCategories,
      optionCategories,
      searchBoard,
      fnGetOption,
      searchKeyword,
      search,
      countCategory,
      searchCountCategory,
      totalPages,
      currentNum,
      categoryValue,
      fnReset
    }
  }
}
</script>
<style scoped>

</style>