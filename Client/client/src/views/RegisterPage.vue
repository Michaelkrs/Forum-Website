<script>
import { mapActions } from 'pinia';
import LoginRegisterForm from '../components/LoginRegisterForm.vue';
import { useLoginStore } from '../stores/loginRegister';

export default {
  name: "LoginRegisterPage",
  components: { LoginRegisterForm },
  methods: {
    ...mapActions(useLoginStore, ['register']),
  }
}
</script>

<template>
  <LoginRegisterForm @submitFunction="register" />
</template>