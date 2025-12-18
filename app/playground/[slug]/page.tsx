import Link from 'next/link';
import { notFound } from 'next/navigation';
import demoManifest from '@/public/demos/demo-manifest.json';

export async function generateStaticParams() {
  return demoManifest.map((demo) => ({
    slug: demo.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const demo = demoManifest.find((d) => d.id === slug);
  
  if (!demo) {
    return {
      title: 'Demo Not Found',
    };
  }

  return {
    title: `${demo.title} | 代码学习实验室`,
    description: demo.description,
  };
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const demo = demoManifest.find((d) => d.id === slug);

  if (!demo) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link 
                href="/playground" 
                className="text-sky-400 hover:text-sky-300 transition-colors text-sm mb-2 inline-block"
              >
                ← 返回实验室
              </Link>
              <h1 className="text-2xl font-bold text-white">
                {demo.title}
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                {demo.description}
              </p>
            </div>
            
            {/* Tags */}
            <div className="flex gap-2">
              {demo.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full border border-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Demo Container */}
      <main className="flex-1 p-6 flex flex-col">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
          <div className="bg-slate-900/50 rounded-2xl shadow-2xl overflow-hidden flex-1 flex flex-col">
            <iframe
              src={demo.path}
              className="w-full flex-1 border-0"
              title={demo.title}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <div>
              难度: <span className="text-sky-400 font-semibold">{demo.difficulty}</span>
            </div>
            <div>
              创建于: {new Date(demo.createdAt).toLocaleDateString('zh-CN')}
            </div>
            <a
              href={demo.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1"
            >
              在新窗口打开
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
