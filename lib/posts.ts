import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 1. 定义文章的数据结构 (TypeScript Interface)
// 这就是类型系统的力量：我们要明确告诉程序，一篇文章必须包含哪些字段
export interface Post {
  slug: string;    // 文件名 (作为 URL 路径)
  title: string;   // 标题
  date: string;    // 日期
  description: string; // 简介
}

// 定义存放文章的路径
const postsDirectory = path.join(process.cwd(), 'posts');

// 2. 获取所有文章列表的函数
export function getSortedPostsData(): Post[] {
  // 获取 posts 文件夹下的所有文件名 ['first-ai-post.md', ...]
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    // 去掉 ".md" 后缀，作为 slug (URL 标识)
    const slug = fileName.replace(/\.md$/, '');

    // 读取文件内容
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 使用 gray-matter 解析元数据
    const matterResult = matter(fileContents);

    // 组合数据
    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      description: matterResult.data.description,
    };
  });

  // 按日期降序排序 (最新的在前面)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}