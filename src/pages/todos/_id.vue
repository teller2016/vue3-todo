<template>
  <h2>TODO Page</h2>

  <div v-if="loading">loading...</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>subject</label>
          <input type="text" class="form-control" v-model="todo.subject" />
        </div>
      </div>

      <div class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button
              type="button"
              class="btn"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click="toggleTodoStatus"
            >
              {{ todo.completed ? "Completed" : "InCompleted" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
      Save
    </button>
    <button
      type="button"
      class="btn btn-outline-dark ml-2"
      @click="moveToTodoListPage"
    >
      Cancel
    </button>
  </form>

  <Toast
    v-if="showToast"
    :message="toastMessage"
    :type="toastAlertType"
  ></Toast>
</template>

<script>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import _ from "lodash";
import Toast from "@/components/Toast.vue";
import { useToast } from "../../composables/toast";

export default {
  components: {
    Toast,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const url = "http://localhost:3000/todos";
    const originalTodo = ref(null);
    const todo = ref(null);
    const loading = ref(true);
    const todoId = route.params.id;

    const getTodo = async () => {
      try {
        const res = await axios.get(`${url}/${todoId}`);

        originalTodo.value = { ...res.data };
        todo.value = { ...res.data };

        loading.value = false;
      } catch (error) {
        console.log(error);
        triggerToast("Server Error!", "danger");
      }
    };
    getTodo();

    const { showToast, toastMessage, triggerToast } = useToast();

    // todo update된 상태인지 판별
    const todoUpdated = computed(() => {
      return !_.isEqual(originalTodo.value, todo.value);
    });

    // todo completed 상태 변경
    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };

    const moveToTodoListPage = () => {
      router.push({
        name: "Todos",
      });
    };

    // 저장시
    const onSave = async () => {
      try {
        const res = await axios.put(`${url}/${todoId}`, {
          subject: todo.value.subject,
          completed: todo.value.completed,
        });

        originalTodo.value = { ...res.data };
        triggerToast("Successfully Saved!");

        // router.push({
        //   name: "Todos",
        // });
      } catch (error) {
        console.log(error);
        triggerToast("Server Error!", "danger");
      }
    };

    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave,
      todoUpdated,
      showToast,
      toastMessage,
    };
  },
};
</script>

<style></style>
