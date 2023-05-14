<template>
  <!-- form -->
  <form @submit.prevent="onSubmit">
    <div class="d-flex">
      <!-- input -->
      <div class="flex-grow-1 mr-2">
        <input
          class="form-control"
          type="text"
          v-model="todo"
          placeholder="Type new TODO"
        />
      </div>

      <!-- submit button -->
      <div>
        <button class="btn btn-primary" type="submit">Add</button>
      </div>
    </div>

    <div v-show="hasError" style="color: red" class="mt-1">
      TODO를 입력해주세요.
    </div>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  setup(props, context) {
    const todo = ref("");
    const hasError = ref(false);

    // TODO ADD 이벤트
    const onSubmit = () => {
      if (!todo.value) {
        hasError.value = true;
      } else {
        context.emit("add-todo", {
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        hasError.value = false;

        // 입력 완료시 빈값처리
        todo.value = "";
      }
    };

    return {
      todo,
      hasError,
      onSubmit,
    };
  },
};
</script>

<style></style>
