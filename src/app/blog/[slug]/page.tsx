import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-12">
      <Link
        href="/blog"
        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
      >
        ← 返回博客列表
      </Link>

      <article className="mt-6">
        <p className="text-sm text-zinc-500">{post.date}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{post.title}</h1>
        {post.authorName ? (
          <p className="mt-2 text-sm text-zinc-500">作者：{post.authorName}</p>
        ) : null}
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
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
            className="mt-8 rounded-xl border border-zinc-200 object-cover dark:border-zinc-800"
          />
        ) : null}
        <div className="mt-8">
          {post.body && post.body.length > 0 ? (
            <PortableTextContent value={post.body} />
          ) : (
            <p className="leading-8 text-zinc-700 dark:text-zinc-200">{post.content}</p>
          )}
        </div>
      </article>
    </main>
  );
}
