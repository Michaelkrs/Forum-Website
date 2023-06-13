<script>

export default {
  name: 'AddCommentForm',
  data() {
    return {
      comment: ''
    }
  },
  props: ['PostId'],
  emits: ['submitComment'],
  methods: {
    submitForm(comment) {
      this.$emit('submitComment', this.PostId, comment)
      this.comment = ''
    }
  }
}
</script>

<template>
  <div class="col-6">
    <form action="" @submit.prevent="submitForm(comment)">
      <div class="my-2">
        <textarea name="" id="" cols="20" class="form-control" placeholder="Write comment here..."
          v-model="comment"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>