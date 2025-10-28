# Sitemap 更新说明

## 📋 更新内容

已将以下页面添加到网站 sitemap：

### 新增页面

1. **Glitter Text Generator** (优先级最高的生成器页面)
   - URL: `/generators/glitter-text`
   - Priority: 0.95
   - Change Frequency: weekly
   - 说明: 新的核心功能页面，SEO 优化完整

2. **Contact Page**
   - URL: `/contact`
   - Priority: 0.7
   - Change Frequency: monthly

3. **Privacy Policy**
   - URL: `/privacy`
   - Priority: 0.5
   - Change Frequency: yearly

4. **Terms of Service**
   - URL: `/terms`
   - Priority: 0.5
   - Change Frequency: yearly

### 已移除页面

以下页面因未完成开发而从 sitemap 中移除：
- ~~`/generators/playboi-carti-i-am-music`~~
- ~~`/generators/undertale-text-box`~~

---

## 🎯 优先级说明

### Priority 分级
- **1.0** - 首页（最高优先级）
- **0.95** - Glitter Text Generator（唯一的生成器页面，核心功能）
- **0.9** - Blog 列表页
- **0.8** - About 页面
- **0.7** - Contact 页面
- **0.5** - 法律页面（Privacy, Terms）
- **0.7-0.9** - Blog 文章（根据特征动态调整）

### 为什么 Glitter Text Generator 优先级是 0.95？
1. 完整的 SEO 优化（TDK + H 标签）
2. 2000+ 单词的高质量内容
3. 独特的功能价值
4. 目标关键词竞争力强
5. 预期流量高
6. 目前唯一完成的生成器专题页面

---

## 🔄 更新频率说明

### Change Frequency 分级
- **daily** - 首页、Blog 列表（内容频繁更新）
- **weekly** - Generator 页面（功能稳定，偶尔优化）
- **monthly** - About、Contact（信息相对固定）
- **yearly** - Privacy、Terms（法律文档，很少变动）

---

## 📊 完整 Sitemap 结构

```
网站根目录
├── / (首页) - Priority: 1.0, daily
├── /blog - Priority: 0.9, daily
├── /generators/
│   └── glitter-text - Priority: 0.95, weekly ⭐ 新增
├── /about - Priority: 0.8, monthly
├── /contact - Priority: 0.7, monthly ⭐ 新增
├── /privacy - Priority: 0.5, yearly ⭐ 新增
├── /terms - Priority: 0.5, yearly ⭐ 新增
└── /blog/[slug] - Priority: 0.7-0.9 (动态), weekly/monthly
```

---

## 🔍 Sitemap 访问方式

### 在线访问
```
https://www.bratgeneratorfree.com/sitemap.xml
```

### 本地开发访问
```
http://localhost:3001/sitemap.xml
```

---

## 🤖 搜索引擎提交

### Google Search Console
1. 登录 [Google Search Console](https://search.google.com/search-console)
2. 选择网站属性
3. 进入 "索引" → "站点地图"
4. 提交 sitemap URL: `https://www.bratgeneratorfree.com/sitemap.xml`
5. 等待 Google 抓取和索引

### Bing Webmaster Tools
1. 登录 [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. 选择网站
3. 进入 "站点地图"
4. 提交 sitemap URL: `https://www.bratgeneratorfree.com/sitemap.xml`

### 其他搜索引擎
- **Yandex**: 通过 Yandex Webmaster 提交
- **Baidu**: 通过百度站长平台提交（如果需要）

---

## 📝 Sitemap 特性

### 动态生成
- ✅ 自动包含所有博客文章
- ✅ 根据文章特征动态调整优先级
- ✅ 自动更新 lastModified 时间
- ✅ 智能计算更新频率

### 博客文章优先级算法
```typescript
let priority = 0.7; // 基础优先级
if (post.featured) priority = 0.9; // 特色文章
else if (post.tags && post.tags.length > 3) priority = 0.8; // 标签丰富
else if (post.wordCount && post.wordCount > 1000) priority = 0.75; // 长文章
```

### 更新频率算法
```typescript
const daysSincePublication = 计算发布天数;
if (daysSincePublication < 7) changeFreq = 'daily'; // 新文章
else if (daysSincePublication > 90) changeFreq = 'monthly'; // 老文章
else changeFreq = 'weekly'; // 中等文章
```

---

## 🛡️ 错误处理

### 容错机制
如果动态生成失败（例如博客数据读取错误），系统会返回基础 sitemap，包含：
- 首页
- Blog 列表
- 所有 Generator 页面
- About 页面

这确保即使出现错误，搜索引擎仍能访问核心页面。

---

## 📈 SEO 优化建议

### 1. 定期检查
- 每周检查 sitemap 是否正常生成
- 确保所有新页面都被包含
- 验证 URL 格式正确

### 2. 监控索引状态
- 在 Google Search Console 查看索引覆盖率
- 检查是否有错误或警告
- 关注索引速度

### 3. 优化策略
- 高优先级页面应该有高质量内容
- 保持更新频率与实际更新一致
- 移除已删除或重定向的页面

### 4. 性能优化
- Sitemap 已配置缓存（12小时）
- 使用 stale-while-revalidate 策略
- 压缩传输（Vary: Accept-Encoding）

---

## 🔧 技术实现

### 文件位置
```
app/sitemap.xml/route.ts
```

### 缓存策略
```typescript
'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=21600'
```
- s-maxage: 12 小时
- stale-while-revalidate: 6 小时

### 响应头
```typescript
headers: {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': '...',
  'X-Robots-Tag': 'index, follow',
  'Vary': 'Accept-Encoding',
}
```

---

## ✅ 验证清单

- [x] 添加 Glitter Text Generator 页面
- [x] 移除未完成的 Generator 页面
- [x] 添加 Contact、Privacy、Terms 页面
- [x] 设置合理的优先级
- [x] 设置合理的更新频率
- [x] 更新错误处理的基础 sitemap
- [x] 验证 XML 格式正确
- [x] 测试 sitemap 可访问性

---

## 📅 下一步行动

1. **立即**: 访问 http://localhost:3001/sitemap.xml 验证 sitemap
2. **部署后**: 提交到 Google Search Console
3. **部署后**: 提交到 Bing Webmaster Tools
4. **一周后**: 检查索引状态
5. **持续**: 监控搜索表现

---

**更新日期**: 2025-10-28
**更新状态**: ✅ 完成
**影响页面**: 新增 4 个页面到 sitemap，移除 2 个未完成页面

