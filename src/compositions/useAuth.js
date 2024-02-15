import {computed, reactive} from 'vue'
import client from '@/modules/client'
import Cookies from 'js-cookie'

export const useAuth = () => {
    //애플리케이션 데이터
    const state = reactive({
        accessToken:'',
        myinfo:null,
    })

    const myinfo = computed(() => state.myinfo)

    //로그인 여부 확인
    const isAuthorized = computed(() => {
        return state.accessToken.length > 0 && !!state.myinfo
    })

    //관리자 여부 확인
    const isAdmin = computed(() => {
        if (!state.myinfo || !state.myinfo.authList) {
            return false
        }
        return isAuthorized && state.myinfo.authList[0].auth === 'ROLE_ADMIN'
    })

    //회원 여부 확인
    const isMember = computed(() => {
        if (!state.myinfo || !state.myinfo.authList) {
            return false
        }
        return isAuthorized && state.myinfo.authList[0].auth === 'ROLE_USER'
    })


    //데이터 상태 변경 함수
    const SET_ACCESS_TOKEN = (accessToken) => {
        if (accessToken) {
            state.accessToken = accessToken
            //HTTP 헤더에 토큰 설정
            client.defaults.headers.common.Authorization = `Bearer ${accessToken}`
            
            //쿠키에 액세스 토큰 저장
            Cookies.set('accessToken',accessToken, {expires:1})
        }
    }

    const SET_MY_INFO = (myinfo) => {
        if (myinfo) {
            state.myinfo = myinfo
        }
    }

    //로그인 처리 함수
    const signin = (payload) => {
        return client.post(`/api/authenticate?username=${payload.userId}&password=${payload.password}`, {
            username: payload.userId,
            password: payload.password
        }).then(res => {
            const {authorization}=res.headers
            const accessToken = authorization.substring(7)
            SET_ACCESS_TOKEN(accessToken)
            return client.get('/api/users/myinfo')
        }).then(res => {
            SET_MY_INFO(res.data)
        })
    }

    //저장된 토큰으로 로그인
    const signinByToken = (token) => {
        SET_ACCESS_TOKEN(token)
        return client.get('/api/users/myinfo')
            .then(res => {
                SET_MY_INFO(res.data)
            })
    }

    //DESTROY_ACCESS_TOKEN 상태 변경 함수
    const DESTROY_ACCESS_TOKEN = () => {
        state.accessToken = ''
        delete client.defaults.headers.common.Authorization
        Cookies.remove('accessToken')
    }

    //DESTROY_MY_INFO 상태 변경 함수
    const DESTROY_MY_INFO = () => {
        state.myinfo = null
    }

    //로그아웃 메서드
    const signout = () => {
        DESTROY_MY_INFO()
        DESTROY_ACCESS_TOKEN()
    }

    //객체 변환
    return {
        myinfo,
        isAuthorized,
        isAdmin,
        isMember,
        signin,
        signinByToken,
        SET_ACCESS_TOKEN,
        SET_MY_INFO,
        signout
    }
}