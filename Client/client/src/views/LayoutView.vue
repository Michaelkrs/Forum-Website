<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: "LayoutView",
  components: { Navbar }
}
</script>

<template>
  <Navbar />
  <RouterView />
</template>