import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export default function Home() {
  // 1. 获取数据
  // 在 Next.js Server Components 中，你可以直接调用后端逻辑，不需要用 API
  const allPosts = getSortedPostsData();

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
          我的 AI 学习博客
        </h1>
        <p className="text-slate-500">
          记录架构、代码与思考
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-slate-800">最新文章</h2>
        <div className="space-y-6">
          {/* 2. 循环渲染文章列表 */}
          {allPosts.map((post) => (
            <article key={post.slug} className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Link href={`/blog/${post.slug}`} className="block">
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  {post.title}
                </h3>
                <div className="text-sm text-slate-400 mb-3">
                  {post.date}
                </div>
                <p className="text-slate-600">
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