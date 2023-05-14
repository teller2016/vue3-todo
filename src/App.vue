<template>
  <div class="container">
    <!-- header -->
    <h2>TODO LIST</h2>
    <!-- TODO 추가 Form -->
    <TodoSimpleForm @add-todo="addTodo"></TodoSimpleForm>

    <!-- empty case -->
    <div v-if="!todos.length" style="color: blue" class="mt-2">
      TODO가 없습니다
    </div>

    <!-- TODO 목록 -->
    <TodoList
      :todos="todos"
      @delete-todo="deleteTodo"
      @toggle-completed="toggleCompleted"
    ></TodoList>
  </div>
</template>

<script>
import { ref } from "vue";
import TodoSimpleForm from "./components/TodoSimpleForm.vue";
import TodoList from "./components/TodoList.vue";

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup() {
    // todo 데이터
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

    // TODO 추가 이벤트
    const addTodo = (todo) => {
      todos.value.push(todo);
    };

    // TODO 완료 상태 toggle
    const toggleCompleted = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    // TODO Delete 이벤트
    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    return {
      todos,
      addTodo,
      toggleCompleted,
      deleteTodo,
    };
  },
};
</script>

<style></style>
