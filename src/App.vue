<template>
  <div id="app">
    <contacts></contacts>
  </div>
</template>

<script>
import Contacts from "./views/contacts/contacts";
export default {
  name: "app",
  components: {
    Contacts
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 70px;
  margin: 10px;
}
</style>
