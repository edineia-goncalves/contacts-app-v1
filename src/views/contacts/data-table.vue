<template>
  <v-data-table
    height="430"
    :headers="tableHeader"
    :items="getData"
    class="elevation-1 ml-5 mr-5 mt-5"
  >
    <template v-slot:top>
      <breadcrumbs :items="itemsBreadcrumbs"></breadcrumbs>
      <v-btn dark class="mb-2 ml-5 mt-2 primary" @click="open">Novo contato</v-btn>
      <Dialog :show-dialog="showDialog" @close="openDialog(false)" @save="save()"></Dialog>
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
import firebaseService from "../../services/contacts";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    Breadcrumbs,
    DataTableBody,
    Dialog
  },
  computed: {
    ...mapGetters([
      "itemsBreadcrumbs",
      "tableHeader",
      "showDialog",
      "form",
      "idDocumentUpdate"
    ])
  },
  data: () => ({
    getData: []
  }),
  firestore() {
    return {
      getData: db.collection("contacts").orderBy("nome")
    };
  },
  methods: {
    ...mapMutations(["clearForm", "openDialog", "setTitleDialog"]),
    open() {
      this.clearForm();
      this.setTitleDialog("Adicionar novo contato");
      this.openDialog(true);
    },
    save() {
      if (this.idDocumentUpdate) {
        firebaseService
          .updateItem(this.idDocumentUpdate, this.form)
          .then(() => {
            this.openDialog(false);
            this.$toast.success("Editado com sucesso!", {
              position: "top-right"
            });
            this.clearForm();
          })
          .catch(error => {
            this.$toast.error(error, { position: "top-right" }) ||
              this.$toast.error("Erro ao editar", { position: "top-right" });
          });
      }
      if (!this.idDocumentUpdate) {
        firebaseService
          .addItem(this.form)
          .then(() => {
            this.openDialog(false);
            this.$toast.success("Salvo com sucesso!", {
              position: "top-right"
            });
            this.clearForm();
          })
          .catch(error => {
            this.$toast.error(error, { position: "top-right" }) ||
              this.$toast.error("Erro ao salvar", { position: "top-right" });
          });
      }
    }
  }
};
</script>
