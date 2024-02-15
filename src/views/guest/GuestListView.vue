<template>
  <div class="blog">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="page__title blog__title">GUEST</h1>
            <GuestList :guests="guests" :childArr="childArr"/>

            <div class="row" style="display: flex; justify-content: center; align-items: center; margin-top: 20px;  margin-bottom: 20px;">
              <div class="col col--sm-2">
                <select id="searchKeyword" class="field__input" v-model="searchKeyword">
                  <category :searchCategories="guestCategories"/>
                </select>
              </div>
              <div class="col col--sm-5">
                <input type="text" class="field__input" id="search" @keyup.enter="fnGetOption" v-model="search">
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

import {inject, onMounted, ref} from "vue";
import GuestList from "@components/guest/GuestList.vue";
import Pagination from "@components/common/Pagination.vue";
import Category from '@components/common/Category.vue'

export default {
  name: 'GuestListView',
  components: {Pagination, GuestList, Category},
  setup() {
    const guests = inject("guests")
    const childArr = inject("childArr")

    const fetchGuestList = inject("fetchGuestList")
    const searchGuest = inject("searchGuest")
    const totalPages = inject("guestTotalPages")
    const currentNum = inject("guestCurrentNum")
    let currentPage = ref("")
    const search = ref("")
    const searchKeyword = ref("")

    const searchCategory =  inject("searchCategory")
    const guestCategories = inject("guestCategories")

    onMounted(() => {
      fetchGuestList(0)
      searchCategory("group","ES001", "guest")
    })

    const fnGetOption = (param) => {
      currentPage = param.currentPage

      if (searchKeyword.value === "" || searchKeyword.value === null) {
        alert("옵션을 선택하세요")
      } else {
        if (param.currentPage === undefined) {
          searchGuest(searchKeyword.value, search.value, 0)
        } else {
          searchGuest(searchKeyword.value, search.value, currentPage-1)
        }
        window.scroll({
          top:710,
          left:0,
          behavior: 'auto'
        })
      }
    }

    return {
      guests,
      childArr,
      fetchGuestList,
      totalPages,
      currentNum,
      currentPage,
      searchKeyword,
      guestCategories,
      search,
      searchGuest,
      fnGetOption
    }
  }
}
</script>