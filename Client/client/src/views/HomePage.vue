<script>
import { mapActions, mapState } from 'pinia';
import { usePostStore } from '../stores/posts';
import { useCategoryStore } from '../stores/categories';
import router from '../router';
import CategoriesRadio from '../components/CategoriesRadio.vue';
import windowLocation from '../../helpers/windowLocation';
import Pagination from '../components/Pagination.vue';
import PostCard from '../components/PostCard.vue';
import { useLoginStore } from '../stores/loginRegister';

export default {
  name: "HomePage",
  data() {
    return {
      currentUserId: 0
    }
  },
  computed: {
    ...mapState(usePostStore, ["posts", 'totalPages']),
    ...mapState(useCategoryStore, ['categories']),
    ...mapState(useLoginStore, ['isLoggedIn'])
  },
  methods: {
    ...mapActions(usePostStore, ["readPosts", 'deletePost']),
    ...mapActions(useCategoryStore, ['readCategories']),
    toDetail(id) {
      router.push({ path: `/post/${id}` });
    },
    toEdit(id) {
      router.push({ path: `/post/${id}/edit` });
    },
    checkFilter(currentPage, currentCategory) {
      if (currentPage && currentCategory) {
        this.readPosts(currentPage, currentCategory)
      } else if (currentPage) {
        this.readPosts(currentPage)
      } else if (currentCategory) {
        this.readPosts(1, currentCategory)
      } else {
        this.readPosts()
      }
    },
    async submitDelete(id) {
      try {
        await this.deletePost(id)
        const { currentPage, currentCategory } = windowLocation()
        router.push({ name: 'home', query: { page: currentPage, category: currentCategory } })
        this.checkFilter(currentPage, currentCategory)
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    const { currentPage, currentCategory } = windowLocation()

    this.checkFilter(currentPage, currentCategory)

    this.readCategories()

    this.currentUserId = localStorage.getItem('UserId')
  },
  components: { CategoriesRadio, Pagination, PostCard }
}
</script>

<template>
  <div class="container d-flex flex-column align-items-center">
    <div class="row col-12">
      <div class="col-3">
        <CategoriesRadio :categories="categories" @readPosts="readPosts" />
      </div>

      <div class="col-7">
        <PostCard v-for="post in posts" :key="post.id" :post="post" :currentUserId="currentUserId" @toDetail="toDetail"
          @toEdit="toEdit" @submitDelete="submitDelete" />
      </div>

      <div class="col-2 mt-5">
        <RouterLink to="/post/add" v-if="isLoggedIn">
          <button class="btn btn-secondary">Add Post</button>
        </RouterLink>
      </div>
    </div>
  </div>
  <Pagination :totalPages="totalPages" @readPosts="readPosts" />
</template>

<style>
.embed {
  background: #F1FFFA;
}

body {
  background: #1C3738;
}

a {
  color: black;
}

.card-custom {
  background: #F2F4F3;
  box-shadow: 0px 5px 15px 6px rgba(0, 0, 0, 0.4);
}

.row-height {
  display: table;
  table-layout: fixed;
  height: 100%;
  width: 100%;
}

.col-height {
  display: table-cell;
  float: none;
  height: 100%;
}

.col-top {
  vertical-align: top;
}

.col-middle {
  vertical-align: middle;
}

.col-bottom {
  vertical-align: bottom;
}

@media (min-width: 480px) {
  .row-xs-height {
    display: table;
    table-layout: fixed;
    height: 100%;
    width: 100%;
  }

  .col-xs-height {
    display: table-cell;
    float: none;
    height: 100%;
  }

  .col-xs-top {
    vertical-align: top;
  }

  .col-xs-middle {
    vertical-align: middle;
  }

  .col-xs-bottom {
    vertical-align: bottom;
  }
}

@media (min-width: 768px) {
  .row-sm-height {
    display: table;
    table-layout: fixed;
    height: 100%;
    width: 100%;
  }

  .col-sm-height {
    display: table-cell;
    float: none;
    height: 100%;
  }

  .col-sm-top {
    vertical-align: top;
  }

  .col-sm-middle {
    vertical-align: middle;
  }

  .col-sm-bottom {
    vertical-align: bottom;
  }
}

@media (min-width: 992px) {
  .row-md-height {
    display: table;
    table-layout: fixed;
    height: 100%;
    width: 100%;
  }

  .col-md-height {
    display: table-cell;
    float: none;
    height: 100%;
  }

  .col-md-top {
    vertical-align: top;
  }

  .col-md-middle {
    vertical-align: middle;
  }

  .col-md-bottom {
    vertical-align: bottom;
  }
}

@media (min-width: 1200px) {
  .row-lg-height {
    display: table;
    table-layout: fixed;
    height: 100%;
    width: 100%;
  }

  .col-lg-height {
    display: table-cell;
    float: none;
    height: 100%;
  }

  .col-lg-top {
    vertical-align: top;
  }

  .col-lg-middle {
    vertical-align: middle;
  }

  .col-lg-bottom {
    vertical-align: bottom;
  }
}

/* --------------------- */
.image-background {
  background: #000;
  display: table;
  width: 100%;
  height: 100%;
  position: relative;
}

.image-container {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  margin: auto;
  max-height: 100%;
  max-width: 100%;
}

img {
  display: block;
  max-height: 80%;
  max-width: 80%;
  margin: auto;
}
</style>