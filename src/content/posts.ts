import type { Post } from "./types";
import { POSTS_A } from "./posts-a";
import { POSTS_B } from "./posts-b";

/** Every blog post. Each entry needs a folder at src/app/blog/<slug>/page.tsx. */
export const POSTS: Post[] = [...POSTS_A, ...POSTS_B].sort((a, b) => b.published.localeCompare(a.published));

export const postPath = (slug: string) => `/blog/${slug}/`;
export const findPost = (slug: string) => POSTS.find((p) => p.slug === slug);
