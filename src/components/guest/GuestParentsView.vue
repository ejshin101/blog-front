<template>
    <div class="comment">
      <div href="#" class="comment__photo">
        <figure class="comment__photo-wrapper">
          <img src="../../../public/logo2.png" alt="avatar" class="comment__photo-img">
        </figure>
      </div>
      <div class="comment__content">
        <input type="hidden" :value="parentsGuest.guestNo">
        <div href="#" class="comment__author">{{parentsGuest.author}}</div>
        <div class="comment__time" v-if="parentsGuest.regDate === parentsGuest.updDate">{{parentsGuest.regDate}}
          <button href="#" class="btn btn--guest" @click="fnEditCmt">
            EDIT
          </button>
          <button href="#" class="btn btn--guest" @click="fnDeleteCmt">
            DELETE
          </button>
        </div>
        <div class="comment__time" v-else>{{parentsGuest.updDate}}🔨
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
                <input id="editPw" type="password" class="field__input" v-model="parentsPw" required>
                <label for="editPw" class="field__label">Password</label>
              </div>
              <div class="pwcol col--sm-3" style="display: flex">
                <button class="btn btn--guest" @click="fnUpdateCmt(parentsGuest.guestNo, parentsPw)">confirm</button>
              </div>
            </div>
          </div>
        </div>
        <div class="comment__text" v-if="editCmt === false">{{parentsGuest.content}}</div>
        <div class="row" v-else-if="editCmt === true && deleteCmt === false">
          <div class="row" style="display: flex; justify-content: center; margin-left: auto">
            <div class="col col--sm-8 pwcol">
              <input id="editPw" type="password" class="field__input" v-model="parentsPw" required>
              <label for="editPw" class="field__label">Password</label>
            </div>
            <div class="pwcol col--sm-3" style="display: flex">
                <button class="btn btn--guest" @click="fnUpdateCmt(parentsGuest.guestNo, parentsPw, parentsGuest.content)">confirm</button>
            </div>
          </div>
          <textarea id="text" class="field__textarea" v-model="parentsGuest.content"></textarea>
        </div>


        <div class="comment__reply">
          <button href="#" class="btn btn--reply" @click="fnGetCmt">
            Reply
          </button>
          <template v-if="getCmt === true" >
            <guest-register-form :parentsNo="parentsGuest.guestNo" :parentsPw="parentsPw"/>
          </template>
          <template v-if="booleanVal === true">
            <button href="#" class="btn btn--guest" @click="fnGetChildren">
              View more replies
            </button>
          </template>
        </div>
      </div>
    </div>
</template>

<script>

import {inject, onBeforeMount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref} from "vue";
import GuestRegisterForm from "@components/guest/GuestRegisterForm.vue";

export default {
  name: 'GuestParentsView',
  components: {GuestRegisterForm},
  props: {
    parentsGuest: {
      type: Object
    },
    childrenGuest: {
      type: Object
    }
  },
  emits: ['children-value'],
  setup(props, context) {
    let getCmt = ref(false)
    let editCmt = ref(false)
    let deleteCmt = ref(false)
    let getChildren = ref(false)

    let parentsPw = ref("")
    const fnUpdateCmt = inject("fnUpdateCmt")

    let booleanVal = ref(false)

    onBeforeUpdate(() => {
      fnCountChildren()
    })

    const fnGetCmt = () => {
      getCmt.value = !getCmt.value
    }

    const fnEditCmt = () => {
      editCmt.value = !editCmt.value
    }

    const fnDeleteCmt = () => {
      deleteCmt.value = !deleteCmt.value
    }
    const fnGetChildren = () => {
      getChildren.value = !getChildren.value

      context.emit('children-value', {
        children: getChildren.value,
        parentGuestNo: props.parentsGuest.guestNo
      })
    }

    const fnCountChildren = () => {
      let num = 0
      for(let val of props.childrenGuest) {
        if(val.pguestNo === props.parentsGuest.guestNo) {
          num++
          booleanVal.value = true
          return
        }
      }
      booleanVal.value = false
    }

    return {
      getCmt,
      editCmt,
      deleteCmt,
      parentsPw,
      booleanVal,
      fnGetCmt,
      fnEditCmt,
      fnDeleteCmt,
      fnUpdateCmt,
      fnGetChildren,
      fnCountChildren
    }
  }
}
</script>