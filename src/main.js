import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { firestorePlugin } from "vuefire";
import vuetify from "./plugins/vuetify";
// import VueTheMask from "vue-the-mask";

Vue.config.productionTip = false;

// Vue.use(VueTheMask);
Vue.use(firestorePlugin);

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
