<template>
  <v-data-table :headers="header" :items="list" class="elevation-1">
    <template v-slot:item="props">
      <tr :class="getClass(props.item)">
        <td>{{ props.item.nome }}</td>
        <td>{{ props.item.telefoneCelular }}</td>
        <td>
          {{ props.item.action }}
          <v-layout class="group">
            <v-icon @click="editItem(props.item)">mdi-pencil-outline</v-icon>
            <v-icon @click="deleteItem(props.item)">mdi-trash-can-outline</v-icon>
          </v-layout>
        </td>
      </tr>
    </template>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Contatos</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <span>nenhum registro encontrado</span>
    </template>
  </v-data-table>
</template>

<script>
import db from "../../firebase";

export default {
  data: () => ({
    header: [
      { text: "Nome completo", value: "nome" },
      { text: "Telefone celular", value: "telefoneCelular" },
      { text: "Ações", value: "action" }
    ],
    list: []
  }),
  firestore() {
    return {
      list: db.collection("contacts").orderBy("nome")
    };
  },
  methods: {
    getClass(item) {
      if (item && item.telefoneCelular) {
        const prefixo = item.telefoneCelular.substr(1, 2) === "11";
        return { "light-blue lighten-4": prefixo };
      }
    },
    editItem() {},
    deleteItem({ id }) {
      db.collection("contacts")
        .doc(id)
        .delete()
        .then(() => {
          // eslint-disable-next-line no-console
          console.log("item removido", id);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error("Error removing document: ", error);
        });
    }
  }
};
</script>
