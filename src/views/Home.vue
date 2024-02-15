<template>

<div class="home">
  <main>
    <section class="section section--welcome home__welcome">
      <div class="home__welcome-bg parallax" data-stellar-ratio="0.7"></div>
      <div class="home__welcome-layer">
        <div class="container">
          <div class="row">
            <div class="col col--sm-8 col--sm-offset-2 col--md-12 col--md-offset-0 col--lg-10 col--lg-offset-1">
              <div class="row">
                <div class="col col--md-6">
                  <h2 class="home__welcome-title">Hello👩‍💻,<br>
                    I'm your web Developer.<br>
                  </h2>
                </div>
                <div class="col col--md-6">
                  <p class="home__welcome-content">My name is Eunji Shin (Ella) and I am a full-stack web developer based in Seoul, South Korea.
                    I have 3 years of experience in the software industry. I have done 5 projects developing eFDS (e-commerce Fraud Detecting System), CMS (Content Management System) and other web development projects with Java, Kotlin, Spring, RDBMS (Oracle, MySQL), NoSQL (MongoDB), Javascript, Vue.js, Git, SVN, Jira, Notion and so on.
                    I am good at communicating and organizing information because I was a librarian for a year and a half.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section home__about" id="about">
      <div class="container">
        <div class="row">
          <div class="col col--sm-8 col--sm-offset-2 col--md-12 col--md-offset-0 col--lg-10 col--lg-offset-1">
            <div class="row">
              <div class="col col--md-6">
                <h2 class="home__about-title">About me</h2>
              </div>
              <div class="col col--md-6">
                <p class="home__about-content">
                  I was a child who liked reading books, playing computer games and surfing the web. My background made me curious about how to find accurate information as well as organize it.
                  While I was in university, I had a chance to learn HTML, SQL and other computer programming languages. After becoming a librarian, I felt a strong desire to learn more web development skills. I enjoy being challenged and learning constantly, and I want my future experiences to expand on my knowledge.

                </p>
              </div>
              <div class="col col--md-6">
                <figure class="home__about-figure">
<!--                  <img src="http://placehold.it/720x544" alt="My photo">-->
                </figure>
              </div>
              <div class="col col--md-6">
                <h3 class="home__about-skills-title">Skills</h3>
                <!-- skills -->

                <ul class="skills">

                  <li class="skills__item">
                    <div class="skills__title">Java & Spring</div>
                    <div class="skills__value">90%</div>
                    <div class="skills__progress"><span style="right:10%;"></span></div>
                  </li>

                  <li class="skills__item">
                    <div class="skills__title">Javascript</div>
                    <div class="skills__value">90%</div>
                    <div class="skills__progress"><span style="right:10%;"></span></div>
                  </li>

                  <li class="skills__item">
                    <div class="skills__title">SQL</div>
                    <div class="skills__value">80%</div>
                    <div class="skills__progress"><span style="right:20%;"></span></div>
                  </li>

                  <li class="skills__item">
                    <div class="skills__title">Vue.js</div>
                    <div class="skills__value">80%</div>
                    <div class="skills__progress"><span style="right:20%;"></span></div>
                  </li>

                </ul>


                <!-- end of skills -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section home__about">
      <div class="container">
        <div class="row">
          <div class="col col--sm-8 col--sm-offset-2 col--md-12 col--md-offset-0 col--lg-10 col--lg-offset-1">
            <div class="row">
              <div class="col">
                <template v-for="(board, idx) in boards" :key="idx">
                  <template v-if="idx === 0">
                    <div class="home__blog-wrapper">
                      <router-link class="home__blog-preview" :to="{name:'BoardReadView', params: {boardNo: board.boardNo}}">
                        <div class="home__blog-preview-img">
                          <template v-if="fnGetThumbnail(board.content).length > 0">
                            <template v-dompurify-html="fnGetThumbnail(board.content)"/>
                          </template>
                          <template v-if="fnGetThumbnail(board.content).length <= 0">
                            <img src="../assets/img/welcome.png">
                          </template>
                        </div>
                        <h3 class="home__blog-preview-title ">{{board.title}}</h3>
                        <p class="home__blog-preview-text" v-dompurify-html="fnGetFirstParagraph(board.content)"></p>
                        <p class="home__blog-preview-date">{{board.regDate}}</p>
                      </router-link>
                      <div class="home__blog-title">
                        <h2 class="home__blog-title-text">New in&nbsp;blog</h2>
