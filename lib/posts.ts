import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// 1. 定义文章的数据结构 (TypeScript Interface)
export interface Post {
  slug: string;    // 文件名
  title: string;   // 标题
  date: string;    // 日期
  description: string; // 简介
  category?: string; // 栏目 (可选，为了兼容旧文章)
}

// 定义系统支持的栏目
export const CATEGORIES = {
  'ai-engineering': 'AI 工程化',
  'ai-for-developers': '程序员的 AI 觉醒',
  'build-in-public': '实战日志',
  'video-summary': 'AI 视频总结',
};

// ... (postsDirectory 定义保持不变)
const postsDirectory = path.join(process.cwd(), 'posts');

// 2. 获取所有文章列表的函数
export function getSortedPostsData(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      description: matterResult.data.description,
      category: matterResult.data.category || '其他', // 默认为其他
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// 新增：根据栏目获取文章
export function getPostsByCategory(category: string): Post[] {
  const allPosts = getSortedPostsData();
  // 这里的 category 参数是 URL 中的 slug (如 ai-engineering)
  // 我们需要匹配 Frontmatter 中的 category 字段
  // 假设 Frontmatter 存的是 key (如 ai-engineering) 或者 value (如 AI 工程化)
  // 为了简单，建议 Frontmatter 存 key
  return allPosts.filter(post => post.category === category);
}

// 根据 slug 获取单篇文章的详细数据
export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    title: matterResult.data.title,
    date: matterResult.data.date,
    description: matterResult.data.description,
    category: matterResult.data.category || '其他',
  };
}