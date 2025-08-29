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

definePageMeta({
  layout: "blog",
});

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

const content = md.render(rawContent);
</script>

<style lang="scss" module>
.container {
  width: 100%;
  max-width: 800px;
  padding: 0 32px;
  margin: 0 auto;

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
    font-size: 60px;
  }

  .content {
    width: 100%;

    h1,
    h2,
    h3,
    h4,
    h5 {
      margin: 0 0 10px;
      color: var(--color-secondary);

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

    ul {
      margin-left: 20px;
      li {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
