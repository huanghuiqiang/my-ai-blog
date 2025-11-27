import { getPostsByCategory, CATEGORIES } from '@/lib/posts';
import { Header } from '@/components/Header';
import { PostCard } from '@/components/PostCard';
import { notFound } from 'next/navigation';

// 1. 生成静态路径 (Static Params)
export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({
    category,
  }));
}

// 2. 动态生成 Metadata
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryName = CATEGORIES[category as keyof typeof CATEGORIES];
  
  if (!categoryName) {
    return {
      title: '栏目未找到',
    };
  }

  return {
    title: `${categoryName} | 我的 AI 博客`,
    description: `查看 ${categoryName} 栏目下的所有文章`,
  };
}

// 3. 页面组件
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryName = CATEGORIES[category as keyof typeof CATEGORIES];

  // 如果栏目不存在，返回 404
  if (!categoryName) {
    notFound();
  }

  const posts = getPostsByCategory(category);

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6">
        <header className="mb-10 text-center">
          <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            栏目
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {categoryName}
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            共 {posts.length} 篇文章
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))
          ) : (
            <div className="col-span-2 text-center py-20 text-slate-500">
              该栏目下暂无文章，敬请期待！
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
