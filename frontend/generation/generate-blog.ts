import fs from "fs";
import path from "path";

const blogDir = path.resolve("./data/blog");
const pagesDir = path.resolve("./pages/blog");

if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });

const mdFiles = fs.readdirSync(blogDir);

mdFiles.forEach((slug) => {
  const articlePath = path.join(blogDir, slug);
  const articleMarkdownPath = path.join(articlePath, "index.md");
  console.log("Generating blog page for path: ", articlePath);
  const raw = fs.readFileSync(articleMarkdownPath, "utf-8");

  const content = raw.replace(/`/g, "\\`");
  const title = slug;

  const vueContent = `<script setup lang="ts">
const slug =  \`${slug}\`;
const title =  \`${title}\`;
const content = \`${content}\`;
</script>

<template>
  <article>
    <h1>{{ title }}</h1>
    <pre>{{ content }}</pre>
  </article>
</template>
`;

  const vuePath = path.join(pagesDir, `${slug.replace(".md", "")}.vue`);
  fs.writeFileSync(vuePath, vueContent, "utf-8");
  console.log(`Generated ${vuePath}`);
});
