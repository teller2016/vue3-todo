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
    const todos = ref([]);

    // 에러
    const error = ref("");

    // 검색
    const searchText = ref("");

    const url = "http://localhost:3000/todos";

    // get todos
    const getTodos = async () => {
      try {
        const res = await axios.get(url);
        todos.value = res.data;
      } catch (error) {
        error.value = "에러발생";
      }
    };

    getTodos();

    // 검색 필터링된 todos
    const filteredTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter((todo) => {
          return todo.subject.includes(searchText.value);
        });
      }

      return todos.value;
    });

    // TODO 추가 이벤트
    const addTodo = async (todo) => {
      error.value = "";

      // DB에 todo 저장
      try {
        const res = await axios.post(url, {
          subject: todo.subject,
          completed: todo.completed,
        });
        todos.value.push(res.data);
      } catch (error) {
        console.log(error);
        error.value = "에러 발생";
      }
    };

    // TODO 완료 상태 toggle
    const toggleCompleted = async (index) => {
      error.value = "";
      const id = todos.value[index].id;

      try {
        await axios.patch(`${url}/${id}`, {
          completed: !todos.value[index].completed,
        });
        todos.value[index].completed = !todos.value[index].completed;
      } catch (error) {
        error.value = "에러발생";
      }
    };

    // TODO Delete 이벤트
    const deleteTodo = async (index) => {
      error.value = "";
      const id = todos.value[index].id;

      try {
        await axios.delete(`${url}/${id}`);
        todos.value.splice(index, 1);
      } catch (error) {
        error.value = "에러발생";
      }
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
