<template>
  <v-dialog v-model="showDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ titleDialog }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <form>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="form.nome" label="Nome completo" validate-on-blur required></v-text-field>
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
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    titleDialog: null,
    form: {
      nome: null,
      telefoneCelular: null
    }
  })
};
</script>
