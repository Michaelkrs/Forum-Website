<script>
import { mapActions, mapState } from 'pinia';
import { useCategoryStore } from '../stores/categories';
import { useDetailStore, usePostStore } from '../stores/posts';



export default {
  name: "AddEditPage",
  data() {
    return {
      postData: {
        title: '',
        content: '',
        file: null,
        CategoryId: 0,
        spotifyTrackLink: ''
      },
      isImageForm: true
    }
  },
  computed: {
    ...mapState(useCategoryStore, ['categories']),
    ...mapState(useDetailStore, ['post']),
  },
  methods: {
    ...mapActions(useCategoryStore, ['readCategories']),
    ...mapActions(usePostStore, ['addPost', 'editPost']),
    ...mapActions(useDetailStore, ['postDetail']),

    onFileChange(event) {
      this.postData.file = event.target.files[0]
    },

    async fillForm() {
      try {
        await this.postDetail(this.$route.params.id)

        this.postData.title = this.post.title
        this.postData.content = this.post.content
        this.postData.CategoryId = this.post.CategoryId
        this.postData.spotifyTrackLink = `https://open.spotify.com/track/${this.post.spotifyTrackId}`

        if (this.post.spotifyTrackId) {
          this.isImageForm = false
        }
      } catch (error) {
        console.log(error);
      }
    },

    submitForm(data) {
      if (this.$route.name === 'edit-post') {
        this.editPost(data, this.$route.params.id)
      } else {
        this.addPost(data)
      }
    },

    changeForm() {
      if (this.isImageForm) {
        this.isImageForm = false
      } else {
        this.isImageForm = true
      }

      this.postData.file = null
      this.postData.spotifyTrackLink = ''
    }
  },
  created() {
    this.readCategories()

    if (this.$route.name === 'edit-post') {
      this.fillForm()
    }
  }
}
</script>

<template>
  <div class="card-custom container mt-5 mb-5 py-3 border rounded col-5">
    <form @submit.prevent="submitForm(postData)">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" id="title" v-model="postData.title">
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">Content</label>
        <textarea name="" id="content" cols="30" rows="5" class="form-control" v-model="postData.content"></textarea>
      </div>
      <div class="mb-3" v-if="isImageForm">
        <label for="image" class="form-label">Image</label>
        <input type="file" class="form-control" id="image" @change="onFileChange">
        <button class="btn btn-success mt-2" @click="changeForm()">Spotify Form</button>
      </div>
      <div class="mb-3" v-else>
        <label for="spotify" class="form-label">Spotify Link</label>
        <input type="text" class="form-control" id="spotify" v-model="postData.spotifyTrackLink">
        <button class="btn btn-secondary mt-2" @click="changeForm()">Image Form</button>
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">Category</label>
        <select class="form-select" v-model="postData.CategoryId">
          <option selected disabled>---Category---</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>