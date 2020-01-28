import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { firestorePlugin } from "vuefire";
import vuetify from "./plugins/vuetify";
import VueTheMask from "vue-the-mask";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/index.css";

Vue.config.productionTip = false;

Vue.use(VueToast);
Vue.use(VueTheMask);
Vue.use(firestorePlugin);

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
