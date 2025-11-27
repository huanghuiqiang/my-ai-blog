import { getSortedPostsData } from '@/lib/posts';
import { Header } from '@/components/Header';
import { PostCard } from '@/components/PostCard';

export default function Home() {
  const allPosts = getSortedPostsData();

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="max-w-2xl mx-auto px-6">
        <section className="mb-16 pt-10">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            从 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">确定性</span>
            <br />
            走向 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">概率性</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
            探索 Software 2.0 时代的架构模式、工程实践与思维跃迁。
          </p>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">最新文章</h2>
            <span className="text-sm text-slate-500 font-medium bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              {allPosts.length} 篇
            </span>
          </div>
          <div className="space-y-6">
            {allPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}