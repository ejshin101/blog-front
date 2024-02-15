import MenuBar from '@components/common/MenuBar.vue'
import Footer from '@components/common/Footer.vue'
import Header from "@components/common/Header.vue";
import ResumeView from "@/views/resume/ResumeView.vue";

export const ResumeRouters = [
    {
        path:'/resume',
        name:'ResumeView',
        components: {
            header: Header,
            menu: MenuBar,
            default: ResumeView,
            footer: Footer
        }
    }
]