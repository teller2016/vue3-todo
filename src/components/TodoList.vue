<template>
  <!-- TODO 목록 -->
  <div class="card mt-2" v-for="(todo, index) in todos" :key="todo.id">
    <div
      class="card-body p-2 d-flex align-items-center"
      style="cursor: pointer"
      @click="moveToPage(todo.id)"
    >
      <div class="form-check flex-grow-1">
        <!-- checkbox -->
        <input
          class="form-check-input"
          type="checkbox"
          :checked="todo.completed"
          @change="toggleCompleted(index, $event)"
          @click.stop
        />
        <label class="form-check-label" :class="{ todo: todo.completed }">{{
          todo.subject
        }}</label>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-danger btn-sm"
          @click.stop="deleteTodo(index)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  props: {
    todos: {
      type: Array,
      requried: true,
    },
  },
  emits: ["delete-todo", "toggle-completed"],
  setup(_, context) {
    const router = useRouter();
    const deleteTodo = (index) => {
      context.emit("delete-todo", index);
    };

    const toggleCompleted = (index, event) => {
      context.emit("toggle-completed", index, event.target.checked);
    };

    const moveToPage = (todoId) => {
      // router.push(`/todos/${todoId}`);

      router.push({
        name: "Todo",
        params: {
          id: todoId,
        },
      });
    };

    return {
      deleteTodo,
      toggleCompleted,
      moveToPage,
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
