import { getPostData, getSortedPostsData } from '@/lib/posts';
import { Header } from '@/components/Header';
import Link from 'next/link';
import { Metadata } from 'next';

// 1. 生成静态路径 (Static Params)
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. 动态生成 Metadata (SEO)
// 这是一个 Next.js 的特殊函数，用于生成 <head> 中的标签
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return {
    title: `${postData.title} | 我的 AI 博客`,
    description: postData.description || '关于 AI 的深度思考',
    openGraph: {
      title: postData.title,
      description: postData.description,
      type: 'article',
      publishedTime: postData.date,
    },
  };
}

// 3. 页面组件
export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; 
  const postData = await getPostData(slug);

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      {/* 复用 Header，保持一致体验 */}
      <Header />

      <main>
        <article>
          <header className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {postData.title}
            </h1>
            <div className="text-slate-500 dark:text-slate-400">
              {postData.date}
            </div>
          </header>

          <div 
            className="prose prose-slate dark:prose-invert lg:prose-xl mx-auto"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
          />
        </article>

        <div className="mt-10 pt-10 border-t border-slate-200 dark:border-slate-700">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← 返回首页
          </Link>
        </div>
      </main>
    </div>
  );
}