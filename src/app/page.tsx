import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const latestPosts = (await getAllPosts()).slice(0, 3);

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 py-12">
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Lenovo 的个人博客</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-300">
          这是一个可联网访问的博客站点，内容由 Sanity 可视化后台管理。
        </p>
        <div className="mt-6">
          <Link
            href="/blog"
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            查看全部文章
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">最新文章</h2>
        <div className="mt-4 grid gap-4">
          {latestPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
            >
              <p className="text-sm text-zinc-500">{post.date}</p>
              <h3 className="mt-1 text-lg font-semibold">{post.title}</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                阅读全文
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
