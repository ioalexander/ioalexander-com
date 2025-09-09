import fs from "fs";
import path from "path";
import sharp from "sharp";
import fsExtra from "fs-extra";
import type { BlogPostItem } from "~/types/blogPostItem";
import type { BlogPostItemManifest } from "~/types/blogPostItemManifest";

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

const possiblePreviewExts = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
const possibleMediaExts = [".png", ".jpg", ".webp", ".jpeg", ".gif"];

type IndexData = {
  postsCount: number;
  postItems: BlogPostItem[];
};

function readManifest(manifestPath: string): BlogPostItemManifest {
  return JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
}

function extractMarkdownData(
  filePath: string,
  slug: string,
): { title: string; content: string } {
  const raw = fs.readFileSync(filePath, "utf-8");
  const lines = raw.split("\n");

  // Extract title
  const title = lines[0]?.replace(/^# /, "").trim() || "Untitled";

  // Combine rest as content
  let content = lines.slice(1).join("\n");

  // Replace Markdown image paths
  content = content.replace(
    /!\[([^\]]*)\]\(\.\/media\/([^)]+)\)/g,
    (_, alt, filename) => {
      const newFilename =
        path.basename(filename, path.extname(filename)) + ".webp";
      return `![${alt}](${domain}/generated/blog/${slug}/media/${newFilename})`;
    },
  );

  // Encode in Base64
  const contentBase64 = Buffer.from(content, "utf-8").toString("base64");

  return { title, content: contentBase64 };
}

async function processPreviewImage(
  articlePath: string,
  slug: string,
): Promise<string> {
  for (const ext of possiblePreviewExts) {
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

      return `/generated/blog/${slug}/preview.webp`;
    }
  }
  return "";
}

async function copyAndConvertMediaFolder(articlePath: string, slug: string) {
  const mediaSrc = path.join(articlePath, "media");
  if (!fs.existsSync(mediaSrc)) return;

  const mediaDest = path.join(publicBlogDir, slug, "media");
  fsExtra.ensureDirSync(mediaDest);

  const files = fs.readdirSync(mediaSrc);
  for (const file of files) {
    const srcPath = path.join(mediaSrc, file);
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);

    const destPath = path.join(mediaDest, `${baseName}.webp`);

    if (possibleMediaExts.includes(ext)) {
      await sharp(srcPath)
        .resize({ width: 2000, height: 2000, fit: "inside" })
        .toFormat("webp")
        .webp({ quality: 90, effort: 6 })
        .toFile(destPath);
      console.log(`Converted ${file} → ${destPath}`);
    } else {
      fsExtra.copySync(srcPath, path.join(mediaDest, file), {
        overwrite: true,
      });
      console.log(`Copied ${file} → ${mediaDest}`);
    }
  }
}

// --- CREATE VUE PAGE WITH BASE64 MARKDOWN ---
function createVuePage(
  template: string,
  slug: string,
  title: string,
  contentBase64: string,
  featuredImageUrl: string,
): void {
  // inject as JSON string literals
  const vueContent = template
    .replaceAll("TEMPLATE_STRING_CONTENT", contentBase64)
    .replaceAll("TEMPLATE_STRING_TITLE", title)
    .replaceAll("TEMPLATE_STRING_SLUG", slug)
    .replaceAll("TEMPLATE_STRING_FEATUREDIMAGE", featuredImageUrl || "");

  const vuePath = path.join(pagesBlogDir, `${slug.replace(".md", "")}.vue`);
  fs.writeFileSync(vuePath, vueContent, "utf-8");
  console.log(`Generated ${vuePath}`);
}

function updateIndexData(
  indexData: IndexData,
  slug: string,
  title: string,
  manifest: BlogPostItemManifest,
  featuredImageUrl: string,
) {
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
}

function generateIndexPage(indexData: IndexData) {
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

async function generateBlog() {
  const mdFiles = fs.readdirSync(blogDir);
  const indexData: IndexData = { postsCount: 0, postItems: [] };

  for (const slug of mdFiles) {
    const articlePath = path.join(blogDir, slug);
    const articleMarkdownPath = path.join(articlePath, "index.md");
    const articleManifestPath = path.join(articlePath, "manifest.json");

    console.log("Generating blog page for path:", articlePath);

    const manifest = readManifest(articleManifestPath);
    const { title, content } = extractMarkdownData(articleMarkdownPath, slug);
    const featuredImageUrl = await processPreviewImage(articlePath, slug);

    await copyAndConvertMediaFolder(articlePath, slug);
    createVuePage(blogTemplate, slug, title, content, featuredImageUrl);
    updateIndexData(indexData, slug, title, manifest, featuredImageUrl);
  }

  generateIndexPage(indexData);
}

generateBlog();
