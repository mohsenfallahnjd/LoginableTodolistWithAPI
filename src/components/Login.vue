<template>
  <div id="login">
    <div class="login__form">
      <div class="login__form--signup" v-if="registerForm == false">
        <h1 class="login__form--signup--title">Sign up</h1>
        <v-form class="login__form--signup--form" lazy-validation>
          <v-text-field v-model="name" label="Name" required></v-text-field>
          <v-text-field
            v-model="email"
            label="Email Address"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            @click:append="show = !show"
          ></v-text-field>
        </v-form>
        <v-btn
          fab
          class="login__form--signup--btn"
          elevation="5"
          rounded
          @click="regUser"
        >
          Create Account
        </v-btn>
        <p class="devider">
          <span>Allready have an account?!</span>
        </p>
        <v-btn
          fab
          class="login__form--signup--btnregister"
          elevation="0"
          rounded
          @click="registerForm = !registerForm"
        >
          Sign In
        </v-btn>
      </div>
      <div class="login__form--login" v-else>
        <h1 class="login__form--login--title">Login</h1>
        <v-form class="login__form--login--form" lazy-validation>
          <v-text-field
            v-model="email"
            label="Email Address"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            @click:append="show = !show"
          ></v-text-field>
        </v-form>
        <v-btn
          fab
          class="login__form--login--btn"
          elevation="5"
          @click="loginUser"
          rounded
        >
          Sign In
        </v-btn>
        <p class="devider">
          <span>Don't have an account?!</span>
        </p>
        <v-btn
          fab
          class="login__form--login--btnregister"
          elevation="0"
          rounded
          @click="registerForm = !registerForm"
        >
          Register Now
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data: () => ({
    name: "",
    email: "",
    password: "",
    show: false,
    registerForm: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
  }),
  methods: {
    regUser() {
      const formData = new FormData();

      // Add user's data to formData
      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append("password", this.password);

      axios
        .post("http://todo.guilandev.ir/api/user/auth/register", formData)
        .then((response) => {
          if (response.status === 200) {
            console.log("regUser Success");
            localStorage.setItem("userToken", response.data.data.token);
            localStorage.setItem("Name", response.data.data.name);
            this.$router.push({ name: "TodoPage" });
          } else {
            console.log(response.status);
          }
        })
        .catch((e) => {
          console.log(e, "regUser Fail");
        });
    },
    loginUser() {
      // this.$v.$touch();
      const formData = new FormData();

      // Add user's data to formData
      formData.append("email", this.email);
      formData.append("password", this.password);

      axios
        .post("http://todo.guilandev.ir/api/user/auth/login", formData)
        .then((response) => {
          if (response.status === 200) {
            console.log(response);

            console.log("loginUser Success");
            localStorage.setItem("userToken", response.data.data.token);
            localStorage.setItem("Name", response.data.data.name);
            this.$router.push({ name: "TodoPage" });
          } else {
            console.log(response.status);
          }
        })
        .catch((e) => {
          console.log(e, "loginUser Fail");
        });
    },
  },
};
</script>
// mohsenfallahnejad@gmail.com // mohsenhastam
<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css?family=Muli:200,400&display=swap')
$white: #ffffff
$lightWhite: #fafafa
$black: #000000
$brown: #331900
$blue: #05070D
$lightBlue: #199E9E
$todoColor: #CE0F1D
$gray: #A69B9C
$colorHigthligth: #FFEB00
$shadow: #6193EC
$btnColor: #3A67DF
$borderBtnColor: #3A67DF
$dividerLine: #BAC8E3
#login
  width: 100%
  height: 100%
  .login__form
    width: 30em
    height: 40em
    position: absolute
    overflow: hidden
    border-radius: 30px
    @media screen and (max-width: 500px)
      width: 100%
      height: 100%
    &--login
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      background-color: $lightWhite
      width: 100%
      height: 100%
      &--title
        font-size: 35px
        font-weight: 500
        padding-right: 35%
        padding-bottom: 20px
        @media screen and (max-width: 500px)
          padding: 0px
          font-size: 30px
          font-weight: 500
      &--form
        width: 70%
        margin: 20px 0px
        @media screen and (max-width: 500px)
          margin: 10px 0px
      &--btn
        width: 13em
        height: 50px
        font-size: 20px
        font-weight: 500
        color: $white
        background-color: $btnColor
        text-transform: none
        letter-spacing: 0
        @media screen and (max-width: 500px)
          width: 10em
          height: 45px
      .devider
        margin-top: 40px
        @media screen and (max-width: 500px)
          font-size: 13px
        span
          display: inline-block
          position: relative
          &:before ,
          &:after
            content: ""
            position: absolute
            height: 5px
            border-bottom: 1px solid $dividerLine
            top: 8px
            width: 80px
            @media screen and (max-width: 500px)
              width: 50px
          &:before
            right: 100%
            margin-right: 15px
          &:after
            left: 100%
            margin-left: 15px
      &--btnregister
        width: 10em
        height: 50px
        font-size: 16px
        font-weight: 700
        color: $borderBtnColor
        border: 1.2px solid $borderBtnColor
        text-transform: none
        letter-spacing: 0
        @media screen and (max-width: 500px)
          width: 10em
          height: 40px
          font-size: 12px
          font-weight: 400

    &--signup
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      background-color: $lightWhite
      width: 100%
      height: 100%
      &--title
        font-size: 35px
        font-weight: 500
        padding-right: 35%
        padding-bottom: 20px
        @media screen and (max-width: 500px)
          padding: 0px
          font-size: 30px
          font-weight: 500
      &--form
        width: 70%
        margin: 20px 0px
        @media screen and (max-width: 500px)
          margin: 10px 0px
      &--btn
        width: 13em
        height: 50px
        font-size: 20px
        font-weight: 500
        color: $white
        background-color: $btnColor
        text-transform: none
        letter-spacing: 0
        @media screen and (max-width: 500px)
          width: 11em
          height: 45px
          font-size: 16px
          font-weight: 400
      .devider
        margin-top: 40px
        @media screen and (max-width: 500px)
          font-size: 13px
          margin-top: 30px
        span
          display: inline-block
          position: relative
          &:before ,
          &:after
            content: ""
            position: absolute
            height: 5px
            border-bottom: 1px solid $dividerLine
            top: 8px
            width: 80px
            @media screen and (max-width: 500px)
              width: 40px
          &:before
            right: 100%
            margin-right: 15px
          &:after
            left: 100%
            margin-left: 15px
      &--btnregister
        width: 10em
        height: 50px
        font-size: 16px
        font-weight: 700
        color: $borderBtnColor
        border: 1.2px solid $borderBtnColor
        text-transform: none
        letter-spacing: 0
        @media screen and (max-width: 500px)
          width: 7em
          height: 40px
          font-size: 15px
          font-weight: 400
</style>
