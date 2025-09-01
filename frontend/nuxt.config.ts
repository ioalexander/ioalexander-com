import { visualizer } from "rollup-plugin-visualizer";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: process.env.NODE_ENV === "development" },
  modules: ["@nuxt/eslint", "@nuxtjs/sitemap", "@nuxtjs/turnstile"],
  ssr: true,

  css: ["~/assets/scss/main.scss"],

  runtimeConfig: {
    public: {
      domain: process.env.NUXT_PUBLIC_DOMAIN,
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  site: { url: process.env.NUXT_PUBLIC_DOMAIN, name: "IOAlexander" },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "IOAlexander - Simple. Fast. Built to Last.",
      meta: [
        {
          name: "description",
          content:
            "I build fast, reliable, and scalable solutions for real-world impact. I help businesses ship reliable, scalable software faster.",
        },
      ],
    },
  },

  turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_KEY as string,
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) return "vendor";
          },
        },
      },
    },
    plugins: [
      visualizer({
        filename: "./.output/public/bundle-analyzer.html",
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
  },
});
