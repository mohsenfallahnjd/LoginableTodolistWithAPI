<template>
  <div id="login-page">
    <div class="login-page__img">
      <v-img src="../assets/TodoList.jpg" class="login-page__img--image">
      </v-img>
      <div class="login-page__img--color"></div>
      <h3 class="login-page__img--title">
        <span>
          <v-icon>mdi-arrow-right-drop-circle</v-icon>
          ToDo lists
        </span>
        <p>
          have reportedly been around since the early twentieth century, when
          they were introduced as a way to improve productivity.
        </p>
      </h3>
    </div>
    <div class="login-component">
      <Login />
    </div>
  </div>
</template>

<script>
import Login from "../components/Login";
export default {
  name: "LoginPage",
  components: {
    Login
  },
  beforeCreate() {
    if (localStorage.length > 1 && localStorage.getItem("userToken") !== "")
      this.$router.push({ name: "TodoPage" });
  }
};
</script>

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
$shadow: #6193EC
$colorHigthligth: #042FF5

#login-page
  width: 100%
  height: 100%
  position: relative
  display: flex
  flex-direction: row
  align-items: center
  font-family: 'Muli', sans-serif
  @media screen and (max-width: 500px)
    display: flex
    flex-direction: row
    align-items: center
    width: 100vw
    height: 100vh
  .login-page__img
    display: flex
    margin-left: auto
    align-items: center
    width: 60%
    height: 100%
    @media screen and (max-width: 500px)
      display: none
    &--image
      width: 100%
      height: 100%
      object-fit: cover
      filter: blur(3px) grayscale(30%)
    &--color
      position: absolute
      width: 80%
      height: 50%
      object-fit: cover
      background-color: $colorHigthligth
      box-shadow: 8px 20px 20px -10px $black
      opacity: 0.3
    &--title
      position: absolute
      color: $white
      font-size: 35px
      font-weight: 100
      padding: 5em 5em
      width: 60%
      >span
        color: $white
        font-weight: 900
        font-size: 50px
        text-rendering: optimizeLegibility
      >p
        padding-left: 30px
        text-indent: 20px
        font-weight: 300
  .login-component
    width: 30em
    height: 40em
    position: absolute
    margin-left: 15%
    overflow: hidden
    border-radius: 30px
    font-family: 'Muli', sans-serif
    box-shadow: 8px 11px 10px -10px $shadow
    @media screen and (max-width: 500px)
      width: 80%
      height: 500px
      margin: 0vh 10vw
      overflow: hidden
      border-radius: 30px
      border: 0.8px solid $colorHigthligth
      font-family: 'Muli', sans-serif
      box-shadow: 8px 11px 10px -10px $shadow

</style>
