<template>
  <div class="todo-list">
    <v-card class="mx-auto" max-width="700" style="margin-top: -64px;">
      <v-toolbar class="todo-list--toolbar" flat>
        <v-toolbar-title class="grey--text">Tasks</v-toolbar-title>
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

                  <v-text-field
                    :value="computedDateFormattedMomentjs(task.id)"
                    rounded
                    disabled
                    class="chip--text text-center"
                  ></v-text-field>

                  <v-icon class="chip--icon" @click.stop="task.dialog = true">
                    mdi-calendar-clock
                  </v-icon>

                  <v-tooltip class="mobile-date" max-width="400px" top>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="mobile-date--icon"
                        v-on="on"
                        @click.stop="task.dialog = true"
                      >
                        mdi-calendar-clock
                      </v-icon>
                    </template>
                    <v-text-field
                      :value="computedDateFormattedMomentjs(task.id)"
                      rounded
                      disabled
                      dark
                      class="mobile-date--text"
                    ></v-text-field>
                  </v-tooltip>

                  <v-dialog v-model="task.dialog" max-width="290">
                    <v-card>
                      <v-card-title class="headline">Pick a Date</v-card-title>

                      <v-card-text>
                        <v-menu
                          v-model="task.datePickerMenu"
                          :close-on-content-click="false"
                          max-width="290"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              :value="computedDateFormattedMomentjs(task.id)"
                              clearable
                              readonly
                              v-on="on"
                              @click:clear="task.date = null"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="task.date"
                            @change="task.datePickerMenu = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <!-- <v-btn
                          color="red darken-1"
                          text
                          @click="task.dialog = false"
                        >
                          Cansel
                        </v-btn> -->

                        <v-btn
                          color="green darken-1"
                          text
                          @click="
                            task.dialog = false;
                            computedDate(task.id);
                          "
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <v-icon
                    medium
                    v-if="task.done"
                    color="green"
                    class="doneBtn"
                    @click="
                      task.done = !task.done;
                      doneItem(task.id);
                    "
                  >
                    mdi-check
                  </v-icon>
                  <v-icon
                    medium
                    class="doneBtn"
                    v-else
                    @click="
                      task.done = !task.done;
                      doneItem(task.id);
                    "
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
import moment from "moment";
import axios from "axios";

export default {
  name: "TodoList",
  data: () => ({
    inputValue: "",
    tasks: [],
  }),
  beforeMount() {
    this.getTasks();
  },
  methods: {
    addingTask() {
      if (this.inputValue != "") {
        const newTask = {
          title: this.inputValue,
          done: false,
          date: new Date().toISOString().substr(0, 10),
        };

        this.postTask(newTask);
        this.inputValue = "";
      }
    },

    postTask(newTask) {
      this.postAxios(
        "http://todo.guilandev.ir/api/user/task/add",
        {
          title: newTask.title,
          date: newTask.date,
        },
        "addTask"
      );
    },

    doneItem(id) {
      this.postAxios(
        "http://todo.guilandev.ir/api/user/task/mark-done",
        {
          task_id: id,
          done: this.tasks.find((task) => task.id == id).done,
        },
        "doneTask"
      );
    },

    removeItem(id) {
      this.postAxios(
        "http://todo.guilandev.ir/api/user/task/delete",
        {
          task_id: id,
        },
        "removeTask"
      );
    },

    computedDate(id) {
      this.postAxios(
        "http://todo.guilandev.ir/api/user/task/update",
        {
          task_id: id,
          date: this.tasks.find((task) => task.id == id).date,
        },
        "setDate"
      );
    },

    computedDateFormattedMomentjs(id) {
      return this.tasks.find((task) => task.id == id).date
        ? moment(this.tasks.find((task) => task.id == id).date).format(
            "dddd, MMMM Do YYYY"
          )
        : "";
    },

    getTasks() {
      axios
        .get("http://todo.guilandev.ir/api/user/task/list", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("getTasks Success");
            this.reSetTasks(response.data.data.tasks);
          } else {
            console.log(response);
          }
        })
        .catch((e) => {
          if (e.response) {
            console.log("error res");
            if (e.response.status === 401) {
              console.log("token Expired");
              localStorage.setItem("userToken", "");
              localStorage.setItem("Name", "");
              this.$router.replace("/", "/tasks");
            } else {
              console.log(e, "getTasks failed");
            }
          } else if (e.request) {
            console.log("error req");
            console.log(e.request);
          } else {
            console.log("Error", e);
          }
        });
    },

    reSetTasks(tasksArray) {
      this.tasks = [];
      tasksArray.forEach((task) => {
        const newTask = {
          id: task.id,
          title: task.title,
          divider: this.tasks.length > 0 ? true : false,
          done: task.done,
          dialog: false,
          date: task.date,
          datePickerMenu: false,
        };
        this.tasks.push(newTask);
      });
      console.log(this.tasks);
    },

    postAxios(url, formData, nameOfPost) {
      axios
        .post(url, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(`${nameOfPost} Success`);
            this.getTasks();
          } else {
            console.log(response);
          }
        })
        .catch((e) => {
          if (e.response) {
            console.log("error res");
            if (e.response.status === 401) {
              console.log("token Expired");
              localStorage.setItem("userToken", "");
              localStorage.setItem("Name", "");
              this.$router.replace("/", "/tasks");
            } else {
              console.log(e, `${nameOfPost} Fail`);
            }
          } else if (e.request) {
            console.log("error req");
            console.log(e.request);
          } else {
            console.log("Error", e);
          }
        });
    },
  },
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
        height: 24px
        .doneBtn
          margin: 0px 15px
          &:hover
            color: rgba(76, 175, 80)
            filter: opacity(20)
        .removeBtn
          &:hover
            color: #f44336

        .chip
          &--icon
            @media (max-width:500px)
              display: none
          &--text
            padding: 0px
            margin: -8px 0px
            height: 24px
            font-size: 10px
            width: 320px
            @media (max-width:500px)
              display: none
        .mobile-date
          &--text
            width: 100%
            padding: 0px
            font-size: 10px
          &--icon
            display: none
            @media (max-width:500px)
              display: inline-flex
.decoration
  text-decoration: line-through
  opacity: 0.5
</style>
