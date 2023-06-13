<script>
export default {
  name: 'LoginRegisterForm',
  data() {
    return {
      userData: {
        email: '',
        password: '',
        username: '',
        phoneNumber: ''
      },
      isRegister: false
    }
  },
  computed: {
    text() {
      return {
        header: this.isRegister ? 'Create Account' : 'Login',
        subtitle: this.isRegister ? 'Get started with your free account' : 'Login with your existing account',
        footer: this.isRegister ? 'Already have an account?' : 'Don\'t have an account?',
        footerLink: this.isRegister ? 'Login here' : 'Register here',
        footerRoute: this.isRegister ? '/login' : '/register',
      }
    }
  },
  emits: ['submitFunction', 'googleHandleCredential'],
  methods: {
    submitForm(data) {
      this.$emit('submitFunction', data)
    },

    callback(response) {
      this.$emit('googleHandleCredential', response.credential)
    }
  },
  created() {
    if (this.$route.name === 'register') {
      this.isRegister = true
    }
  }
}
</script>

<template>
  <section class="pt-5 pb-5 mt-0 align-items-center d-flex bg-dark"
    style="min-height: 100vh; background-size: cover; background-image: url(https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1920&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=c0d43804e2c7c93143fe8ff65398c8e9);">
    <div class="container-fluid">
      <div class="row  justify-content-center align-items-center d-flex-row text-center h-100">
        <div class="col-12 col-md-4 col-lg-3   h-50 ">
          <div class="card shadow">
            <div class="card-body mx-auto">
              <h4 class="card-title mt-3 text-center">{{ text.header }}</h4>
              <p class="text-center">{{ text.subtitle }}</p>
              <p>
                <GoogleLogin :callback="callback" />
              </p>
              <p class="text-muted font-weight-bold ">
                <span>OR</span>
              </p>
              <form @submit.prevent="submitForm(userData)">
                <div class="form-group input-group my-2" v-if="this.isRegister">
                  <div class="input-group-text">
                    <span> <i class="bi bi-person-fill"></i> </span>
                  </div>
                  <input name="" class="form-control" placeholder="Username" type="text" v-model="userData.username">
                </div>
                <div class="form-group input-group my-2">
                  <div class="input-group-text">
                    <span> <i class="bi bi-envelope-fill"></i> </span>
                  </div>
                  <input name="" class="form-control" placeholder="Email address" type="email" v-model="userData.email">
                </div>
                <div class="form-group input-group my-2" v-if="this.isRegister">
                  <div class="input-group-text">
                    <span> <i class="bi bi-telephone-fill"></i> </span>
                  </div>
                  <input name="" class="form-control" placeholder="Phone number (optional)" type="string"
                    v-model="userData.phoneNumber">
                </div>
                <div class="form-group input-group my-2">
                  <div class="input-group-text">
                    <span> <i class="bi bi-lock-fill"></i> </span>
                  </div>
                  <input class="form-control" placeholder="Password" type="password" v-model="userData.password">
                </div>
                <div class="my-3">
                  <button type="submit" class="col-7 mx-auto btn btn-primary rounded-3"> {{ text.header }} </button>
                </div>
                <p class="text-center">{{ text.footer }}
                  <RouterLink :to="text.footerRoute"> <a href="">{{ text.footerLink }}</a> </RouterLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
a {
  color: navy;
}
</style>