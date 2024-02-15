import {createRouter, createWebHistory} from 'vue-router'
import routes from '@router/routes'

export const router = createRouter({
    history: createWebHistory(),
    routes,
    //페이지 이동 시 스크롤 최상단
    scrollBehavior(to, from, savedPosition){
        return { top : 0 }
    }
})