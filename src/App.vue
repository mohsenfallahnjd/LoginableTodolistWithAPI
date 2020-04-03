<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  })
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap')
$lightWhite: #fafafa
$white: #ffffff
$black: #000000

*
  box-sizing: border-box

body
  margin: 0
  padding: 0
  

#app
  width: 100vw
  min-width: 100%
  height: 100vh
  min-height: 100%
  font-family: 'Roboto', sans-serif
  background-color: $lightWhite
  box-sizing: border-box
</style>
