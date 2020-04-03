<template>
  <div id="todo-page">
    <v-card class="todo-page" flat>
      <v-toolbar color="primary" dark extended flat>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-spacer></v-spacer>
        <router-link to="/">
          <v-btn class="logout-btn" icon @click="logout">
            <span>Logout</span>
            <v-icon> mdi-logout-variant </v-icon>
          </v-btn>
        </router-link>
      </v-toolbar>
      <div class="todo-component">
        <Todolist />
      </div>
    </v-card>
  </div>
</template>

<script>
import Todolist from "../components/TodoList";
export default {
  name: "TodoPage",
  components: {
    Todolist
  },
  beforeCreate() {
    if (localStorage.getItem("userToken").toString() == "") {
      this.$router.replace("/", "/tasks");
    }
  },
  methods: {
    logout() {
      localStorage.setItem("userToken", "");
    }
  }
};
</script>

<style lang="sass" scoped>
#todo-page
  height: 100%
  .todo-page
    height: 100%
    .logout-btn
      margin: 0px 12px
      padding: 0px 48px
    .todo-component
      margin: 0vh 5vw
      @media screen and (max-width:500px)
        margin: 3vh 5vw

</style>
