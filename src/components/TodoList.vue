<template>
  <!-- TODO 목록 -->
  <div class="card mt-2" v-for="(todo, index) in todos" :key="todo.id">
    <div class="card-body p-2 d-flex align-items-center">
      <div class="form-check flex-grow-1">
        <!-- checkbox -->
        <input
          class="form-check-input"
          type="checkbox"
          :checked="todo.completed"
          @change="toggleCompleted(index)"
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
</template>

<script>
export default {
  props: {
    todos: {
      type: Array,
      requried: true,
    },
  },
  emits: ["delete-todo", "toggle-completed"],
  setup(_, context) {
    const deleteTodo = (index) => {
      context.emit("delete-todo", index);
    };

    const toggleCompleted = (index) => {
      context.emit("toggle-completed", index);
    };

    return {
      deleteTodo,
      toggleCompleted,
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
