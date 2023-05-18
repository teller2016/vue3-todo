import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/index.vue";
import Todos from "../pages/todos/index.vue";
import Todo from "../pages/todos/_id.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/todos",
      name: "Todos",
      component: Todos,
    },
    {
      path: "/todos/:id",
      name: "todo",
      component: Todo,
    },
  ],
});

export default router;
