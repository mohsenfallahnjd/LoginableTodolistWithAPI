<template>
  <div class="todo-list">
    <v-card class="mx-auto" max-width="700" style="margin-top: -64px;">
      <v-toolbar class="todo-list--toolbar" flat>
        <v-toolbar-title class=" grey--text">Tasks</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-content class="todo-list__input">
          <v-input class="todo-list__input--input">
            <v-text-field
              type="text"
              label="Add a task"
              outlined
              v-model="inputValue"
              append-outer-icon="mdi-plus-circle"
              @click:append-outer="addingTask"
            ></v-text-field>
          </v-input>
        </v-content>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-text class="todo-card">
        <v-list align="left" height="100%">
          <div v-for="task in tasks" :key="task.id">
            <v-divider v-if="task.divider"></v-divider>
            <v-list-item class="listItem" :key="task.id">
              <v-list-item-content class="listItem__content">
                <div class="listItem__content__item font-weight-bold">
                  <v-list-item-title
                    v-if="task.done"
                    class="decoration"
                    v-html="task.title"
                  ></v-list-item-title>
                  <v-list-item-title
                    v-else
                    v-html="task.title"
                  ></v-list-item-title>
                  <v-icon
                    medium
                    v-if="task.done"
                    color="green"
                    class="doneBtn"
                    @click="doneItem(task.id)"
                  >
                    mdi-check
                  </v-icon>
                  <v-icon
                    medium
                    class="doneBtn"
                    v-else
                    @click="doneItem(task.id)"
                  >
                    mdi-check
                  </v-icon>
                  <v-icon class="removeBtn" medium @click="removeItem(task.id)">
                    mdi-close
                  </v-icon>
                </div>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  data: () => ({
    inputValue: "",
    tasks: []
  }),
  methods: {
    addingTask() {
      if (this.inputValue != "") {
        const newTask = {
          id:
            this.tasks.length > 0
              ? this.tasks[this.tasks.length - 1].id + 1
              : 0,
          title: this.inputValue,
          divider: this.tasks.length > 0 ? true : false,
          done: false
          // userToken: localStorage.getItem("userToken")
        };
        this.tasks.push(newTask);
        this.inputValue = "";
      }
    },
    doneItem(id) {
      this.tasks.forEach(task => {
        if (task.id == id) {
          task.done = !task.done;
        }
      });
    },
    removeItem(id) {
      this.tasks = this.tasks.filter(task => task.id != id);
    }
  }
};
</script>

<style lang="sass" scoped>
@import url("https://fonts.googleapis.com/css?family=Quicksand&display=swap")

.todo-list
  font-family: "Quicksand", sans-serif
  &--toolbar
    @media (max-width:500px)
      height: 69px !important
      padding: 4px 0px
  &__input
    height: 100%
    margin: auto
  .todo-card
    overflow-y: auto
    height: 70vh

  .listItem
    padding: 0px
    &__content
      border-radius: 5px
      &:hover
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25)
      &__item
        display: flex
        justify-content: space-between
        padding: 5px 10px
        box-sizing: border-box
        .doneBtn
          margin: 0px 15px
          &:hover
            color: rgba(76, 175, 80)
            filter: opacity(20)
        .removeBtn
          &:hover
            color: #f44336
.decoration
  text-decoration: line-through
  opacity: 0.5
</style>
