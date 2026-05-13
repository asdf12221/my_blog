import { HomeCyber } from "@/components/HomeCyber";
import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const latestPosts = (await getAllPosts()).slice(0, 3);
  return <HomeCyber posts={latestPosts} />;
}
