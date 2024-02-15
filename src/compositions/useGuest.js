import {computed, reactive} from "vue";
import client from "@/modules/client";
import {router} from "@router/router";

export const useGuest = () => {
    const state = reactive({
        guest: null,
        guests: [],
        childArr: [],
        guestTotalPages: Number,
        guestCurrentNum : Number,
        guestTotal:Number,
    })

    const guest = computed(() => state.guest);
    const guests = computed(() => state.guests);
    const childArr = computed(() => state.childArr);
    const guestTotalPages = computed(() => state.totalPages);
    const guestCurrentNum = computed(() => state.currentNum);
    const guestTotal = computed(() => state.guestTotal);
    const size = 10

    const FETCH_LIST = (guests) => {
        state.guests = guests
    }

    const FETCH_ONE = (guest) => {
        state.guest = guest
    }

    const FETCH_PAGES = (pages) => {
        state.totalPages = pages
    }

    const FETCH_CURRENT = (num) => {
        state.currentNum = num
    }
    const FETCH_TOTAL = (num) => {
        state.guestTotal = num
    }
    const FETCH_CHILD = (arr) => {
        state.childArr = arr
    }
    let guestNo = [];
    const fetchGuestList = (page) => {
        guestNo = [];
        return client.get(`/api/guests/?page=${page}&size=${size}`)
            .then(res => {
                res.data.content.forEach((val) => {
                    guestNo.push(val.guestNo);
                })
                getChildrenList()
                getCount()
                FETCH_LIST(res.data.content)
                FETCH_PAGES(res.data.totalPages)
                FETCH_CURRENT(res.data.pageable.pageNumber)
            })
    }

    const getChildrenList = () => {
        return client.post(`/api/guests/children`, guestNo).then(
            res => {
                FETCH_CHILD(res.data)
            }
        )
    }

    const searchGuest = (searchKeyword, search, page) => {
        if (searchKeyword === "A001" || searchKeyword == "") searchKeyword = 'author'
        if (searchKeyword === "A002") searchKeyword = 'content'
        guestNo = [];
        return client.get(`/api/guests/search/${searchKeyword}/?${searchKeyword}=${search}&page=${page}&size=${size}`)
            .then(res => {
                res.data.content.forEach((val) => {
                    guestNo.push(val.guestNo);
                })
                getChildrenList()
                console.log(res.data.content)
                FETCH_TOTAL(res.data.totalElements)
                FETCH_LIST(res.data.content)
                FETCH_PAGES(res.data.totalPages)
                FETCH_CURRENT(res.data.pageable.pageNumber)
            })
    }

    const fnUpdateCmt = (guestNo, password, content) => {
        if (content != undefined){
            return client.put(`/api/guests/${guestNo}`, {
                content: content,
                guestPw: password
            }).then(res => {
                alert('수정 되었습니다.')
                router.go(0)
            }).catch(err => {
                if (err.response.status === 401) {
                    alert('비밀번호가 맞지 않습니다.')
                } else if (err.response.status === 403) {
                    alert('접근 권한이 없습니다.')
                } else {
                    alert(err.response.data.message)
                }
            })
        } else if (content === undefined) {
            return client.delete(`/api/guests/${guestNo}`, {
                //delete로 보낼 땐 post, put과 달리 data로 한번 감싸 파라미터를 보낸다.
                data: {
                    guestPw: password
                }
            }).then(res => {
                alert('삭제 되었습니다.')
                router.go(0)
            }).catch(err => {
                if (err.response.status === 401) {
                    alert('비밀번호가 맞지 않습니다.')
                } else if (err.response.status === 403) {
                    alert('접근 권한이 없습니다.')
                } else {
                    alert(err.response.data.message)
                }
            })
        }
    }

    const getCount = () => {
        return client.get(`/api/guests/count`)
            .then(res => {
                FETCH_TOTAL(res.data)
            })
    }

    return {
        guest,
        guests,
        childArr,
        guestTotalPages,
        guestCurrentNum,
        guestTotal,
        fetchGuestList,
        searchGuest,
        fnUpdateCmt,
        getCount,
    }
}