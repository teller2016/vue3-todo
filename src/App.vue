<template>
  <div class="container">
    <!-- header -->
    <h2>TODO LIST</h2>

    <TodoSimpleFormVue @add-todo="addTodo"></TodoSimpleFormVue>

    <!-- empty case -->
    <div v-if="!todos.length" style="color: blue" class="mt-2">
      TODO가 없습니다
    </div>

    <!-- TODO 목록 -->
    <div class="card mt-2" v-for="(todo, index) in todos" :key="todo.id">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <!-- checkbox -->
          <input
            class="form-check-input"
            type="checkbox"
            v-model="todo.completed"
          />
          <label class="form-check-label" :class="{ todo: todo.completed }">{{
            todo.subject
          }}</label>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click="deleteTodo(index)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import TodoSimpleFormVue from "./components/TodoSimpleForm.vue";

export default {
  components: {
    TodoSimpleFormVue,
  },
  setup() {
    const todos = ref([
      {
        id: 1,
        subject: "todo1",
        completed: true,
      },
      {
        id: 2,
        subject: "todo2",
        completed: false,
      },
    ]);

    const addTodo = (todo) => {
      todos.value.push(todo);
    };

    // TODO Delete 이벤트
    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    return {
      todos,
      deleteTodo,
      addTodo,
    };
  },
};
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>
