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
      <v-spacer></v-spacer>
      <v-dialog v-model="showDialog" max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Novo contato</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Adicionar novo contato</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <form>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="form.nome" label="Nome completo" required></v-text-field>
                    <v-text-field
                      v-model="form.telefoneCelular"
                      label="Telefone celular"
                      v-mask="'(##) #####-####'"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="showDialog = false">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="save(form)">Salvar e fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
    showDialog: false,
    form: {
      nome: null,
      telefoneCelular: null
    },
    header: [
      { text: "Nome completo", value: "nome" },
      { text: "Telefone celular", value: "telefoneCelular" },
      { text: "Ações", value: "action" }
    ],
    list: [],
    rule: [
      v => v.match("\\b\\w{1,2}\\b") || "Mínimo duas palavras de 3 letras cada"
    ]
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
    save(form) {
      return db
        .collection("contacts")
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
    },
    editItem() {},
    deleteItem({ id }) {
      return db
        .collection("contacts")
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
