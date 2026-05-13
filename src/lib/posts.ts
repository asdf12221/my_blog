import { groq } from "next-sanity";
import { isSanityConfigured, sanityClient } from "@/lib/sanity/client";

export type PortableTextBlock = {
  _type: string;
  children?: Array<{ _type: string; text?: string }>;
  [key: string]: unknown;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  body?: PortableTextBlock[];
  date: string;
  tags: string[];
  mainImage?: unknown;
  authorName?: string;
};

const samplePosts: BlogPost[] = [
  {
    slug: "hello-blog",
    title: "我的第一篇博客",
    excerpt: "从 0 到 1，记录我把博客上线的全过程。",
    content:
      "这是第一篇文章。你完成 Sanity 配置后，这里会自动变成后台发布的内容。",
    date: "2026-05-13",
    tags: ["建站", "Next.js"],
  },
];

const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    "excerpt": coalesce(excerpt, ""),
    "body": body,
    "date": coalesce(publishedAt, _createdAt),
    "tags": coalesce(categories[]->title, []),
    "mainImage": mainImage,
    "authorName": author->name
  }
`;

const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    "excerpt": coalesce(excerpt, ""),
    "body": body,
    "date": coalesce(publishedAt, _createdAt),
    "tags": coalesce(categories[]->title, []),
    "mainImage": mainImage,
    "authorName": author->name
  }
`;

async function fetchFromSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    return await sanityClient.fetch<T>(query, params, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await fetchFromSanity<BlogPost[]>(allPostsQuery);
  if (!posts || posts.length === 0) {
    return samplePosts;
  }
  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const post = await fetchFromSanity<BlogPost>(postBySlugQuery, { slug });
  if (!post) {
    return samplePosts.find((item) => item.slug === slug);
  }
  return post;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}
