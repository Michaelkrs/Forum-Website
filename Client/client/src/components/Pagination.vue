<script>
import windowLocation from '../../helpers/windowLocation'
import router from '../router/index'

export default {
  name: 'PaginationComponent',
  props: ['totalPages'],
  emits: ['readPosts'],
  methods: {
    changePage(page) {
      const { currentCategory } = windowLocation()

      if (currentCategory) {
        router.push({ name: 'home', query: { page, category: currentCategory } })
        this.$emit('readPosts', page, currentCategory)
      } else {
        router.push({ name: 'home', query: { page } })
        this.$emit('readPosts', page)
      }
    }
  }
} 
</script>

<template>
  <div class="d-flex justify-content-center my-5">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <!-- <li class="page-item"><a class="page-link" href="#">Previous</a></li> -->
        <li class="page-item" v-for="page in totalPages" :key="page" @click.prevent="changePage(page)"><a
            class="page-link">{{
              page }}</a></li>
        <!-- <li class="page-item"><a class="page-link" href="#">Next</a></li> -->
      </ul>
    </nav>
  </div>
</template>

<style>
.page-link {
  position: relative;
  display: block;
  color: #673AB7 !important;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #673AB7 !important;
}

.page-link:hover {
  z-index: 2;
  color: #fff !important;
  background-color: #673ab7;
  border-color: #024dbc;
}

.page-link:focus {
  z-index: 3;
  outline: 0;
  box-shadow: none;
}
</style>