import { getSortedPostsData } from '@/lib/posts';
import { Header } from '@/components/Header';
import { PostCard } from '@/components/PostCard';

export default function Home() {
  const allPosts = getSortedPostsData();

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <Header />
      
      <section>
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">最新文章</h2>
        <div className="space-y-6">
          {allPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}