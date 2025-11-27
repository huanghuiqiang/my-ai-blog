import Link from 'next/link';
import { Post } from '@/lib/posts';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white dark:bg-slate-800">
      <Link href={`/blog/${post.slug}`} className="block">
        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          {post.title}
        </h3>
        <div className="text-sm text-slate-400 mb-3">
          {post.date}
        </div>
        <p className="text-slate-600 dark:text-slate-300">
          {post.description}
        </p>
      </Link>
    </article>
  );
}
