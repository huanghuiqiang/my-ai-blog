import Link from 'next/link';
import demoManifest from '@/public/demos/demo-manifest.json';

export const metadata = {
  title: '代码学习实验室 | AI Blog',
  description: '交互式代码示例和可视化演示',
};

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link href="/" className="text-sky-400 hover:text-sky-300 transition-colors mb-4 inline-block">
            ← 返回博客首页
          </Link>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-sky-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent mb-3">
            代码学习实验室
          </h1>
          <p className="text-slate-400 text-lg">
            交互式代码示例，边玩边学 🚀
          </p>
        </div>
      </header>

      {/* Demo Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoManifest.map((demo) => (
            <Link
              key={demo.id}
              href={`/playground/${demo.id}`}
              className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-sky-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 relative overflow-hidden">
                {/* 实际缩略图 */}
                {demo.thumbnail ? (
                  <img 
                    src={demo.thumbnail} 
                    alt={demo.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-20">💻</div>
                  </div>
                )}
                
                {/* 悬停渐变层 */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Difficulty Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-sm text-xs font-semibold rounded-full border border-slate-600">
                    {demo.difficulty}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                  {demo.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {demo.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {demo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Date */}
                <div className="text-xs text-slate-500">
                  {new Date(demo.createdAt).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {demoManifest.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎨</div>
            <p className="text-slate-400 text-lg">还没有代码示例，敬请期待...</p>
          </div>
        )}
      </main>
    </div>
  );
}
