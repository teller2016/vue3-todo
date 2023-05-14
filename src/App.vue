<template>
  <div class="container">
    <!-- header -->
    <h2>TODO LIST</h2>

    <!-- form -->
    <form class="d-flex" @submit.prevent="onSubmit">
      <!-- input -->
      <div class="flex-grow-1 mr-2">
        <input
          class="form-control"
          type="text"
          v-model="todo"
          placeholder="Type new TODO"
        />
      </div>

      <!-- submit button -->
      <div>
        <button class="btn btn-primary" type="submit">Add</button>
      </div>
    </form>

    <div class="card mt-2" v-for="todo in todos" :key="todo.id">
      <div class="card-body p-2">
        {{ todo.subject }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const todo = ref("");
    const todos = ref([
      {
        id: 1,
        subject: "todo1",
      },
      {
        id: 2,
        subject: "todo2",
      },
    ]);

    const onSubmit = () => {
      todos.value.push({
        id: Date.now(),
        subject: todo.value,
      });
    };

    return {
      todo,
      todos,
      onSubmit,
    };
  },
};
</script>

<style></style>
