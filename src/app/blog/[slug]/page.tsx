import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { CyberNav } from "@/components/CyberNav";
import { PortableTextContent } from "@/components/PortableTextContent";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { urlFor } from "@/lib/sanity/image";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "文章不存在",
      description: "未找到对应文章。",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-slate-200 selection:bg-blue-500/30">
      <CyberNav />

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-32">
        <div className="space-y-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 transition-colors hover:text-blue-300"
          >
            返回主页 <ChevronRight size={16} />
          </Link>

          <article className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-7 md:p-10">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-500">{post.date}</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">{post.title}</h1>
            <p className="mt-2 text-xs text-slate-500">
              哈尔滨工业大学（威海） · 软件工程 2025级
            </p>
            {post.authorName ? (
              <p className="mt-3 text-sm text-slate-500">作者：{post.authorName}</p>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            {post.mainImage ? (
              <Image
                src={urlFor(post.mainImage).width(1200).height(680).url()}
                alt={post.title}
                width={1200}
                height={680}
                className="mt-8 rounded-xl border border-white/10 object-cover"
              />
            ) : null}
            <div className="mt-8 border-t border-white/10 pt-8">
              {post.body && post.body.length > 0 ? (
                <PortableTextContent value={post.body} />
              ) : (
                <p className="leading-8 text-slate-300">{post.content}</p>
              )}
            </div>
          </article>
        </div>
      </main>

      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,#1e293b,transparent)] opacity-20"></div>
    </div>
  );
}
