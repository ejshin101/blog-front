import Footer from '@components/common/Footer.vue'
import Signin from '../views/auth/Signin.vue'
import MenuBar from '@components/common/MenuBar.vue'
import Header from '@components/common/Header.vue'
import Redirect from "@components/auth/Redirect.vue";


export const AuthRouters = [
    {
        path:'/signin',
        name: 'Signin',
        components: {
            header: Header,
            menu: MenuBar,
            default: Signin,
            footer: Footer
        }
    },
    {
        path: '/redirect',
        name: 'Redirect',
        components: { default: Redirect }
    }
]