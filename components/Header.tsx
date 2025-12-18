import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { CATEGORIES } from '@/lib/posts';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md mb-10">
      <div className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
            AI
          </div>
          <span className="font-bold text-slate-900 dark:text-white text-lg tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors hidden sm:block">
            Finn 的 AI 学习博客
          </span>
        </Link>

        {/* 桌面端导航 */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {Object.entries(CATEGORIES).map(([slug, name]) => (
            <Link 
              key={slug} 
              href={`/category/${slug}`}
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {name}
            </Link>
          ))}
          
          {/* 代码学习入口 - 特殊样式 */}
          <Link 
            href="/playground"
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold hover:shadow-lg hover:shadow-sky-500/30 transition-all hover:scale-105"
          >
            💻 代码学习
          </Link>
        </nav>

        {/* 放置开关 */}
        <ThemeToggle />
      </div>
    </header>
  );
}
