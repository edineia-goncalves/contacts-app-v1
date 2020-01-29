import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    form: {
      nome: null,
      telefoneCelular: null
    },
    titleDialog: 'Adicionar novo contato',
    itemsBreadcrumbs: [
      {
        text: "Dashboard",
        disabled: false,
        href: "contatos"
      },
      {
        text: "Contatos",
        disabled: true,
        href: "contatos"
      }
    ],
    tableHeader: [
      { text: "Nome completo", value: "nome" },
      { text: "Telefone celular", value: "telefoneCelular" },
      { text: "Ações", value: "action" }
    ],
  },
  getters: {
    itemsBreadcrumbs: state => state.itemsBreadcrumbs,
    tableHeader: state => state.tableHeader,
    titleDialog: state => state.titleDialog,
    form: state => state.form,
  },
  mutations: {},
  actions: {},
  modules: {}
});