<!--                        <router-link :to="{name:'BoardListView'}" class="btn home__blog-link">-->
<!--                          View all posts-->
<!--                        </router-link>-->
                      </div>
                    </div>
                  </template>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <portfolio :boards="boards"/>

    <section class="section section--contacts home__contacts" id="contacts">
      <div class="container">
        <div class="row">
          <div class="col col--sm-8 col--sm-offset-2 col--md-12 col--md-offset-0 col--lg-10 col--lg-offset-1">
            <div class="row">
              <div class="col col--md-12">
                <h2 class="home__contacts-title">Contacts</h2>
              </div>
              <div class="col col--md-5">
                <p class="home__contacts-content">Do you have questions, offer a job?<br>Feel free to contact me!</p>
                <div class="home__contacts-info">
                  <p class="home__contacts-geo">Seoul, Republic of Korea</p>
                  <p class="home__contacts-mail"><a href="mailto:blogeunji@gmail.com" target="_top">blogeunji@gmail.com</a></p>
                </div>
              </div>
              <div class="col col--md-7">
                <!-- contact form -->

                <form class="form" id="contact-form">
                  <div class="row">
                    <div class="col col--sm-5 field">
                      <input id="name" type="text" class="field__input field--name required" v-model="name" required>
                      <label for="name" class="field__label" >Name</label>
                    </div>
                    <div class="col col--sm-7 field">
                      <input id="email" type="email" class="field__input field--email required" v-model="email" required>
                      <label for="email" class="field__label">Email</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col field">
                      <input id="title" type="text" class="field__input field--email required" v-model="title" required>
                      <label for="title" class="field__label">Title</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col field">
                      <textarea id="text" class="field__textarea field--message required" v-model="content" required></textarea>
                      <label for="text" class="field__label">Message</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="form--notice"></div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div style="display: flex; align-items: center;">
                        <!-- Submit 버튼 -->
                        <input @click="sendMail" type="button" class="btn form__btn form__btn--submit" value="Send message">
                        <!-- 로딩 스피너 -->
                        <div id="loading-spinner" class="loading-spinner" v-if="isLoading" style="margin-left: 10px;"></div>
                      </div>
                    </div>
                  </div>
                </form>
                <!-- end of contact form -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <!-- footer -->

  <!-- end of footer -->
  </div>
</template>

<script>

import {inject, onMounted, ref} from "vue";
import Portfolio from "@components/home/Portfolio.vue";
import client from "@/modules/client";
import {router} from "@router/router";

export default {
  name:'Home',
  components: {Portfolio},
  setup() {
    const fetchBoardList = inject("fetchBoardList")
    const boards = inject("boards")
    const name = ref()
    const email = ref()
    const title = ref()
    const content = ref()
    const isLoading = ref(false);

    const sendMail = async () => {
      isLoading.value = true
      try {
        await client.post('/api/sendmail', {
          address: email.value,
          subject: title.value,
          content: content.value,
          name: name.value
        });
        alert('성공적으로 메일이 발송되었습니다.');
        router.go(0);
      } catch (error) {
        alert('메일 발송에 실패하였습니다.');
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    }

    onMounted(() => {
      fetchBoardList(0)
    })
    const fnGetFirstParagraph = (str) => {
      // show the first paragraph on the board list.
      const indexNum = str.indexOf("</p>") + 4
      const getParagraph = str.substring(0, indexNum)
      return getParagraph
    }
    const fnGetThumbnail = (str) => {
      // make the first added image as a thumbnail.
      const startNum = str.indexOf("<img")
      const endNum = str.indexOf("</figure>")
      const getImg = str.substring(startNum, endNum)
      return getImg
    }
    return {
      boards,
      name,
      email,
      title,
      content,
      isLoading,
      fnGetFirstParagraph,
      fnGetThumbnail,
      sendMail
    }
  }
}
</script>
<style>
.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
