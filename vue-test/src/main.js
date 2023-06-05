import Vue from "vue";
import App from "./App";
import router from "./router";
import VueTheMask from "vue-the-mask";

Vue.use(VueTheMask);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
});
