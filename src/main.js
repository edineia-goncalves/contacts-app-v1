import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { firestorePlugin } from "vuefire";
/* import {
  MdButton,
  MdDialog,
  MdField,
  MdTable,
  MdCard,
  MdContent
} from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css"; */
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import VueTheMask from "vue-the-mask";

// library.add([faTrash, faEdit]);

// Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

// Vue.use(VueTheMask);
Vue.use(firestorePlugin);
/* Vue.use(MdButton);
Vue.use(MdDialog);
Vue.use(MdField);
Vue.use(MdTable);
Vue.use(MdCard);
Vue.use(MdContent); */

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
