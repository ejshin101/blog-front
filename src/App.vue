<template>
<!-- 여기에 경로가 일치하는 컴포넌트가 들어감 -->
    <router-view name="header"/>
    <router-view name="menu"/>
    <router-view/>
    <router-view name="footer" />
</template>

<!--최상위 컴포넌트 정의-->
<script>
import {provide} from 'vue'
import Cookies from 'js-cookie'
import {useAuth} from '@/compositions/useAuth'
import {useBoard} from '@/compositions/useBoard'
import {router} from "@router/router";
import {useGuest} from "@/compositions/useGuest";
import {useModal} from "@/compositions/useModal";

export default {
  name: 'App',
  setup() {
    const {
      myinfo,
      isAuthorized,
      isAdmin,
      isMember,
      signin,
      signinByToken,
      signout
    } = useAuth()

    provide('myinfo', myinfo)
    provide('isAuthorized', isAuthorized)
    provide('isAdmin', isAdmin)
    provide('isMember', isMember)
    provide('signin', signin)
    provide('signout', signout)


    const {
      board,
      boards,
      totalPages,
      currentNum,
      boardTotal,
      countCategory,
      fetchBoardList,
      fetchBoard,
      searchBoard,
      fetchCountCategory,
      searchCountCategory
    } = useBoard()

    provide("board", board)
    provide("boards", boards)
    provide("totalPages", totalPages)
    provide("currentNum", currentNum)
    provide("boardTotal", boardTotal)
    provide("countCategory", countCategory)
    provide("fetchBoardList", fetchBoardList)
    provide("fetchBoard", fetchBoard)
    provide("searchBoard", searchBoard)
    provide("fetchCountCategory", fetchCountCategory)
    provide("searchCountCategory", searchCountCategory)

    const {
      guest,
      guests,
      childArr,
      guestTotalPages,
      guestCurrentNum,
      guestTotal,
      fetchGuestList,
      searchGuest,
      fnUpdateCmt,
      getCount
    } = useGuest()

    provide("guest", guest)
    provide("guests", guests)
    provide("childArr", childArr)
    provide("guestTotalPages", guestTotalPages)
    provide("guestCurrentNum", guestCurrentNum)
    provide("guestTotal", guestTotal)
    provide("fetchGuestList", fetchGuestList)
    provide("searchGuest", searchGuest)
    provide("fnUpdateCmt", fnUpdateCmt)
    provide("getCount", getCount)

    const {
      category,
      categories,
      searchCategories,
      optionCategories,
      guestCategories,
      fetchCategoryList,
      searchCategory,
    } = useModal()

    provide("category", category)
    provide("categories", categories)
    provide("searchCategories", searchCategories)
    provide("optionCategories", optionCategories)
    provide("guestCategories", guestCategories)
    provide("fetchCategoryList", fetchCategoryList)
    provide("searchCategory", searchCategory)



    //인스턴스가 마운트 된 후 단계
    // onMounted(() => {
    //   const savedToken = Cookies.get('accessToken')
    //   if (savedToken) {
    //     signinByToken(savedToken).then(res => {
    //       console.log('Logined By Token')
    //     })
    //   }
    // })
    // 위 코드를 이렇게 바꾸니 쿠키를 받은 후에 페이지가 이동했다 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ 이틀 고생함

    router.beforeEach(async (to, from, next) => {
      const savedToken = Cookies.get('accessToken');
      if (savedToken) {
        await signinByToken(savedToken);
      }

      next();
    });
  }
}
</script>