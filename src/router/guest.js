import Footer from '@components/common/Footer.vue'
import Header from '@components/common/Header.vue'
import menuBar from "@components/common/MenuBar.vue";
import GuestListView from "@/views/guest/GuestListView.vue";
export const GuestRouters = [
    {
        path: '/guest',
        name: 'GuestListView',
        components : {
            header: Header,
            menu: menuBar,
            default: GuestListView,
            footer: Footer
        }
    }
]
