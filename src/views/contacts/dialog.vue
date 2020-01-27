<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Adicionar novo contato</md-dialog-title>
      <md-dialog-content>
        <md-field :class="messageError">
          <label>Nome completo</label>
          <md-input v-model="form.nome" required></md-input>
          <span class="md-error">Mínimo duas palavras de 3 letras cada</span>
        </md-field>
        <md-field>
          <label>Telefone celular</label>
          <md-input v-model="form.telefoneCelular" type="tel" v-mask="'(##) #####-####'"></md-input>
        </md-field>
        <md-dialog-actions>
          <md-button class="md-primary" @click="close">cancelar</md-button>
          <md-button class="md-primary" @click="submit">salvar e fechar</md-button>
        </md-dialog-actions>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    showDialog: Boolean
  },
  data: () => ({
    form: {
      nome: null,
      telefoneCelular: null
    },
    hasMessages: false
  }),
  computed: {
    messageError() {
      return {
        "md-invalid": this.hasMessages
      };
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    validateForm(nome) {
      if (!nome) {
        return (this.hasMessages = true);
      }
      this.hasMessages = !!nome.match("\\b\\w{1,2}\\b");
      if (this.hasMessages) {
        this.form = {
          nome: null,
          telefoneCelular: null
        };
      }
    },
    submit() {
      this.validateForm(this.form.nome);

      if (!this.hasMessages) {
        this.$emit("save", this.form);
        this.form = {
          nome: null,
          telefoneCelular: null
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.md-dialog {
  width: 768px;
}
</style>
