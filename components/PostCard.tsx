import Link from 'next/link';
import { Post } from '@/lib/posts';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative rounded-2xl p-6 border border-[var(--line)] bg-white/85 dark:bg-slate-900/55 backdrop-blur-sm hover:shadow-xl hover:shadow-cyan-900/10 transition-all duration-300 hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium text-[var(--text-muted)] border border-[var(--line)] bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded-md">
            {post.date}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-emerald-500 transition-all">
          {post.title}
        </h3>
        
        <p className="text-[var(--text-muted)] leading-relaxed line-clamp-2">
          {post.description}
        </p>
        
        <div className="mt-4 flex items-center text-[var(--brand)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
          阅读全文 →
        </div>
      </Link>
    </article>
  );
}
