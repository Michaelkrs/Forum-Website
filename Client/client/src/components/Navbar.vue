<script>
import { mapState, mapActions } from 'pinia';
import { useLoginStore } from '../stores/loginRegister';
import router from '../router';
import { usePostStore } from '../stores/posts';

export default {
  name: 'NavbarComponent',
  data() {
    return {
      email: ''
    }
  },
  computed: {
    ...mapState(useLoginStore, ['isLoggedIn'])
  },
  methods: {
    ...mapActions(useLoginStore, ['logout', 'loginStatus']),
    ...mapActions(usePostStore, ['readPosts']),
    backToHome() {
      router.push({ name: 'home' })
      this.readPosts(1)
    }
  },
  created() {
    this.loginStatus()
    this.email = localStorage.getItem('email')
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg sticky-top" data-bs-theme="dark" style="max-height: 1000px;">
    <div class="container-fluid">

      <a class="navbar-brand" href="#" @click.prevent="backToHome()">HOME</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav d-flex justify-content-between">
          <div class="d-flex">
            <div>
              <li class="nav-item" hidden>
                Nothing here
              </li>
            </div>
          </div>
          <div class="d-flex" v-if="!isLoggedIn">
            <div class="mx-1">
              <li class="nav-item">
                <RouterLink to="/login">
                  <a class="nav-link active btn btn-primary text-light" aria-current="page" href="#">Login</a>
                </RouterLink>
              </li>
            </div>
            <div class="mx-1">
              <li class="nav-item">
                <RouterLink to="/register">
                  <a class="nav-link active btn btn-secondary" aria-current="page" href="#">Register</a>
                </RouterLink>
              </li>
            </div>
          </div>
          <div class="d-flex align-items-center" v-else>
            <div class="mx-3 d-flex align-items-center">
              <div>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt=""
                  width="32" height="32" class="rounded-circle me-2" />
              </div>
              <div class="text-light">
                {{ email }}
              </div>
            </div>
            <div>
              <li class="nav-item">
                <a class="nav-link active btn btn-danger text-light" aria-current="page" href="#"
                  @click.prevent="logout">Logout</a>
              </li>
            </div>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
.navbar-nav {
  flex: 1
}

.navbar {
  background-color: #4D4847;
}

a {
  text-decoration: none;
}
</style>