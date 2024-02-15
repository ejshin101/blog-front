import MenuBar from '@components/common/MenuBar.vue'
import Footer from '@components/common/Footer.vue'
import AdminSetupView from '@components/auth/AdminSetupView.vue'
import Header from "@components/common/Header.vue";

export const MemberRouters = [
    {
        path:'/user/setup',
        name:'AdminSetupView',
        components: {
            header: Header,
            menu: MenuBar,
            default: AdminSetupView,
            footer: Footer
        }
    }
]