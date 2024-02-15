<template>
  <div class="modal" v-if="$props.modalCheck === true">
    <div class="modal_body">
      <div class="row">
        <div class="col col--lg-2">
          <button type="button" class="btn btn btn--guest" >search</button>
        </div>
        <div class="col col--lg-2">
          <button type="button" class="btn btn btn--guest" @click="addCategory">add</button>
        </div>
        <div class="col col--lg-2">
          <button type="button" class="btn btn btn--guest" @click="deleteCategory">delete</button>
        </div>
        <div class="col col--lg-2">
          <button type="button" class="btn btn btn--guest" @click="fnModalClose">X</button>
        </div>
      </div>
      <div class="row">
        <div class="col col--sm-2 field">
          <input type="text" id="mdGroupId" class="field__input field--name" v-model="groupId" required>
          <label for="mdGroupId" class="field__label">Id</label>
        </div>
        <div class="col col--sm-2 field">
          <input type="text" id="mdCategoryCd" class="field__input field--name" v-model="categoryCd" required>
          <label for="mdCategoryCd" class="field__label">Code</label>
        </div>
        <div class="col col--sm-6 field">
          <input type="text" id="mdCategoryNm" class="field__input field--name" v-model="categoryNm" required>
          <label for="mdCategoryNm" class="field__label">Name</label>
        </div>
        <div class="col col--sm-2 field">
          <input type="number" id="mdCategoryOrder" class="field__input field--name" v-model="categoryOrder" min="1" required>
          <label for="mdCategoryOrder" class="field__label">Order</label>
        </div>
      </div>
      <modal-list :categories="categories"/>
    </div>
  </div>
</template>
<script>
import {inject, onMounted, ref} from "vue";
import ModalList from "@components/modal/ModalList.vue";
import client from "@/modules/client";
import {router} from "@router/router";

export default {
  name: 'ModalForm',
  components: {ModalList},
  emits: ['modal-check'],
  props: {
    modalCheck: {
      type: Boolean
    }
  },
  setup(props, context){
    const categories = inject("categories")
    const fetchCategoryList = inject("fetchCategoryList")
    const searchCategory = inject("fetchCategoryList")
    let groupId = ref("")
    let categoryCd = ref("")
    let categoryNm =  ref("")
    let categoryOrder =  ref("")


    onMounted(() => {
      fetchCategoryList()
    })

    const fnSearch = () => {
      // groupId = document.getElementById("mdGroupId").value
      // categoryCd = document.getElementById("mdCategoryCd").value
      // categoryNm = document.getElementById("mdCategoryNm").value
      // categoryOrder = document.getElementById("mdCategoryOrder").value
      // searchCategory(groupId, categoryCd, categoryNm, categoryOrder)
    }

    const addCategory = () => {
      groupId = groupId.value
      categoryCd = categoryCd.value
      categoryNm = categoryNm.value
      categoryOrder = categoryOrder.value

      if (groupId === null || groupId === "") {
        alert("Id를 입력하세요")
      } else if (categoryCd === null || categoryCd === "") {
        alert("Code를 입력하세요")
      } else if (categoryNm === null || categoryNm === "") {
        alert("Name을 입력하세요")
      } else if (categoryOrder === null || categoryOrder === "") {
        alert("Order를 입력하세요")
      } else {
        return client.post(`/api/categories`, {groupId, categoryCd, categoryNm, categoryOrder})
            .then(res => {
              alert('등록 되었습니다.')
              document.getElementById("mdGroupId").value = ""
              document.getElementById("mdCategoryCd").value = ""
              document.getElementById("mdCategoryNm").value = ""
              document.getElementById("mdCategoryOrder").value = ""
              router.go(0)
            }).catch(err => {
              alert(err)
            })
      }
    }

    const deleteCategory = () => {
      const categoryNo = document.getElementsByName('categoryCd')
      const cateArr = []
      for (let index = 0; index < categoryNo.length; index++) {
        if(categoryNo[index].checked){
          cateArr.push(categoryNo[index].value)
        }
      }

      cateArr.forEach((ele, idx) => {
        client.delete(`/api/categories/${ele}`)
            .then(res => {``
              alert('삭제 되었습니다.')
              router.go(0)
            }).catch(err => {
          if (err.response.status === 403) {
            alert('접근 권한이 없습니다.')
          } else {
            alert(err.response.data.message)
          }
        })
      })
    }

    const fnModalClose = () => {
      context.emit('modal-check', props.modalCheck)
    }



    return {
      categories,
      fetchCategoryList,
      searchCategory,
      groupId,
      categoryCd,
      categoryNm,
      categoryOrder,
      fnSearch,
      addCategory,
      fnModalClose,
      deleteCategory
    }
  }
}
</script>
<style>
.modal {
  position:absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  width:65%;
  height:70%;
}

.modal_body {
  position:absolute;
  top:50%;

  width: 70%;
  height: 100%;

  padding:40px;

  text-align: center;

  background-color: rgb(255,255,255);
  border-radius:8px;
  box-shadow:0 2px 3px 0 rgba(34,36,38,0.15);

  transform:translateY(-50%);
}
div .row{
  align: right
}

</style>