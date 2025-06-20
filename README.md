# Free Brat Generator

一个现代化的Web应用，用于创建受Charli XCX启发的"brat"专辑封面，具有正宗的BRAT美学风格。

🌐 **在线体验**: [https://www.bratgeneratorfree.com](https://www.bratgeneratorfree.com)

## ✨ 主要功能

- 🎨 **专业BRAT风格封面生成** - 完美还原Charli XCX专辑美学
- 📱 **响应式设计** - 支持所有设备，移动端友好
- 🎯 **多格式导出** - PNG、JPEG、SVG、Blob多种格式
- ✨ **实时预览** - 带有正宗模糊效果的即时预览
- 🔤 **字体优化** - 使用接近原版的字体堆栈
- 📝 **多行文本支持** - 灵活的文本布局选项
- 🎨 **高级自定义** - 字体大小、对齐、翻转、模糊等效果
- 📤 **社交分享** - 一键分享到各大社交平台

## 🛠️ 技术栈

- **框架**: Next.js 13.5.1
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图像处理**: html-to-image
- **UI组件**: Radix UI
- **图标**: Lucide React

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 开发环境
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用

### 生产构建
```bash
npm run build
npm start
```

## 🔧 环境变量

创建 `.env.local` 文件：

```bash
# 网站基础URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# API重新验证密钥
REVALIDATE_SECRET=your-secret-key
```

## 📜 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - ESLint代码检查
- `npm run sync` - 同步博客内容
- `npm run validate:seo` - SEO验证
- `npm run performance:audit` - 性能审计

## 🎨 设计特色

### 字体系统
使用专门优化的字体堆栈，更接近原版BRAT美学：
```css
"Helvetica Inserat", "Arial Black", "Arial Black Condensed", "Impact", ...
```

### 模糊效果
精心调校的模糊参数，还原原版专辑的印刷质感：
```css
filter: blur(1.5px) contrast(1.3) saturate(1.0)
```

### 响应式设计
- 默认字体大小：80px（移动端友好）
- 自动文本缩放：长文本自动压缩85%
- 多设备适配：完美支持手机、平板、桌面

## 📁 项目结构

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # 主页面（生成器）
│   ├── blog/              # 博客系统
│   ├── about/             # 关于页面
│   └── api/               # API路由
├── components/            # React组件
├── lib/                   # 工具库
├── public/               # 静态资源
├── scripts/              # 构建和维护脚本
└── types/                # TypeScript类型定义
```

## 🌟 核心功能

### 封面生成器
- 实时预览更新
- 多种文本效果（翻转、模糊、缩放）
- 自定义颜色和对齐
- 高质量图像导出

### 博客系统
- Markdown内容管理
- SEO优化
- 分类和标签
- 阅读时间估算

### 性能优化
- 图像懒加载
- 字体预加载
- 缓存策略
- 压缩优化

## 📱 浏览器支持

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

## 🔗 相关链接

- [在线体验](https://www.bratgeneratorfree.com)
- [项目博客](https://www.bratgeneratorfree.com/blog)
- [关于我们](https://www.bratgeneratorfree.com/about)

---

⭐ 如果这个项目对您有帮助，请给个Star支持一下！ 