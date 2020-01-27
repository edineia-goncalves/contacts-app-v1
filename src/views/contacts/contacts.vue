<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-10">
        <md-button class="md-raised md-primary" @click="showDialog = true">Adicionar contato</md-button>
        <Dialog
        :show-dialog="showDialog" @close="showDialog = false" @save="save"></Dialog:show-dialog="showDialog">
      </div>
    </div>
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Contatos</h1>
      </md-table-toolbar>
      <md-table-row v-for="item in list" :key="`${item.id}-${item.nome}`">
        <md-table-cell>{{ item.nome }}</md-table-cell>
        <md-table-cell>{{ item.telefoneCelular }}</md-table-cell>
        <md-table-cell>
          <font-awesome-icon icon="edit" class="config-cursor" />
        </md-table-cell>
        <md-table-cell>
          <font-awesome-icon @click="deleteItem(item.id)" icon="trash" class="config-cursor" />
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import db from "../../firebase";
import Dialog from "./dialog";
export default {
  name: "Contacts",
  components: {
    Dialog
  },
  data() {
    return {
      showDialog: false,
      list: []
    };
  },
  firestore() {
    return {
      list: db.collection("contacts")
    };
  },
  methods: {
    deleteItem(id) {
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
    },
    save(form) {
      db.collection("contacts")
        .add({
          nome: form.nome,
          telefoneCelular: form.telefoneCelular
        })
        .then(docRef => {
          // eslint-disable-next-line no-console
          console.log("ok", docRef);
          this.showDialog = false;
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error("Error adding document: ", error);
        });
    }
  }
};
</script>
<style scoped>
.config-cursor {
  cursor: pointer;
}
</style>
