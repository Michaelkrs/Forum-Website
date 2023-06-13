<script>
import router from '../router';

export default {
  name: 'CategoriesRadio',
  props: ['categories'],
  emits: ['readPosts'],
  methods: {
    filterPosts(category) {
      router.push({ name: 'home', query: { category } })
      this.$emit('readPosts', 1, category)
    }
  }
}
</script>

<template>
  <div class="col-10 card-custom mt-5 mb-5 px-3 p-2 mx-5 border rounded">
    <h4>Categories</h4>
    <div class="form-check" @click="filterPosts()">
      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
      <label class="form-check-label" for="flexRadioDefault1">
        All Posts
      </label>
    </div>
    <div class="form-check" v-for="category in categories" :key="category.id" @click="filterPosts(category.id)">
      <input class="form-check-input" type="radio" name="flexRadioDefault" :id="category.name"
        :checked="this.$route.query.category == category.id ? 'checked' : null">
      <label class="form-check-label" :for="category.name">
        {{ category.name }}
      </label>
    </div>
  </div>
</template>