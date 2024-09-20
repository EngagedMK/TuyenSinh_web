/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
// import { registerPlugins } from '@/plugins';

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import Toast, { POSITION, PluginOptions } from "vue-toastification";
import vuetify from "./plugins/vuetify";
import "@/scss/style.scss";
import router from "./router";
import { createPinia } from "pinia";
import { PerfectScrollbarPlugin } from "vue3-perfect-scrollbar";
import VueTablerIcons from "vue-tabler-icons";
import "vue-toastification/dist/index.css";
// import i18n from "@/app/i18n";

const options: PluginOptions = {
  timeout: 2000,
  closeOnClick: false,
  draggable: false,
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  position: POSITION.TOP_RIGHT,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
};

const app = createApp(App);
app.use(router);
app.use(PerfectScrollbarPlugin);
app.use(VueTablerIcons);
app.use(createPinia());
app.use(Toast, options);
// app.use(i18n);
// registerPlugins(app)
app.use(vuetify).mount("#tuyen-sinh-web");
