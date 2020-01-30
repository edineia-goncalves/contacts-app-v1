<template>
  <v-dialog v-model="showDialog" max-width="600px" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">{{ titleDialog }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <form>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="form.nome" label="Nome completo" :error="this.showError"></v-text-field>
                <span
                  class="red--text"
                  v-if="showError"
                >Mínimo de duas palavras contendo 3 letras cada</span>
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
        <v-btn color="blue darken-1" text @click="$emit('close')">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="$emit('save')">Salvar e fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    showError: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(["titleDialog", "form"])
  }
};
</script>
