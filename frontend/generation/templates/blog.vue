<template>
  <article :class="$style.container">
    <div :class="$style.featuredImage">
      <img :src="featuredImage" :class="$style.img" />
    </div>
    <h1 :class="$style.title">{{ title }}</h1>
    <div :class="$style.content" v-html="content" />
  </article>
</template>

<script setup lang="ts">
import MarkdownIt from "markdown-it";

definePageMeta({ client: false });

const slug = `TEMPLATE_STRING_SLUG`;
const title = `TEMPLATE_STRING_TITLE`;
const featuredImage = `TEMPLATE_STRING_FEATUREDIMAGE`;

// Markdown content as a string
const rawContent = `TEMPLATE_STRING_CONTENT`;

// Parse Markdown to HTML at build time
const md = new MarkdownIt({
  html: true, // allow HTML in Markdown
  linkify: true, // convert URLs to links
  typographer: true, // smart quotes, etc.
});

const decodedContent = decodeURIComponent(
  Array.prototype.map
    .call(
      atob(rawContent),
      (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2),
    )
    .join(""),
);
const content = md.render(decodedContent);

const metaDescription = computed(() =>
  decodedContent.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 160),
);

useHead({
  title,
  meta: [
    {
      name: "description",
      content:
        metaDescription + (metaDescription.value.length === 160 ? "..." : ""),
    },
    { property: "og:title", content: title },
    { property: "og:image", content: featuredImage },
  ],
});
</script>

<style lang="scss" module>
.container {
  width: 100%;
  max-width: 800px;
  padding: 0 32px;
  margin: 0 auto;

  @media all and (max-width: 800px) {
    padding: 0 16px;
  }

  .featuredImage {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 16px;

    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .title {
    margin-bottom: 32px;
    font-size: 50px;
    color: var(--text-secondary);

    @media all and (max-width: 800px) {
      font-size: 40px;
    }

    @media all and (max-width: 400px) {
      font-size: 30px;
    }
  }

  .content {
    width: 100%;

    img {
      max-width: 100%;
    }

    hr {
      margin: 32px 0;
    }

    pre {
      overflow: scroll;
      padding: 16px;
      border: 1px solid var(--background-border);
      margin-bottom: 16px;
      border-radius: 16px;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
      margin: 0 0 16px;
      color: var(--text-secondary);

      a {
        color: inherit;
        font-size: inherit;
        text-decoration: none;
      }
    }

    h1,
    h2 {
      font-size: 30px;
    }
    h3,
    h4 {
      font-size: 25px;
    }
    h5 {
      font-size: 22px;
    }

    p {
      margin-bottom: 10px;
    }

    ul,
    ol {
      margin-left: 20px;
      li {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
