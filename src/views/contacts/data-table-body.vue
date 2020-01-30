<template>
  <tr :class="getClass(item)">
    <td>{{ item.nome }}</td>
    <td>{{ item.telefoneCelular }}</td>
    <td>
      {{ item.action }}
      <v-layout class="group">
        <v-icon @click="getItemById(item.id)">mdi-pencil-outline</v-icon>
        <v-icon @click="deleteItem(item.id)">mdi-trash-can-outline</v-icon>
      </v-layout>
    </td>
  </tr>
</template>
<script>
import { mapMutations } from "vuex";
import firebaseService from "../../services/contacts";

export default {
  props: {
    item: Object
  },
  methods: {
    ...mapMutations([
      "openDialog",
      "setForm",
      "setTitleDialog",
      "setIdDocumentUpdate"
    ]),
    deleteItem(id) {
      firebaseService
        .deleteItem(id)
        .then(() => {
          this.$toast.success("Excluído com sucesso!", {
            position: "top-right"
          });
        })
        .catch(error => {
          this.$toast.error(error, { position: "top-right" }) ||
            this.$toast.error("Erro ao excluir", { position: "top-right" });
        });
    },
    getItemById(id) {
      firebaseService
        .getItemById(id)
        .then(doc => {
          const data = doc.exists && doc.data();
          if (data) {
            this.setIdDocumentUpdate(id);
            this.setTitleDialog("Editar contato");
            this.openDialog(true);
            this.setForm(data);
          }
        })
        .catch(error => {
          this.openDialog(false);
          this.$toast.error(error, { position: "top-right" }) ||
            this.$toast.error("Erro", { position: "top-right" });
        });
    },
    getClass(item) {
      if (item && item.telefoneCelular) {
        const prefixo = item.telefoneCelular.substr(1, 2) === "11";
        return { "light-blue lighten-4": prefixo };
      }
    }
  }
};
</script>