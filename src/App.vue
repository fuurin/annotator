<template>
  <div id="app">
    <nav class="navbar is-fixed-top has-background-primary">
      <img class="head-logo" src="./assets/logo.png" alt="logo">
    </nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
@import "../node_modules/bulma/sass/utilities/initial-variables";
@import "../node_modules/bulma/sass/utilities/functions";

$primary: #e27c15;

@import "../node_modules/bulma/bulma.sass";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}


</style>
