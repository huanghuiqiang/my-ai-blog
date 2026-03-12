import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { CATEGORIES } from '@/lib/posts';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--line)]/70 bg-[var(--surface)]/75 backdrop-blur-md mb-10">
      <div className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm tracking-wide group-hover:scale-105 transition-transform">
            F
          </div>
          <span className="font-semibold text-[var(--text-primary)] text-lg tracking-tight group-hover:text-[var(--brand)] transition-colors hidden sm:block">
            Finn 的 AI 学习博客
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {Object.entries(CATEGORIES).map(([slug, name]) => (
            <Link 
              key={slug} 
              href={`/category/${slug}`}
              className="text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
            >
              {name}
            </Link>
          ))}
          
          <Link 
            href="/playground"
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105"
          >
            代码实验场
          </Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
