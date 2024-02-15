import {reactive, computed} from 'vue'
import client from '@/modules/client'

export const useBoard = () => {
    const state = reactive({
        board: null,
        boards: [],
        totalPages: Number,
        currentNum : Number,
        boardTotal : Number,
        countCategory: [],
    })

    const board = computed(() => state.board)
    const boards = computed(() => state.boards)
    const totalPages = computed(() => state.totalPages)
    const currentNum = computed(() => state.currentNum)
    const boardTotal = computed(() => state.boardTotal)
    const countCategory = computed(() => state.countCategory)
    const size = 9 //한 페이지당 boardlist에 뿌릴 데이터 size

    const FETCH_LIST = (boards) => {
        state.boards = boards
    }

    const FETCH_ONE = (board) => {
        state.board = board
    }

    const FETCH_PAGES = (pages) => {
        state.totalPages = pages
    }

    const FETCH_CURRENT = (num) => {
        state.currentNum = num
    }
    const FETCH_TOTAL = (num) => {
        state.boardTotal = num
    }
    const FETCH_COUNT = (countCategory) => {
        state.countCategory = countCategory
    }

    const fetchBoardList = (page) => {
        return client.get(`/api/boards/?page=${page}&size=${size}`)
            .then(res => {
                FETCH_TOTAL(res.data.totalElements)
                FETCH_LIST(res.data.content)
                FETCH_PAGES(res.data.totalPages)
                FETCH_CURRENT(res.data.pageable.pageNumber)
            })
    }

    const fetchBoard = (boardNo) => {
        return client.get(`/api/boards/${boardNo}`)
            .then(res => {
                FETCH_ONE(res.data)
            })
    }

    const searchBoard = (searchKeyword, search, page, categoryStr) => {
        if (searchKeyword === "C001" || searchKeyword === "") searchKeyword = 'title'
        if (searchKeyword === "C002") searchKeyword = 'content'
        if (searchKeyword === "C003") searchKeyword = 'category'
        if (categoryStr !== null || categoryStr !== '' || categoryStr !== undefined) {
            return client.get(`/api/boards/search/${searchKeyword}/?${searchKeyword}=${search}&page=${page}&size=${size}`)
                .then(res => {
                    FETCH_TOTAL(res.data.totalElements)
                    FETCH_LIST(res.data.content)
                    FETCH_PAGES(res.data.totalPages)
                    FETCH_CURRENT(res.data.pageable.pageNumber)
                })
        } else {
            return client.get(`/api/boards/search/${searchKeyword}/category/?${searchKeyword}=${search}&category=${categoryStr}&page=${page}&size=${size}`)
                .then(res => {
                    FETCH_TOTAL(res.data.totalElements)
                    FETCH_LIST(res.data.content)
                    FETCH_PAGES(res.data.totalPages)
                    FETCH_CURRENT(res.data.pageable.pageNumber)
                })
        }
    }

    const fetchCountCategory = () => {
        return client.get(`/api/boards/count`)
            .then(res => {
                FETCH_COUNT(res.data)
                }
            )
    }
    const searchCountCategory = (searchKeyword, search) => {
        if (searchKeyword === "C001" || searchKeyword === "") searchKeyword = 'title'
        if (searchKeyword === "C002") searchKeyword = 'content'
        if (searchKeyword === "C003") searchKeyword = 'category'
        return client.get(`/api/boards/count/${searchKeyword}/?${searchKeyword}=${search}`)
            .then(res => {
                    FETCH_COUNT(res.data)
                }
            )

    }

    return {
        board,
        boards,
        totalPages,
        currentNum,
        boardTotal,
        countCategory,
        fetchBoard,
        fetchBoardList,
        searchBoard,
        fetchCountCategory,
        searchCountCategory
    }
}