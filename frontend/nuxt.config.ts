export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],
  ssr: true,
  css: ["~/assets/scss/main.scss"],
});
