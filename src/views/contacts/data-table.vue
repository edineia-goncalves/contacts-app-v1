<template>
  <v-data-table height="430" :headers="header" :items="list" class="elevation-1 ml-5 mr-5 mt-5">
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
      <div>
        <v-breadcrumbs
          :items="[
            {
              text: 'Dashboard',
              disabled: false,
              href: 'contatos'
            },
            {
              text: 'Contatos',
              disabled: true,
              href: 'contatos'
            }
          ]"
          large
        ></v-breadcrumbs>
      </div>
      <v-dialog v-model="showDialog" max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2 ml-5 mt-2" v-on="on">Novo contato</v-btn>
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
                    <v-text-field
                      v-model="form.nome"
                      label="Nome completo"
                      :rules="[
                        v =>
                          v.match('\\b\\w{1,2}\\b') ||
                          'Mínimo duas palavras de 3 letras cada'
                      ]"
                      required
                    ></v-text-field>
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
    editItem() {},
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
