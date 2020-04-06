<template>
  <div id="todo-page">
    <v-card class="todo-page" flat>
      <v-toolbar color="primary" dark extended flat>
        <h3 class="todo-page__Name">
          Hello <span>{{ name }}</span>
        </h3>
        <v-spacer></v-spacer>
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
    Todolist,
  },
  data: () => ({
    name: "",
  }),
  beforeCreate() {
    if (localStorage.getItem("userToken").toString() == "") {
      this.$router.replace("/", "/tasks");
    }
  },
  mounted() {
    this.name = localStorage.getItem("Name");
  },
  methods: {
    logout() {
      localStorage.setItem("userToken", "");
      localStorage.setItem("Name", "");
    },
  },
};
</script>

<style lang="sass" scoped>
#todo-page
  height: 100%
  .todo-page
    height: 100%
    &__Name
      font-size: 20px
      font-weight: 300
      margin-top: 10px
      padding: 10px
      @media screen and (max-width:500px)
        margin-top: 0px
        font-size: 15px
        width: 400px
      span
        font-size: 30px
        @media screen and (max-width:500px)
          font-size: 20px

    .logout-btn
      margin: 0px 12px
      padding: 0px 48px
      @media screen and (max-width:500px)
        padding: 0px
      span
        @media screen and (max-width:500px)
          display: none
    .todo-component
      margin: 0vh 5vw
      @media screen and (max-width:500px)
        margin: 3vh 5vw
</style>
