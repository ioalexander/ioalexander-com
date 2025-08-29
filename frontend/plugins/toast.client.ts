import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    position: POSITION.BOTTOM_LEFT,
    timeout: 3000,
    pauseOnHover: true,
  };
  nuxtApp.vueApp.use(Toast, options);
});
