import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="flex justify-between items-center mb-10">
      <Link href="/" className="group">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          我的 AI 学习博客
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          记录架构、代码与思考
        </p>
      </Link>
      {/* 放置开关 */}
      <ThemeToggle />
    </header>
  );
}
