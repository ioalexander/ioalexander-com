export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/mdc",
    "@nuxtjs/sitemap",
    "@nuxtjs/turnstile",
  ],
  ssr: true,
  css: ["~/assets/scss/main.scss"],

  runtimeConfig: {
    public: {
      domain: process.env.NUXT_PUBLIC_DOMAIN,
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  site: { url: process.env.NUXT_PUBLIC_DOMAIN, name: "IOAlexander" },

  turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_KEY as string,
  },
});
