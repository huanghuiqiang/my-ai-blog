# 代码学习实验室 - 使用指南

## 📐 架构设计

这个"代码学习实验室"栏目是一个专门用于展示交互式代码示例的独立模块，完美集成到你的 Next.js 博客中。

### 核心特性
- ✅ **独立的 HTML/CSS/JS 示例**：每个示例都是完全独立的，可以直接运行
- ✅ **iframe 安全嵌入**：使用 sandbox 模式保证安全性
- ✅ **响应式卡片布局**：自动适配不同屏幕尺寸
- ✅ **元数据管理**：通过 JSON 文件统一管理所有示例
- ✅ **SEO 友好**：自动生成静态页面和元数据

---

## 📁 目录结构

```
my-ai-blog/
├── app/
│   └── playground/                    # 代码学习栏目
│       ├── page.tsx                   # 主页：展示所有示例的卡片
│       └── [slug]/                    # 动态路由
│           └── page.tsx               # 单个示例的展示页（iframe 嵌入）
│
├── public/
│   └── demos/                         # 所有代码示例存放处
│       ├── demo-manifest.json         # 📋 示例清单（重要！）
│       └── promise-queue/             # 示例 1：Promise 并发队列
│           ├── index.html
│           ├── style.css
│           └── thumbnail.png
│
└── components/
    └── Header.tsx                     # 已添加"代码学习"导航入口
```

---

## 🚀 如何添加新的代码示例

### 步骤 1: 创建示例文件夹

在 `public/demos/` 下创建新文件夹，例如 `my-new-demo/`：

```bash
mkdir -p public/demos/my-new-demo
```

### 步骤 2: 添加代码文件

在该文件夹中创建你的代码文件：

```
public/demos/my-new-demo/
├── index.html      # 主 HTML 文件（必需）
├── style.css       # 样式文件（可选）
├── script.js       # JavaScript 文件（可选）
└── thumbnail.png   # 缩略图（推荐 16:9 比例）
```

**重要提示**：
- `index.html` 必须是**完整的 HTML 文档**（包含 `<!DOCTYPE html>`）
- 如果使用外部 CSS/JS，请使用相对路径引入
- 示例应该是**自包含的**，不依赖外部库（或使用 CDN）

### 步骤 3: 更新示例清单

编辑 `public/demos/demo-manifest.json`，添加新示例的元数据：

```json
[
  {
    "id": "my-new-demo",                    // 唯一标识符（用于 URL）
    "title": "我的新示例",                   // 显示标题
    "description": "这是一个很酷的代码示例", // 简短描述
    "tags": ["JavaScript", "动画"],         // 技术标签
    "difficulty": "初级",                    // 难度：初级/中级/高级
    "createdAt": "2025-12-18",              // 创建日期
    "thumbnail": "/demos/my-new-demo/thumbnail.png",  // 缩略图路径
    "path": "/demos/my-new-demo/index.html"           // HTML 文件路径
  }
]
```

### 步骤 4: 验证效果

1. 启动开发服务器：`npm run dev`
2. 访问 `http://localhost:3000/playground`
3. 你应该能看到新的示例卡片
4. 点击卡片进入详情页，验证代码运行正常

---

## 🎨 设计规范

### 缩略图建议
- **尺寸**：推荐 1280x720 (16:9)
- **风格**：深色主题，与博客整体风格一致
- **内容**：抽象的可视化图形，避免纯文字

### 代码示例最佳实践
1. **响应式设计**：确保在不同屏幕尺寸下都能正常显示
2. **深色主题**：与博客风格保持一致
3. **性能优化**：避免过度的动画或大文件
4. **注释清晰**：代码中添加详细注释，便于学习

---

## 🔧 技术细节

### 路由系统
- **主页**：`/playground` → 展示所有示例
- **详情页**：`/playground/[slug]` → 展示单个示例

### 数据流
```
demo-manifest.json 
    ↓
app/playground/page.tsx (读取并渲染卡片)
    ↓
用户点击卡片
    ↓
app/playground/[slug]/page.tsx (iframe 嵌入 HTML)
```

### 安全性
- 使用 `sandbox="allow-scripts allow-same-origin"` 限制 iframe 权限
- 所有示例都在隔离的 iframe 环境中运行

---

## 📝 示例模板

### 最小化 HTML 模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的示例</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
    </style>
</head>
<body>
    <h1>Hello, Playground!</h1>
    
    <script>
        console.log('示例已加载');
    </script>
</body>
</html>
```

---

## 🎯 下一步建议

1. **添加更多示例**：
   - 数据结构可视化（如二叉树、图）
   - 算法动画（排序、搜索）
   - CSS 特效演示
   - Canvas/WebGL 图形

2. **增强功能**：
   - 添加代码查看器（显示源代码）
   - 添加搜索和筛选功能
   - 支持收藏/点赞

3. **性能优化**：
   - 使用 Next.js Image 组件优化缩略图
   - 添加懒加载

---

## 🐛 常见问题

### Q: 为什么我的示例在 iframe 中无法运行？
A: 检查以下几点：
- 确保 `index.html` 是完整的 HTML 文档
- 检查浏览器控制台是否有错误
- 确认所有资源路径都是相对路径

### Q: 如何修改示例的样式？
A: 直接编辑 `public/demos/[your-demo]/` 下的文件，刷新页面即可看到效果。

### Q: 可以使用外部库吗？
A: 可以！使用 CDN 链接引入，例如：
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

---

## 📞 技术支持

如有问题，请检查：
1. Next.js 开发服务器是否正常运行
2. `demo-manifest.json` 格式是否正确
3. 文件路径是否匹配

Happy Coding! 🚀
