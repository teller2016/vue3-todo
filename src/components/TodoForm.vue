<template>
  <div v-if="loading">loading...</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>subject</label>
          <input type="text" class="form-control" v-model="todo.subject" />
          <div v-if="subjectError" class="text-red">
            {{ subjectError }}
          </div>
        </div>
      </div>

      <div v-if="editing" class="col-6">
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

      <div class="col-12">
        <div class="form-group">
          <label>Body</label>
          <textarea
            v-model="todo.body"
            class="form-control"
            name=""
            id=""
            cols="30"
            rows="10"
          >
          </textarea>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
      {{ editing ? "Update" : "Create" }}
    </button>
    <button
      type="button"
      class="btn btn-outline-dark ml-2"
      @click="moveToTodoListPage"
    >
      Cancel
    </button>
  </form>

  <transition name="fade">
    <Toast
      v-if="showToast"
      :message="toastMessage"
      :type="toastAlertType"
    ></Toast>
  </transition>
</template>

<script>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import _ from "lodash";
import Toast from "@/components/Toast.vue";
import { useToast } from "@/composables/toast";

export default {
  components: {
    Toast,
  },
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const url = "http://localhost:3000/todos";
    const originalTodo = ref(null);
    const todo = ref({
      subject: "",
      completed: false,
      body: "",
    });
    const loading = ref(false);
    const todoId = route.params.id;

    const subjectError = ref("");

    const getTodo = async () => {
      loading.value = true;
      try {
        const res = await axios.get(`${url}/${todoId}`);

        originalTodo.value = { ...res.data };
        todo.value = { ...res.data };

        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error);
        triggerToast("Server Error!", "danger");
      }
    };

    if (props.editing) {
      getTodo();
    }

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
      // validation
      if (!todo.value.subject) {
        subjectError.value = "Subject is required";
        return;
      }
      subjectError.value = "";

      try {
        let res;
        const data = {
          subject: todo.value.subject,
          completed: todo.value.completed,
          body: todo.value.body,
        };

        if (props.editing) {
          res = await axios.put(`${url}/${todoId}`, data);
          originalTodo.value = { ...res.data };
        } else {
          res = await axios.post(`${url}`, data);

          //   new todo 받도록 비움
          todo.value.subject = "";
          todo.value.body = "";
        }

        const message =
          `Successfully ` + (props.editing ? "Updated!" : "Created!");
        triggerToast(message);

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
      subjectError,
    };
  },
};
</script>

<style scoped>
.text-red {
  color: red;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
