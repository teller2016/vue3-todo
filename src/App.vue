<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{ name: 'Home' }">Todo</router-link>

    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{ name: 'Todos' }"
          >Todos <span class="sr-only">(current)</span></router-link
        >
      </li>
    </ul>
  </nav>
  <div class="container">
    <router-view />
  </div>

  <Toast/>

</template>

<script>
import Toast from '@/components/Toast.vue';

export default {
  components: {
    Toast,
  },
  setup() {
  },
};
</script>

<style>
</style>
