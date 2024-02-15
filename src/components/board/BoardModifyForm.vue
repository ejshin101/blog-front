<template>
  <form @submit.prevent="fnModifyPost">
    <div class="row">
      <div class="col field">
        <input type="hidden" :value="board.boardNo">
        <input type="text" v-model="board.title" class="field__input field--name required" >
      </div>
    </div>
    <div class="row">
      <div class="col field">
        <input type="text" :value="board.regDate" class="field__input field--name required" disabled>
      </div>
    </div>
    <div class="row">
      <div class="col field">
        <input type="text" :value="board.updDate" class="field__input field--name required" disabled>
      </div>
    </div>
    <div class="row">
      <div class="col field">
        <input type="text" :value="board.author" class="field__input field--name required" disabled>
      </div>
    </div>
    <div class="row">
      <div class="col field">
        <ckeditor :editor="editor" :config="editorConfig"  v-model="board.content"></ckeditor>
      </div>
    </div>
    <div class="row">
      <div class="col field">
        <button type="submit" class="btn">Submit</button>
        <router-link class="btn" :to="{name: 'BoardReadView', params: {boardNo: board.boardNo}}" style="margin-left: 5%" >Cancel</router-link>
      </div>
    </div>
  </form>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: 'BoardModifyForm',
  components: {'ckeditor': CKEditor.component},
  props: {
    board: {
      type: Object,
      required: true
    },
    boardNo: {
      type: String
    }
  },
  emits: ['modify-post'],
  setup(props, context) {
    const editor = ClassicEditor
    const editorConfig = {
      //filebrowserImageUploadUrl:'/boards/image/upload'
    }
    const fnModifyPost = () => {
      context.emit('modify-post', {
        title: props.board.title,
        content: props.board.content
      })
    }
    return{
      fnModifyPost,
      editor,
      editorConfig
    }
  },
}


</script>

<style scoped>

</style>