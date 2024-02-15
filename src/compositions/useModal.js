import {computed, reactive} from "vue";
import client from "@/modules/client";
import {router} from "@router/router";

export const useModal = () => {
    const state = reactive({
        category: null,
        categories: [],
        searchCategories: [],
        optionCategories: [],
        guestCategories: [],
    })

    const category = computed(() => state.category)
    const categories = computed(() => state.categories)
    const searchCategories = computed(() => state.searchCategories)
    const optionCategories = computed(() => state.optionCategories)
    const guestCategories = computed(() => state.guestCategories)

    const FETCH_LIST = (categories) => {
        state.categories = categories
    }

    const FETCH_ONE = (category) => {
        state.category = category
    }

    const FETCH_SEARCH = (searchCategories) => {
        state.searchCategories = searchCategories
    }
    const FETCH_OPTION = (optionCategories) => {
        state.optionCategories = optionCategories
    }
    const FETCH_GUEST = (guestCategories) => {
        state.guestCategories = guestCategories
    }

    const fetchCategoryList = () => {
        return client.get(`/api/categories`)
            .then(res => {
                FETCH_LIST(res.data)
            })
    }

    const searchCategory = (searchKeyword, search, option) => {
        if(option === "search") {
            return client.get(`/api/categories/search/${searchKeyword}/?${searchKeyword}=${search}`)
                .then(res => {
                    FETCH_SEARCH(res.data)
                })
        } else if (option === "option") {
            return client.get(`/api/categories/search/${searchKeyword}/?${searchKeyword}=${search}`)
                .then(res => {
                    FETCH_OPTION(res.data)
                })
        } else if (option === "guest") {
            return client.get(`/api/categories/search/${searchKeyword}/?${searchKeyword}=${search}`)
                .then(res => {
                    FETCH_GUEST(res.data)
                })
        }
    }

    const deleteCategory = (categoryNo, groupId, categoryCd, categoryNm, categoryOrder) => {
        if (content != undefined){
            return client.put(`/api/categories/${categoryNo}`, {
                groupId: groupId,
                categoryCd: categoryCd,
                categoryNm: categoryNm,
                categoryOrder: categoryOrder
            }).then(res => {
                alert('수정 되었습니다.')
                router.go(0)
            }).catch(err => {
                if (err.response.status === 403) {
                    alert('접근 권한이 없습니다.')
                } else {
                    alert(err.response.data.message)
                }
            })
        } else if (groupId === undefined) {
            return client.delete(`/api/categories/${categoryNo}`)
                .then(res => {
                    alert('삭제 되었습니다.')
                    router.go(0)
            }).catch(err => {
                if (err.response.status === 403) {
                    alert('접근 권한이 없습니다.')
                } else {
                    alert(err.response.data.message)
                }
            })
        }
    }

    return {
        category,
        categories,
        searchCategories,
        optionCategories,
        guestCategories,
        fetchCategoryList,
        searchCategory,
    }
}