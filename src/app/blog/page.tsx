import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CyberNav } from "@/components/CyberNav";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "博客",
  description: "按时间排序查看全部文章（由 Sanity 后台发布）。",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-slate-200 selection:bg-blue-500/30">
      <CyberNav />

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-32">
        <div className="space-y-14">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-500">BLOG</p>
                <h1 className="mt-2 text-3xl font-bold md:text-4xl">全部文章</h1>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  共 {posts.length} 篇内容。
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  哈尔滨工业大学（威海） · 软件工程 2025级
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 transition-colors hover:text-blue-300"
              >
                返回主页 <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          {posts.map((post) => (
            <section key={post.slug} className="group relative">
              <div className="absolute -left-6 top-0 h-full w-px bg-gradient-to-b from-blue-600/50 to-transparent transition-all group-hover:from-blue-400"></div>
              <article className="cursor-pointer space-y-4">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-blue-500">
                  <span>{post.tags[0] ?? "Article"}</span>
                  <span className="h-px w-8 bg-blue-500/30"></span>
                  <span className="text-slate-500">{post.date}</span>
                </div>
                <h2 className="text-2xl font-bold transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="max-w-2xl leading-relaxed text-slate-400 transition-colors group-hover:text-slate-300">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-2 text-sm font-bold text-blue-400 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  READ MORE <ChevronRight size={16} />
                </Link>
              </article>
            </section>
          ))}
        </div>
      </main>

      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,#1e293b,transparent)] opacity-20"></div>
    </div>
  );
}
