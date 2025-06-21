# SEO 工具使用指南

本项目包含多个SEO验证和测试工具，帮助确保网站的搜索引擎优化配置正确。

## 📋 可用的SEO工具

### 1. 完整SEO验证 (推荐)
```bash
npm run validate:seo-full
```
**功能**: 全面检查robots.txt、sitemap.xml、首页SEO和博客页面
**适用场景**: 部署前的完整SEO检查

### 2. Sitemap测试
```bash
npm run test:sitemap
```
**功能**: 专门测试sitemap.xml文件的生成和内容
**检查项目**:
- XML格式正确性
- URL数量和结构
- 元数据完整性
- 域名配置

### 3. Robots.txt测试
```bash
npm run test:robots
```
**功能**: 验证robots.txt文件配置
**检查项目**:
- 搜索引擎指令
- 禁止访问目录
- Sitemap引用
- 编码和格式

### 4. 基础SEO验证
```bash
npm run validate:seo
```
**功能**: 检查基本的SEO配置
**检查项目**:
- Meta标签
- 结构化数据
- Open Graph
- Twitter Cards

### 5. 博客SEO验证
```bash
npm run validate:blog-seo
```
**功能**: 专门针对博客文章的SEO检查
**检查项目**:
- 文章元数据
- 内部链接
- 关键词密度
- 图片Alt标签

## 🚀 使用流程

### 开发环境测试
1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 在新终端运行SEO检查：
   ```bash
   npm run validate:seo-full
   ```

### 部署前检查
```bash
# 完整检查清单
npm run validate:seo-full
npm run test:sitemap
npm run test:robots
npm run validate:blog-seo
```

## 📊 评分标准

### 优秀 (90-100%)
- ✅ 所有SEO配置正确
- ✅ 可以直接部署

### 良好 (75-89%)
- ⚠️ 基本配置正确
- ⚠️ 有小问题需要修复

### 一般 (60-74%)
- ❌ 存在明显问题
- ❌ 需要修复后再部署

### 需要改进 (<60%)
- ❌ 严重SEO问题
- ❌ 必须修复才能部署

## 🔧 常见问题修复

### Sitemap问题
- **XML格式错误**: 检查`app/sitemap.xml/route.ts`语法
- **URL缺失**: 确保博客文章正确加载
- **域名错误**: 检查`NEXT_PUBLIC_BASE_URL`环境变量

### Robots.txt问题
- **编码问题**: 确保UTF-8编码
- **路径错误**: 检查禁止访问的目录路径
- **Sitemap引用**: 确保正确引用sitemap.xml

### Meta标签问题
- **缺失标签**: 检查`app/layout.tsx`和页面组件
- **内容重复**: 确保每个页面有独特的meta描述
- **关键词密度**: 保持在2-4%之间

## 📈 SEO最佳实践

### 1. 内容优化
- 使用相关关键词
- 保持内容原创性
- 定期更新博客文章

### 2. 技术SEO
- 确保页面加载速度
- 使用结构化数据
- 优化图片Alt标签

### 3. 用户体验
- 响应式设计
- 清晰的导航结构
- 内部链接优化

## 🔍 调试技巧

### 查看详细错误
```bash
# 查看sitemap内容
curl http://localhost:3000/sitemap.xml

# 查看robots.txt内容  
curl http://localhost:3000/robots.txt

# 检查特定页面
curl http://localhost:3000/blog/[article-slug]
```

### 验证工具
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Schema.org Validator](https://validator.schema.org/)

## 📝 注意事项

1. **开发服务器**: 所有测试需要开发服务器运行
2. **端口配置**: 默认使用localhost:3000
3. **环境变量**: 确保正确设置域名环境变量
4. **缓存清理**: 修改后可能需要清理浏览器缓存

## 🎯 目标指标

- **SEO得分**: >90%
- **页面加载**: <3秒
- **移动友好**: 100%通过
- **结构化数据**: 无错误
- **内部链接**: 完整覆盖

---

💡 **提示**: 定期运行这些检查，特别是在添加新内容或修改SEO配置后。 