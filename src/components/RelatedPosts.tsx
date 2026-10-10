import Link from "next/link";
import { POSTS, postPath } from "@/content/posts";

/** Link a product, industry or use-case page to its supporting editorial guides. */
export function RelatedPosts({ path }: { path: string }) {
  const related = POSTS.filter((post) => post.pages?.includes(path)).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="border-t border-line bg-paper">
      <div className="wrap py-14">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">From the blog</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {related.map((post) => (
            <Link key={post.slug} href={postPath(post.slug)} className="card card-hover p-6">
              <p className="eyebrow">{post.category}</p>
              <p className="mt-2 font-bold leading-snug text-ink">{post.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
