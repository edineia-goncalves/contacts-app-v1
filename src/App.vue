<template>
  <v-app>
    <v-content>
      <contacts />
    </v-content>
  </v-app>
</template>

<script>
import contacts from "./views/contacts/contacts";

export default {
  name: "App",

  components: {
    contacts
  }
};
</script>
