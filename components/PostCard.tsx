import Link from 'next/link';
import { Post } from '@/lib/posts';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-900/50 backdrop-blur-sm">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
            {post.date}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
          {post.title}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
          {post.description}
        </p>
        
        <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
          阅读全文 →
        </div>
      </Link>
    </article>
  );
}
