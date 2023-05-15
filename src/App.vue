<template>
  <div class="container">
    <!-- header -->
    <h2>TODO LIST</h2>

    <!-- 검색 Input -->
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="검색"
    />

    <hr />

    <!-- TODO 추가 Form -->
    <TodoSimpleForm @add-todo="addTodo"></TodoSimpleForm>

    <!-- ERROR -->
    <div style="color: red">{{ error }}</div>

    <!-- empty case -->
    <div v-if="!filteredTodos.length" style="color: blue" class="mt-2">
      TODO가 없습니다
    </div>

    <!-- TODO 목록 -->
    <TodoList
      :todos="filteredTodos"
      @delete-todo="deleteTodo"
      @toggle-completed="toggleCompleted"
    ></TodoList>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import TodoSimpleForm from "./components/TodoSimpleForm.vue";
import TodoList from "./components/TodoList.vue";
import axios from "axios";

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

    // 에러
    const error = ref("");

    // 검색
    const searchText = ref("");
    const filteredTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter((todo) => {
          return todo.subject.includes(searchText.value);
        });
      }

      return todos.value;
    });

    // TODO 추가 이벤트
    const addTodo = (todo) => {
      error.value = "";

      // DB에 todo 저장
      axios
        .post("http://localhost:3000/todos", {
          subject: todo.subject,
          completed: todo.completed,
        })
        .then((res) => {
          todos.value.push(res.data);
        })
        .catch((error) => {
          error.value = "에러 발생";
          console.log(error);
        });
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
      searchText,
      filteredTodos,
      addTodo,
      toggleCompleted,
      deleteTodo,
      error,
    };
  },
};
</script>

<style></style>
