<template>
  <v-data-table
    height="430"
    :headers="tableHeader"
    :items="getData"
    class="elevation-1 ml-5 mr-5 mt-5"
  >
    <template v-slot:top>
      <breadcrumbs :items="itemsBreadcrumbs"></breadcrumbs>
      <v-btn dark class="mb-2 ml-5 mt-2 primary" @click="openDialog">Novo contato</v-btn>
      <Dialog :show-dialog="showDialog" @close="showDialog = false" @save="save"></Dialog>
    </template>
    <template v-slot:item="props">
      <data-table-body :item="props.item"></data-table-body>
    </template>
    <template v-slot:no-data>
      <span>nenhum registro encontrado</span>
    </template>
  </v-data-table>
</template>
<script>
import Breadcrumbs from "../../components/breadcrumbs";
import DataTableBody from "./data-table-body";
import Dialog from "./dialog";
import db from "../../firebase";
import { mapGetters } from "vuex";

export default {
  components: {
    Breadcrumbs,
    DataTableBody,
    Dialog
  },
  computed: {
    ...mapGetters(["itemsBreadcrumbs", "tableHeader"])
  },
  data: () => ({
    showDialog: false,
    getData: []
  }),
  firestore() {
    return {
      getData: db.collection("contacts").orderBy("nome")
    };
  },
  methods: {
    openDialog() {
      this.showDialog = true;
      this.titleDialog = "Adicionar novo contato";
    },
    updateItem(form) {
      return db
        .collection("users")
        .doc(form.id)
        .update({ nome: form.nome, telefoneCelular: form.telefoneCelular })
        .then(() => {
          this.showDialog = false;
        });
    },
    save(form) {
      return db
        .collection("contacts")
        .add({
          nome: form.nome,
          telefoneCelular: form.telefoneCelular
        })
        .then(() => {
          this.showDialog = false;
          this.$toast.success("Salvo com sucesso!", {
            position: "top-right"
          });
          this.form = {
            nome: null,
            telefoneCelular: null
          };
        })
        .catch(error => {
          this.$toast.error(error, { position: "top-right" }) ||
            this.$toast.error("Erro ao salvar", { position: "top-right" });
        });
    },
    editItem({ id }) {
      const doc = db.collection("contacts").doc(id);
      doc
        .get()
        .then(doc => {
          this.titleDialog = "Editar contato";
          this.showDialog = true;
          const data = doc.exists && doc.data();
          if (data) {
            this.form = {
              nome: data.nome,
              telefoneCelular: data.telefoneCelular
            };
          }
        })
        .catch(error => {
          this.showDialog = false;
          this.$toast.error(error, { position: "top-right" }) ||
            this.$toast.error("Erro", { position: "top-right" });
        });
    },
    deleteItem({ id }) {
      return db
        .collection("contacts")
        .doc(id)
        .delete()
        .then(() => {
          this.$toast.success("Excluído com sucesso!", {
            position: "top-right"
          });
        })
        .catch(error => {
          this.$toast.error(error, { position: "top-right" }) ||
            this.$toast.error("Erro ao excluir", { position: "top-right" });
        });
    }
  }
};
</script>
