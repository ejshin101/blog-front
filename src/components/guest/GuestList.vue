<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="blog__grid">
          <div class="article__comments">
            <div class="row">
              <div class="col col--md-10 col--md-offset-1 col--lg-8 col--lg-offset-2">
                <!-- comments -->
                <!-- comments grid -->

                <!-- end of comments grid -->
                <div class="comments" id="comments">
                  <div class="comments__header">
                    <div class="comments__label">

                    </div>
<!--                    <span class="comments__count">{{ guestTotal }}</span>-->
                    <span class="comments__count">Feel free to leave a message💖</span>
                  </div>
                  <guest-register-form/>
                  <div class="comments__body">
                    <ul class="comments__list">
                      <div class="col" v-if="!guests || Array.isArray(guests) && guests.length === 0">
                        <span>Guest Board is empty.</span>
                      </div>
                      <div v-else>
                        <li class="comments__list-item">
                          <template v-for="parentsGuest in guests" :key="parentsGuest.guestNo">
                            <guest-parents-view :parentsGuest="parentsGuest" :childrenGuest="childArr" @childrenValue="childrenValue"/>
                            <template v-if="getChildrenList[parentsGuest.guestNo]">
                              <template v-for="childrenGuest in childArr.filter((c) => c.pguestNo === parentsGuest.guestNo)" :key="childrenGuest.guestNo">
                                <guest-children-view :childrenGuest="childrenGuest" />
                              </template>
                            </template>
                          </template>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
                <!-- end of comments -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GuestRegisterForm from "@components/guest/GuestRegisterForm.vue";
import {inject, reactive, ref} from "vue";
import GuestParentsView from "@components/guest/GuestParentsView.vue";
import GuestChildrenView from "@components/guest/GuestChildrenView.vue";

export default {
  name: 'GuestList',
  components: {GuestChildrenView, GuestParentsView, GuestRegisterForm},
  props: {
    guests: {
      type:Array
    },
    childArr: {
      type:Array
    }
  },
  setup() {
    const password = ref("")
    const guestTotal = inject("guestTotal")
    let getCmt = ref(false)
    let editCmt = ref(false)
    let getChildrenList = reactive({})
    const countNum = inject("getCount")

    const fnGetCmt = () => {
      getCmt.value = !getCmt.value
    }

    const fnEditCmt = () => {
      editCmt.value = !editCmt.value
    }

    const childrenValue = (payload) => {
      const {children, parentGuestNo} = payload
      getChildrenList[parentGuestNo] = children
    }

    return {
      password,
      getCmt,
      editCmt,
      guestTotal,
      getChildrenList,
      countNum,
      fnGetCmt,
      fnEditCmt,
      childrenValue,
    }
  }
}
</script>