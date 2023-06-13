<script>
import { mapActions, mapState } from 'pinia';
import LoginRegisterForm from '../components/LoginRegisterForm.vue';
import { useLoginStore } from '../stores/loginRegister';

export default {
  name: "LoginRegisterPage",
  components: { LoginRegisterForm },
  computed: {
    ...mapState(useLoginStore, ['isLoggedIn'])
  },
  methods: {
    ...mapActions(useLoginStore, ['login', 'googleHandleCredential']),
  }
}
</script>

<template>
  <LoginRegisterForm :isLoggedIn="isLoggedIn" @submitFunction="login" @googleHandleCredential="googleHandleCredential" />
</template>