import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "博客",
  description: "按时间排序查看全部文章（由 Sanity 后台发布）。",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">全部文章</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-300">
        在 Sanity 后台发布后，文章会自动展示在这里。
      </p>

      <div className="mt-8 grid gap-4">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
          >
            <p className="text-sm text-zinc-500">{post.date}</p>
            <h2 className="mt-1 text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              阅读全文
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
