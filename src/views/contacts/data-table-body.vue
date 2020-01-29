<template>
  <tr :class="getClass(item)">
    <td>{{ item.nome }}</td>
    <td>{{ item.telefoneCelular }}</td>
    <td>
      {{ item.action }}
      <v-layout class="group">
        <v-icon>mdi-pencil-outline</v-icon>
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-layout>
    </td>
  </tr>
</template>
<script>
export default {
  props: {
    item: Object
  },
  methods: {
    getClass(item) {
      if (item && item.telefoneCelular) {
        const prefixo = item.telefoneCelular.substr(1, 2) === "11";
        return { "light-blue lighten-4": prefixo };
      }
    }
  }
};
</script>