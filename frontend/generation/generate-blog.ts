import fs from "fs";
import path from "path";
import sharp from "sharp";
import type { BlogPostItem } from "~/types/blogPostItem";
import type { BlogPostItemManifest } from "~/types/blogPostItemManifest";
import fsExtra from "fs-extra";

const domain = process.env.NUXT_PUBLIC_DOMAIN || "http://localhost:3000";

const blogDir = path.resolve("./data/blog");
const pagesBlogDir = path.resolve("./pages/blog");
const templatesDir = path.resolve("./generation/templates");
const publicDir = path.resolve("./public");
const publicBlogDir = path.join(publicDir, "/generated/blog");

const blogTemplate = fs.readFileSync(
  path.join(templatesDir, "blog.vue"),
  "utf-8",
);

const blogIndexTemplate = fs.readFileSync(
  path.join(templatesDir, "blogIndex.vue"),
  "utf-8",
);

if (!fs.existsSync(pagesBlogDir)) {
  throw new Error("pagesDir does not exist");
}

const mdFiles = fs.readdirSync(blogDir);

const indexData: {
  postsCount: number;
  postItems: BlogPostItem[];
} = {
  postsCount: 0,
  postItems: [],
};

async function generateBlog() {
  for (const slug of mdFiles) {
    const articlePath = path.join(blogDir, slug);
    const articleMarkdownPath = path.join(articlePath, "index.md");
    const articleManifestPath = path.join(articlePath, "manifest.json");

    console.log("Generating blog page for path:", articlePath);

    const manifest = JSON.parse(
      fs.readFileSync(articleManifestPath, "utf-8"),
    ) as BlogPostItemManifest;

    const raw = fs.readFileSync(articleMarkdownPath, "utf-8");
    const lines = raw.split("\n");
    const title = lines[0]?.replace(/^# /, "").trim() || "Untitled";
    let content = lines.slice(1).join("\n").replace(/`/g, "\\`");

    // 🔄 Rewrite ./media/... paths → /generated/blog/{slug}/media/...
    content = content.replaceAll(
      /\]\(\.\/media\//g,
      `](/generated/blog/${slug}/media/`,
    );

    // Detect preview image (any common extension)
    const possibleExts = [".png", ".jpg", ".jpeg", ".gif"];
    let featuredImageUrl = "";

    for (const ext of possibleExts) {
      const previewPath = path.join(articlePath, `preview${ext}`);
      if (fs.existsSync(previewPath)) {
        const outDir = path.join(publicBlogDir, slug);
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

        const outPath = path.join(outDir, "preview.webp");

        await sharp(previewPath)
          .resize({ width: 1000, height: 1000, fit: "inside" })
          .toFormat("webp")
          .webp({ quality: 90, effort: 6 })
          .toFile(outPath);

        featuredImageUrl = `/generated/blog/${slug}/preview.webp`;
        break;
      }
    }

    // ✅ Copy media folder if it exists
    const mediaSrc = path.join(articlePath, "media");
    if (fs.existsSync(mediaSrc)) {
      const mediaDest = path.join(publicBlogDir, slug, "media");
      fsExtra.copySync(mediaSrc, mediaDest, { overwrite: true });
      console.log(`Copied media folder to ${mediaDest}`);
    }

    const vueContent = blogTemplate
      .replaceAll("TEMPLATE_STRING_CONTENT", content)
      .replaceAll("TEMPLATE_STRING_TITLE", title)
      .replaceAll("TEMPLATE_STRING_SLUG", slug)
      .replaceAll("TEMPLATE_STRING_FEATUREDIMAGE", featuredImageUrl);

    const vuePath = path.join(pagesBlogDir, `${slug.replace(".md", "")}.vue`);
    fs.writeFileSync(vuePath, vueContent, "utf-8");

    indexData.postsCount++;
    indexData.postItems.push({
      slug,
      title,
      url: `/blog/${slug}`,
      absoluteUrl: `${domain}/blog/${slug}`,
      featuredImageUrl,
      featuredImageAbsoluteUrl: featuredImageUrl
        ? `${domain}${featuredImageUrl}`
        : "",
      tags: manifest.tags,
      createdAt: manifest.createdAt,
    });

    console.log(`Generated ${vuePath}`);
  }
  console.log("Generating blog index...");

  const blogIndexVueContent = blogIndexTemplate.replaceAll(
    "TEMPLATE_STRING_BLOGINDEX",
    JSON.stringify(indexData),
  );

  const blogIndexVuePath = path.join(pagesBlogDir, `index.vue`);
  fs.writeFileSync(blogIndexVuePath, blogIndexVueContent, "utf-8");
  console.log(
    `Generated blog index with ${indexData.postsCount} posts at: ${blogIndexVuePath}`,
  );
}

generateBlog();
