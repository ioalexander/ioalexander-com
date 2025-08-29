import type { BlogPostItem } from "./blogPostItem";

export type BlogIndex = {
  postsCount: number;
  postItems: BlogPostItem[];
};
