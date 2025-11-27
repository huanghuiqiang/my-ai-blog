import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
// 引入按钮组件
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  const allPosts = getSortedPostsData();

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
            我的 AI 学习博客
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            记录架构、代码与思考
          </p>
        </div>
        {/* 放置开关 */}
        <ThemeToggle />
      </header>
      
      {/* ... 下面的代码保持不变 ... */}
      
      <section>
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">最新文章</h2>
        <div className="space-y-6">
          {allPosts.map((post) => (
            <article key={post.slug} className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white dark:bg-slate-800">
              <Link href={`/blog/${post.slug}`} className="block">
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {post.title}
                </h3>
                <div className="text-sm text-slate-400 mb-3">
                  {post.date}
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  {post.description}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}