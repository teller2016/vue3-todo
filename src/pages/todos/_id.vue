<template>
  <h2>TODO Page</h2>

  <TodoForm :editing="true"></TodoForm>
</template>

<script>
import TodoForm from "@/components/TodoForm.vue";
export default {
  components: {
    TodoForm,
  },
};
</script>

<style></style>
