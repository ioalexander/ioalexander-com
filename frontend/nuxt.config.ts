export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxtjs/mdc", "@nuxtjs/sitemap"],
  ssr: true,
  css: ["~/assets/scss/main.scss"],

  runtimeConfig: {
    public: {
      domain: process.env.NUXT_PUBLIC_DOMAIN,
    },
  },

  site: { url: process.env.NUXT_PUBLIC_DOMAIN, name: "IOAlexander" },
});
