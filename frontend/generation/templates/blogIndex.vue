<template>
  <div :class="$style.container">
    <p v-if="state.error">{{ state.error }}</p>
    <div v-else-if="state.blogIndex" :class="$style.list">
      <article
        v-for="post in state.blogIndex.postItems"
        :key="post.slug"
        :class="$style.item"
      >
        <ControlsPanel :class="$style.panel">
          <NuxtLink :to="post.url" :class="$style.preview">
            <img :class="$style.img" :src="post.featuredImageUrl" />
          </NuxtLink>
          <NuxtLink :to="post.url" :class="$style.title">
            <h2 :class="$style.h">{{ post.title }}</h2>
          </NuxtLink>
        </ControlsPanel>
      </article>
    </div>
    <div v-else :class="$style.loading">
      <ControlsPanel v-for="n in 32" :key="n" :class="$style.skeleton">
        <div :class="$style.preview" />
        <div :class="$style.title" />
      </ControlsPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { BlogIndex } from "~/types/blogIndex";
import type { BlogPostItem } from "~/types/blogPostItem";

definePageMeta({ client: false });

const blogIndexRaw = `TEMPLATE_STRING_BLOGINDEX`;

const blogIndexData: BlogIndex = JSON.parse(blogIndexRaw);

const state = reactive<{ error: string | null; blogIndex: BlogIndex | null }>({
  error: null,
  blogIndex: {
    ...blogIndexData,
    postItems: blogIndexData.postItems.sort(
      (a: BlogPostItem, b: BlogPostItem) => {
        const [dayA = 0, monthA = 0, yearA = 0] =
          a.createdAt?.split("-").map(Number) ?? [];
        const [dayB = 0, monthB = 0, yearB = 0] =
          b.createdAt?.split("-").map(Number) ?? [];
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);
        return dateB.getTime() - dateA.getTime();
      },
    ),
  },
});

useHead({
  title: "Blog",
  meta: [
    {
      name: "description",
      content: "Read all tech news and projects I do!",
    },
  ],
});
</script>

<style lang="scss" module>
.container {
  max-width: var(--max-content-width);
  padding: 0 32px;
  margin: 0 auto;
  margin-top: 30px;

  .list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;

    @media all and (max-width: 900px) {
      grid-template-columns: 1fr 1fr;
    }

    @media all and (max-width: 600px) {
      grid-template-columns: 1fr;
    }

    .item {
      .panel {
        width: 100%;

        padding: 16px;
        border-radius: 16px;

        .preview {
          width: 100%;
          margin-bottom: 20px;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-radius: 8px;
          display: block;

          .img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
        }
        .title {
          text-decoration: none;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          height: 54px;

          .h {
            font-size: 20px;
            color: var(--color-secondary);
          }
        }
      }
    }
  }

  .loading {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;

    .skeleton {
      width: 100%;
      padding: 16px;
      border-radius: 16px;

      .preview {
        width: 100%;
        margin-bottom: 20px;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        border-radius: 8px;
        display: block;
        background: rgba(100, 100, 100, 0.1);
        animation: pulse 1s ease-in-out infinite;
      }

      .title {
        height: 54px;
        border-radius: 8px;
        background: rgba(100, 100, 100, 0.1);
        animation: pulse 1s ease-in-out infinite;
      }
    }
  }
}

@keyframes pulse {
  0%,
  100% {
    background-color: rgba(100, 100, 100, 0.05);
  }
  50% {
    background-color: rgba(100, 100, 100, 0.1);
  }
}
</style>
