<template>
  <div class="container">
    <!-- header -->
    <h2>TODO LIST</h2>

    <!-- form -->
    <form @submit.prevent="onSubmit">
      <div class="d-flex">
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
      </div>

      <div v-show="hasError" style="color: red" class="mt-1">
        TODO를 입력해주세요.
      </div>
    </form>

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

export default {
  setup() {
    const todo = ref("");
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
    const hasError = ref(false);

    // TODO ADD 이벤트
    const onSubmit = () => {
      if (!todo.value) {
        hasError.value = true;
      } else {
        todos.value.push({
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        hasError.value = false;

        // 입력 완료시 빈값처리
        todo.value = "";
      }
    };

    // TODO Delete 이벤트
    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    return {
      todo,
      todos,
      onSubmit,
      deleteTodo,
      hasError,
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
