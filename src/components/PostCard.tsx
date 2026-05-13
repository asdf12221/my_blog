import Link from "next/link";
import type { BlogPost } from "@/lib/posts";

type PostCardProps = {
  post: BlogPost;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="surface-card group flex h-full flex-col rounded-3xl p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-300/70 hover:shadow-xl dark:hover:border-blue-700/60">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {post.date}
        </p>
        <span className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-300">
          Article
        </span>
      </div>
      <h3 className="section-title text-xl">{post.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{post.excerpt}</p>
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {(post.tags.length > 0 ? post.tags : ["博客"]).slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          阅读全文
        </Link>
      </div>
    </article>
  );
}
