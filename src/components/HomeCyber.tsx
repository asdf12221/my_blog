"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CyberNav } from "@/components/CyberNav";
import { CyberSidebar } from "@/components/CyberSidebar";
import type { BlogPost } from "@/lib/posts";

type HomeCyberProps = {
  posts: BlogPost[];
};

function formatPostDate(dateText: string) {
  const date = new Date(dateText);
  if (Number.isNaN(date.getTime())) {
    return "MAY 2026";
  }

  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return `${month} ${date.getFullYear()}`;
}

export function HomeCyber({ posts }: HomeCyberProps) {
  return (
    <div className="min-h-screen bg-[#050505] font-mono text-slate-200 selection:bg-blue-500/30">
      <CyberNav />

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-20 pt-32">
        <CyberSidebar />

        <div className="space-y-16">
          {posts.map((post) => (
            <section key={post.slug} className="group relative">
              <div className="absolute -left-6 top-0 h-full w-px bg-gradient-to-b from-blue-600/50 to-transparent transition-all group-hover:from-blue-400"></div>
              <article className="cursor-pointer space-y-4">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-blue-500">
                  <span>{post.tags[0] ?? "Reinforcement Learning"}</span>
                  <span className="h-px w-8 bg-blue-500/30"></span>
                  <span className="text-slate-500">{formatPostDate(post.date)}</span>
                </div>
                <h3 className="text-3xl font-bold transition-transform duration-300 group-hover:translate-x-2 md:text-4xl">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
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
