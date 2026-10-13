import type { Post } from "./types";
import { POSTS_A } from "./posts-a";
import { POSTS_B } from "./posts-b";
import { POSTS_C } from "./posts-c";
import { POSTS_D } from "./posts-d";

/** Every blog post. Each entry needs a folder at src/app/blog/<slug>/page.tsx. */
export const POSTS: Post[] = [...POSTS_A, ...POSTS_B, ...POSTS_C, ...POSTS_D].sort((a, b) => b.published.localeCompare(a.published));

export const postPath = (slug: string) => `/blog/${slug}/`;
export const findPost = (slug: string) => POSTS.find((p) => p.slug === slug);
