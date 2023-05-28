<template>
  <div v-if="loading">loading...</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <!-- <div class="form-group">
          <label>subject</label>
          <input type="text" class="form-control" v-model="todo.subject" />
          <div v-if="subjectError" class="text-red">
            {{ subjectError }}
          </div>
        </div> -->
        <Input v-model:subject="todo.subject" title="Subject" :error="subjectError"/>
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
</template>

<script>
import axios from "@/axios";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import _ from "lodash";
import { useToast } from "@/composables/toast";
import Input from "@/components/Input.vue";

export default {
  components: {
    Input
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
        const res = await axios.get(`todos/${todoId}`);

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
          res = await axios.put(`todos/${todoId}`, data);
          originalTodo.value = { ...res.data };
        } else {
          res = await axios.post('todos', data);

          //   new todo 받도록 비움
          todo.value.subject = "";
          todo.value.body = "";
        }

        const message =
          `Successfully ` + (props.editing ? "Updated!" : "Created!");
        triggerToast(message);

        if (!props.editing) {
          router.push({
            name: "Todos",
          });
        }

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
</style>
