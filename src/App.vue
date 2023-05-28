<template>
  <Navbar/>
  <div class="container">
    <router-view />
  </div>

  <Toast/>

</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Toast from '@/components/Toast.vue';

export default {
  components: {
    Navbar,
    Toast,
  },
  setup() {
  },
};
</script>

<style>
</style>
