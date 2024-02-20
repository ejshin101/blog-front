<template>
  <div class="comments__footer">
    <div class="comments__form" id="commentsForm">
      <!-- commentForm -->
      <form class="form form--comment comment">
        <div class="comment__photo">
          <figure class="comment__photo-wrapper">
            <img src="/logo2.png" alt="avatar" class="comment__photo-img">
          </figure>
        </div>
        <div class="comment__content">
          <div class="row">
            <div class="col field">
              <textarea id="text" class="field__textarea" v-model="content" required></textarea>
              <label for="text" class="field__label">Message</label>
            </div>
          </div>
          <div class="row">
            <div class="col col--sm-6 field">
              <input id="name" type="text" class="field__input" v-model="author" required>
              <label for="name" class="field__label">Name</label>
            </div>
            <div class="col col--sm-6 field">
              <input id="Password" type="password" class="field__input" v-model="guestPw" required>
              <label for="Password" class="field__label">Password</label>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button type="submit" class="btn form__btn form__btn--submit" @click="addComment">Post Comment</button>
            </div>
          </div>
        </div>
      </form>
      <!-- end of commentForm -->
    </div>
  </div>
</template>

<script>
import client from "@/modules/client";
import {ref} from "vue";

export default {
  name: "GuestRegisterForm",
  props: {
    childrenNo: {
      type: Number
    },
    olderNo: {
      type: Number
    },
    parentsNo: {
      type: Number
    },
    childrenPw: {
      type: String
    },
    parentsPw: {
      type: String
    }
  },
  setup(props) {

    let content = ref("")
    let author = ref("")
    let guestPw = ref("")

    const addComment = () => {
      content = content.value
      author = author.value
      guestPw = guestPw.value

      if (props.childrenNo === undefined && props.parentsNo === undefined) {
        return client.post(`/api/guests`, {content, author, guestPw})
            .then(res => {
              alert('등록 되었습니다.')
            }).catch(err => {
          alert(err)
        })
      } else if (props.parentsNo != undefined) {
        return client.post(`/api/guests`, {content, author, guestPw, pguestNo: props.parentsNo})
            .then(res => {
              alert('등록 되었습니다.')
            }).catch(err => {
          alert(err)
        })
      } else if (props.childrenNo != undefined) {
        return client.post(`/api/guests`, {content, author, guestPw, pguestNo: props.olderNo, cguestNo: props.childrenNo})
            .then(res => {
              alert('등록 되었습니다.')
            }).catch(err => {
          alert(err)
        })
      }
    }

      return {
        author,
        content,
        guestPw,
        addComment
      }

  }
}
</script>
