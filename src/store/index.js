import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    form: {
      nome: null,
      telefoneCelular: null
    },
    titleDialog: "Adicionar novo contato",
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
    showDialog: false
  },
  getters: {
    itemsBreadcrumbs: state => state.itemsBreadcrumbs,
    tableHeader: state => state.tableHeader,
    titleDialog: state => state.titleDialog,
    form: state => state.form,
    showDialog: state => state.showDialog
  },
  mutations: {
    clearForm(state) {
      state.form = {
        nome: null,
        telefoneCelular: null
      };
    },
    openDialog(state, value) {
      state.showDialog = value;
    },
    setForm(state, value) {
      state.form = value;
    },
    setTitleDialog(state, value) {
      state.titleDialog = value;
    },
  },
  actions: {
    clearForm({ commit }) {
      commit("clearForm");
    },
    openDialog({ commit }) {
      commit("openDialog");
    },
    setForm({ commit }) {
      commit("setForm");
    },
    setTitleDialog({ commit }) {
      commit("setTitleDialog");
    },
  },
  modules: {}
});
