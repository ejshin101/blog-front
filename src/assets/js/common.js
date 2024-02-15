export const commonDom = () => {
    document.addEventListener("DOMContentLoaded", function(event) {
        let el = document.getElementsByClassName('header__nav-link')
        for (let i = 0; i < el.length; i++) {
            el[i].addEventListener('click', (e) => {
                document.getElementById("menu-burger").checked = false;
                document.getElementsByTagName("body")[0].classList.remove("fixed")
                document.getElementsByTagName("html")[0].style.overflow = "auto";
            })
        }
    })
}

export const hasScrolled = () => {
    if(document.documentElement.scrollTop > 60 && !document.getElementById("header").classList.contains("header--scrolled")){
        document.getElementById("header").classList.add("header--scrolled")
    }else if(
        document.documentElement.scrollTop <= 60 && document.getElementById("header").classList.contains("header--scrolled")
    ) {
        document.getElementById("header").classList.remove("header--scrolled")
    }
}

export const scroll = () => {
    window.addEventListener('scroll', (event) => {
        hasScrolled()
    })
}

