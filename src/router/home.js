import Home from '@/views/Home.vue'
import Footer from '@components/common/Footer.vue'
import Header from '@components/common/Header.vue'
import menuBar from "@components/common/MenuBar.vue";
export const HomeRouters = [
  {
    path: '/',
    name: 'Home',
    components : {
      header: Header,
      menu: menuBar,
      default: Home,
      footer: Footer
    }
  }
]
