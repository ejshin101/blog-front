import BoardListView from '@/views/board/BoardListView.vue'
import Footer from "@components/common/Footer.vue";
import BoardRegisterView from "@components/board/BoardRegisterView.vue";
import BoardReadView from "@/views/board/BoardReadView.vue";
import BoardModifyView from "@/views/board/BoardModifyView.vue";
import Header from "@components/common/Header.vue";
import menuBar from "@components/common/MenuBar.vue";

export const BoardRouters = [
    //게시판 목록 화면 route
    {
        path: '/board',
        name: 'BoardListView',
        components: {
            header: Header,
            menu: menuBar,
            default:BoardListView,
            footer: Footer
        }
    },

    //게시글 등록 화면 route
    {
        path: '/board/create',
        name: 'BoardRegisterView',
        components: {
            header: Header,
            menu: menuBar,
            default: BoardRegisterView,
            footer: Footer
        }
    },

    //게시글 상세 화면 route
    {
        path: '/board/:boardNo',
        name: 'BoardReadView',
        components: {
            header: Header,
            menu: menuBar,
            default: BoardReadView,
            footer: Footer
        },
        props: {
            default: true
        }
    },

    //게시글 수정 화면 route
    {
        path: '/board/:boardNo/edit',
        name: 'BoardModifyView',
        components: {
            header: Header,
            menu: menuBar,
            default: BoardModifyView,
            footer: Footer
        },
        props: {
            default: true
        }
    },
]