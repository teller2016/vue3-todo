<template>
  <div>
    <!-- header -->
    <h2>TODO LIST</h2>

    <!-- 검색 Input -->
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="검색"
      @keyup.enter="searchTodo"
    />

    <hr />

    <!-- TODO 추가 Form -->
    <TodoSimpleForm @add-todo="addTodo"></TodoSimpleForm>

    <!-- ERROR -->
    <div style="color: red">{{ error }}</div>

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

    <hr />

    <!-- 페이지네이션 -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <a class="page-link" href="#" @click="getTodos(currentPage - 1)"
            >Previous</a
          >
        </li>
        <li
          v-for="page in numberOfPages"
          :key="page"
          :class="{ active: currentPage == page }"
          class="page-item"
        >
          <a class="page-link" href="#" @click="getTodos(page)">{{ page }}</a>
        </li>
        <li v-if="currentPage !== numberOfPages" class="page-item">
          <a class="page-link" href="#" @click="getTodos(currentPage + 1)"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import TodoSimpleForm from "@/components/TodoSimpleForm.vue";
import TodoList from "@/components/TodoList.vue";
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
    let timeout = null;
    watch(searchText, () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        getTodos(1);
      }, 2000);
    });

    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    };

    const url = "http://localhost:3000/todos";
    // 페이지 개수
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });

    // get todos
    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
          `${url}?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        );
        todos.value = res.data;
        numberOfTodos.value = res.headers["x-total-count"];
      } catch (error) {
        error.value = "에러발생";
      }
    };
    getTodos();

    // TODO 추가 이벤트
    const addTodo = async (todo) => {
      error.value = "";

      // DB에 todo 저장
      try {
        await axios.post(url, {
          subject: todo.subject,
          completed: todo.completed,
        });

        getTodos(1);
      } catch (error) {
        console.log(error);
        error.value = "에러 발생";
      }
    };

    // TODO 완료 상태 toggle
    const toggleCompleted = async (index, checked) => {
      error.value = "";
      const id = todos.value[index].id;

      try {
        await axios.patch(`${url}/${id}`, {
          completed: checked,
        });
        todos.value[index].completed = checked;
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
        getTodos(1);
      } catch (error) {
        error.value = "에러발생";
      }
    };

    return {
      todos,
      searchText,
      getTodos,
      addTodo,
      toggleCompleted,
      deleteTodo,
      error,
      numberOfPages,
      currentPage,
      searchTodo,
    };
  },
};
</script>

<style></style>
