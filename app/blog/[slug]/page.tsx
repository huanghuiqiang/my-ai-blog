import { getPostData, getSortedPostsData } from '@/lib/posts';

// 1. 生成静态路径 (Static Params)
// 告诉 Next.js 在构建时要把哪些文章提前生成好 HTML
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. 页面组件
// 注意：在 Next.js 15 中，params 是一个 Promise，必须 await
export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  // 等待参数解析
  const { slug } = await params; 
  
  // 获取文章数据
  const postData = await getPostData(slug);

  return (
    <article className="max-w-2xl mx-auto py-10 px-6">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {postData.title}
        </h1>
        <div className="text-slate-500">
          {postData.date}
        </div>
      </header>

      {/* 
        危险动作警告：dangerouslySetInnerHTML 
        React 默认不渲染 HTML 字符串以防 XSS 攻击。
        但因为内容是我们自己写的 Markdown，所以这里我们告诉 React "我相信这个内容是安全的"。
      */}
      <div 
        className="prose prose-slate lg:prose-xl mx-auto"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
      />
    </article>
  );
}