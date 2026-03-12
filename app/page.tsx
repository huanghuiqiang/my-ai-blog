import { getSortedPostsData } from '@/lib/posts';
import { Header } from '@/components/Header';
import { PostCard } from '@/components/PostCard';

export default function Home() {
  const allPosts = getSortedPostsData();

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6">
        <section className="mb-14 pt-8">
          <p className="inline-flex items-center rounded-full border border-[var(--line)] bg-white/70 dark:bg-slate-900/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-6">
            AI Engineering Notes
          </p>
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-[var(--text-primary)] mb-6">
            从 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-500">确定性</span>
            <br />
            走向 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-500">概率性</span>
          </h1>
          <p className="text-xl text-[var(--text-muted)] leading-relaxed max-w-xl">
            探索 Software 2.0 时代的架构模式、工程实践与思维跃迁。
          </p>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">最新文章</h2>
            <span className="text-sm text-[var(--text-muted)] font-medium border border-[var(--line)] bg-white/80 dark:bg-slate-900/60 px-3 py-1 rounded-full">
              {allPosts.length} 篇
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {allPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
