import LoginPage from "../views/LoginPage.vue";
import TodoPage from "../views/TodoPage.vue";

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage
  },
  {
    path: "/tasks",
    name: "TodoPage",
    component: TodoPage
  }
];

export default routes;
