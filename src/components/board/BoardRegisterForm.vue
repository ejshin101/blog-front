<template>
  <div class="container">
    <form @submit.prevent="fnAddPost">
      <modal-form :modalCheck="modalCheck" @modal-check="fnModalClose"/>
      <div class="row">
        <div class="col field">
          <input type="text" id="title" v-model="title" class="field__input field--name" required>
          <label for="title" class="field__label">Title</label>
        </div>
      </div>
      <div class="row">
        <div class="col col--sm-10 field">
          <select id="category" v-model="category" class="field__input field--name" required>
            <category :searchCategories="searchCategories"/>
          </select>
        </div>
        <div class="col col--sm-2 field">
          <button class="btn" @click="fnModalCheck" type="button">Edit Category</button>
        </div>
      </div>

      <div class="row">
        <div class="col field">
          <input type="text" :value="myinfo.userId" class="field__input field--name required" disabled>
        </div>
      </div>
      <div class="row">
        <div class="col field">
          <ckeditor :editor="editor" v-model="content" :config="editorConfig" v-if="isAuthorized"></ckeditor>
        </div>
      </div>
      <div class="row">
        <div class="col field">
          <button class="btn" type="submit" v-if="isAuthorized">Submit</button>
          <router-link class="btn" :to="{name:'BoardListView'}" style="margin-left: 5%" >Cancel</router-link>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
import {inject, onMounted, ref} from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import UploadAdapter from "@/compositions/useEditor";
import ModalForm from "@components/modal/ModalForm.vue";
import Category from '@components/common/Category.vue'

export default {
  name: 'BoardRegisterForm',
  components: {Category, ModalForm, 'ckeditor': CKEditor.component},
  emits: ['add-post'],
  setup(props, context) {
    const isAuthorized = inject("isAuthorized")
    const myinfo = inject("myinfo")

    const title = ref('')
    const category = ref('')
    const content = ref('')
    const modalCheck = ref(false)

    const searchCategory =  inject("searchCategory")
    const searchCategories = inject("searchCategories")

    function MyCustomUploadAdapterPlugin( editor ) {
      editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        // Configure the URL to the upload script in your back-end here!
        return new UploadAdapter( loader );
      };
    }

    const editor = ClassicEditor

    const editorConfig = {
      extraPlugins: [ MyCustomUploadAdapterPlugin ]
    }

    const fnAddPost = () => {
      context.emit('add-post', {
        title: title.value,
        content: content.value,
        category: category.value
      })
    }

    const fnModalCheck = () => {
      modalCheck.value = !modalCheck.value
    }

    const fnModalClose = (payload) => {
      modalCheck.value = !payload
    }

    onMounted(() => {
      searchCategory("group","ES002", "search")
    })

    return {
      isAuthorized,
      myinfo,
      title,
      category,
      content,
      modalCheck,
      searchCategories,
      fnAddPost,
      editor,
      editorConfig,
      fnModalCheck,
      fnModalClose
    }
  }

}

</script>


<style scoped>

</style>