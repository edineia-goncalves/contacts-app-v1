<template>
  <v-app>
    <v-content>
      <contacts />
    </v-content>
  </v-app>
</template>

<script>
import contacts from "./views/contacts/data-table";

export default {
  name: "App",

  components: {
    contacts
  }
};
</script>
