# Architecture Decision Record (ADR)

## 001. 组件化与 SEO 优化

**日期**: 2025-11-27
**状态**: 已接受

### 背景 (Context)
项目初期，所有 UI 逻辑都耦合在 `page.tsx` 页面组件中。随着页面增加（如文章详情页），出现了代码重复（如 Header）和体验不一致的问题。同时，文章详情页缺乏动态元数据，影响 SEO。

### 决策 (Decision)
1. **提取公共组件**:
   - 创建 `components/Header.tsx`: 统一管理导航栏和主题切换。
   - 创建 `components/PostCard.tsx`: 封装文章列表项的 UI 逻辑。

2. **实现动态 Metadata**:
   - 在 `app/blog/[slug]/page.tsx` 中使用 Next.js 的 `generateMetadata` API，根据文章 Frontmatter 动态生成标题和描述。

3. **增强数据层**:
   - 更新 `lib/posts.ts`，确保 `getPostData` 返回完整的文章元数据（包括 `description`），以支持 SEO 需求。

### 后果 (Consequences)
- **正面**:
  - 页面代码更加简洁，关注点分离。
  - 修改导航栏只需改动一处，全站生效。
  - 搜索引擎可以正确索引每篇文章的内容。
  - 修复了潜在的类型错误。

- **负面**:
  - 增加了文件数量，需要更好的目录结构管理（目前尚可控）。

### 后续计划
- 引入 Zod 进行 Frontmatter 的运行时校验。
- 考虑引入 MDX 以支持更丰富的文章内容。
