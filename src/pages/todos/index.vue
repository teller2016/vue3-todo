<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <!-- header -->
      <h2>TODO LIST</h2>

      <button class="btn btn-primary" @click="moveToCreatePage">
        Create Todo
      </button>
    </div>

    <!-- 검색 Input -->
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="검색"
      @keyup.enter="searchTodo"
    />

    <hr />

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
    <Pagination v-if="todos.length" :currentPage="currentPage" :numberOfPages="numberOfPages" @click="getTodos"/>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import TodoList from "@/components/TodoList.vue";
import Pagination from "@/components/Pagination.vue";
import axios from "@/axios";
import { useToast } from "../../composables/toast";
import { useRouter } from "vue-router";

export default {
  components: {
    TodoList,
    Pagination,
  },
  setup() {
    const router = useRouter();

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

    const { triggerToast } = useToast();

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
          `todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        );
        todos.value = res.data;
        numberOfTodos.value = res.headers["x-total-count"];
      } catch (error) {
        error.value = "에러발생";
        triggerToast("Server Error!", "danger");
      }
    };
    getTodos();

    // TODO 추가 이벤트
    const addTodo = async (todo) => {
      error.value = "";

      // DB에 todo 저장
      try {
        await axios.post('todos', {
          subject: todo.subject,
          completed: todo.completed,
        });

        getTodos(1);
      } catch (error) {
        console.log(error);
        error.value = "에러 발생";
        triggerToast("Server Error!", "danger");
      }
    };

    // TODO 완료 상태 toggle
    const toggleCompleted = async (index, checked) => {
      error.value = "";
      const id = todos.value[index].id;

      try {
        await axios.patch(`todos/${id}`, {
          completed: checked,
        });
        todos.value[index].completed = checked;
      } catch (error) {
        error.value = "에러발생";
        triggerToast("Server Error!", "danger");
      }
    };

    // TODO Delete 이벤트
    const deleteTodo = async (todoId) => {
      error.value = "";
      const id = todoId;

      try {
        await axios.delete(`todos/${id}`);
        getTodos(1);
      } catch (error) {
        error.value = "에러발생";
        triggerToast("Server Error!", "danger");
      }
    };

    // create page로 이동
    const moveToCreatePage = () => {
      router.push({
        name: "TodoCreate",
      });
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
      moveToCreatePage,
    };
  },
};
</script>

<style></style>
