<template>
  <!-- TODO 목록 -->
  <div class="card mt-2" v-for="(todo, index) in todos" :key="todo.id">
    <div
      class="card-body p-2 d-flex align-items-center"
      style="cursor: pointer"
      @click="moveToPage(todo.id)"
    >
      <div class="flex-grow-1">
        <!-- checkbox -->
        <input
          class="ml-2 mr-2"
          type="checkbox"
          :checked="todo.completed"
          @change="toggleCompleted(index, $event)"
          @click.stop
        />
        <span :class="{ todo: todo.completed }">
          {{ todo.subject }}
        </span>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-danger btn-sm"
          @click.stop="openModal(todo.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
  <Modal v-if="showModal" @close="closeModal"></Modal>
</template>

<script>
import { useRouter } from "vue-router";
import Modal from '@/components/Modal.vue';
import {ref} from 'vue';
export default {
  components: {
    Modal,
  },
  props: {
    todos: {
      type: Array,
      requried: true,
    },
  },
  emits: ["delete-todo", "toggle-completed"],
  setup(_, context) {
    const router = useRouter();
    const showModal = ref(false);
    const todoDeleteId = ref(null);

    const openModal = (id) => {
      todoDeleteId.value = id;
      showModal.value = true;
    };

    const closeModal = () => {
      todoDeleteId.value = null;
      showModal.value = false;
    };

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
      showModal,
      openModal,
      closeModal
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
