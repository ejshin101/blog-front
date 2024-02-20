<template>
  <ul class="comments__list">
    <li class="comments__list-item">
      <div class="comment">
        <a href="#" class="comment__photo">
          <figure class="comment__photo-wrapper">
            <img src="/logo2.png" alt="avatar" class="comment__photo-img">
          </figure>
        </a>
        <div class="comment__content">
          <input type="hidden" :value="childrenGuest.guestNo">
          <input type="hidden" :value="childrenGuest.pguestNo">
          <div href="#" class="comment__author">{{childrenGuest.author}}</div>
          <div class="comment__time" v-if="childrenGuest.regDate === childrenGuest.updDate">{{childrenGuest.regDate}}
            <button href="#" class="btn btn--guest" @click="fnEditCmt">
              EDIT
            </button>
            <button href="#" class="btn btn--guest" @click="fnDeleteCmt">
              DELETE
            </button>
          </div>
          <div class="comment__time" v-else>{{childrenGuest.updDate}}🔨
            <button href="#" class="btn btn--guest" @click="fnEditCmt">
              EDIT
            </button>
            <button href="#" class="btn btn--guest" @click="fnDeleteCmt">
              DELETE
            </button>
          </div>


          <div class="col" v-if="deleteCmt === true && editCmt === false">
            <div class="row">
              <div class="row" style="display: flex; justify-content: center; margin-left: auto">
                <div class="col col--sm-8 pwcol">
                  <input id="editPw" type="password" class="field__input" v-model="childrenPw" required>
                  <label for="editPw" class="field__label">Password</label>
                </div>
                <div class="pwcol col--sm-4" style="display: flex">
                  <button class="btn btn--guest" @click="fnUpdateCmt(childrenGuest.guestNo, childrenPw)">confirm</button>
                </div>
              </div>
            </div>
          </div>
          <div class="comment__text" v-if="editCmt === false"><b v-if="childrenGuest.cguestNo != null">@{{childrenGuest.older}}</b>{{childrenGuest.content}}</div>
          <div class="row" v-else-if="editCmt === true && deleteCmt === false">
            <div class="row" style="display: flex; justify-content: center; margin-left: auto">
              <div class="col col--sm-8 pwcol">
                <input id="editPw" type="password" class="field__input" v-model="childrenPw" required>
                <label for="editPw" class="field__label">Password</label>
              </div>
              <div class="pwcol col--sm-4" style="display: flex">
                <button class="btn btn--guest" @click="fnUpdateCmt(childrenGuest.guestNo, childrenPw, childrenGuest.content)">confirm</button>
              </div>
            </div>
            <textarea id="text" class="field__textarea" v-model="childrenGuest.content"></textarea>
          </div>

          <div class="comment__reply">
            <button href="#" class="btn btn--reply" @click="fnGetCmt">
              Reply
            </button>
            <div v-if="getCmt === true">
              <guest-register-form :childrenNo="childrenGuest.guestNo" :olderNo="childrenGuest.pguestNo" :childrenPw="childrenPw"/>
            </div>
          </div>
      </div>
      </div>
    </li>
  </ul>
</template>
<script>
import {inject, ref} from "vue";
import GuestRegisterForm from "@components/guest/GuestRegisterForm.vue";

export default {
  name: 'GuestChildrenView',
  components: {GuestRegisterForm},
  props: {
    childrenGuest: {
      type: Object
    }
  },
  setup() {
    let getCmt = ref(false)
    let editCmt = ref(false)
    let deleteCmt = ref(false)
    let childrenPw = ref("")
    const fnUpdateCmt = inject("fnUpdateCmt")


    const fnGetCmt = () => {
      getCmt.value = !getCmt.value
    }

    const fnEditCmt = () => {
      editCmt.value = !editCmt.value
    }

    const fnDeleteCmt = () => {
      deleteCmt.value = !deleteCmt.value
    }

    return {
      getCmt,
      editCmt,
      deleteCmt,
      childrenPw,
      fnGetCmt,
      fnEditCmt,
      fnDeleteCmt,
      fnUpdateCmt
    }
  }
}
</script>