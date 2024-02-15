<template>
  <div class="blog__pagination">
    <!-- pagination -->
    <ul class="pagination">
      <li class="pagination__item pagination__item--prev" >
        <a @click="fnPrevPage($props.currentNum + 1)" class="pagination__link">Prev</a>
      </li>
      <template v-for="idx in totalPages" :key="idx"  >
        <li class="pagination__item pagination__item" >
          <a @click="fnPageChange(idx)" class="pagination__link" >{{idx}}</a>
        </li>
      </template>
      <li class="pagination__item pagination__item--next">
        <a @click="fnNextPage($props.currentNum)" class="pagination__link">Next</a>
      </li>
    </ul>
    <!-- end of pagination -->
  </div>
</template>

<script>
import {inject, ref} from "vue";

export default {
  name: 'Pagination',
  emits: ['pagination'],
  props: {
    totalPages: {
      type: Number,
    },
    currentNum: {
      type: Number
    }
  },
  setup(props, context) {
    const currentPage = ref("");
    const fnPageChange = (val) => {
      context.emit('pagination', {
        currentPage: val
      })
    }

    const fnPrevPage = (num) => {
      let tempPage = num - 1
      if (tempPage > 0) {
        fnPageChange(tempPage)
       } else {
         alert("맨 첫 페이지 입니다.")
       }
    }

    const fnNextPage = (num) =>  {
      let tempPage = num + 2
      if (tempPage < props.totalPages + 1) {
        fnPageChange(tempPage)
      } else {
        alert("가장 마지막 페이지 입니다.")
      }
    }

    return{
      fnPageChange,
      fnPrevPage,
      fnNextPage,
      currentPage,
    }
  }
}

</script>