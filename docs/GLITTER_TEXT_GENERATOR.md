# Glitter Text Generator

## 概述

Glitter Text Generator 是一个专业的在线闪光文字生成器，允许用户创建令人惊艳的闪光文字效果。

## 功能特性

### 核心功能

1. **文本输入** (Your Text)
   - 支持任意文本输入
   - 实时预览更新

2. **字体选择** (Text Font)
   - 15种专业字体可选
   - 包括：Arial, Arial Black, Comic Sans MS, Courier New, Georgia, Impact, Times New Roman, Trebuchet MS, Verdana, Brush Script MT, Lucida Handwriting, Papyrus, Copperplate, Palatino, Garamond

3. **文本大小** (Text Size)
   - 15个预设尺寸：12px - 120px
   - 适应不同使用场景

4. **文本角度** (Text Angle)
   - 11个角度选项：0°, 15°, 30°, 45°, 60°, 90°, 180°, 270°, 315°, 330°, 345°
   - 创造独特的视觉效果

5. **Glitter 效果选择** (Select Glitter)
   - 176+ 独特的 glitter 图案
   - 可视化选择界面
   - 实时预览效果

6. **阴影效果** (Shadow)
   - 可开关的阴影效果
   - 增强文字立体感

7. **边框效果** (Border)
   - 可开关的边框
   - 9个边框宽度选项：0px - 10px
   - 黑色边框增强对比度

8. **导出功能**
   - 高质量 PNG 格式导出
   - 800x400 像素画布
   - 一键下载

### 技术实现

- **前端框架**: Next.js 13+ with TypeScript
- **UI 组件**: Radix UI + Tailwind CSS
- **Canvas 渲染**: HTML5 Canvas API
- **图案填充**: Canvas Pattern API
- **响应式设计**: 完全自适应所有设备

## 文件结构

```
app/generators/glitter-text/
├── page.tsx              # 主页面组件
└── metadata.ts           # SEO 元数据

public/glitters/          # Glitter 图片素材
├── DCglit1.gif
├── DCglit2.gif
└── ... (176 个文件)

scripts/
└── download-glitters.js  # 素材下载脚本
```

## 使用方法

### 用户使用流程

1. 访问 `/generators/glitter-text`
2. 输入想要转换的文字
3. 从 176+ 个 glitter 效果中选择喜欢的样式
4. 自定义字体、大小、角度等参数
5. 开启/关闭阴影和边框效果
6. 点击 Download 按钮下载生成的图片

### 开发者使用

#### 下载 Glitter 素材

```bash
node scripts/download-glitters.js
```

这将从 gigaglitters.com 下载所有 176 个 glitter 图片到 `public/glitters/` 目录。

#### 本地开发

```bash
npm run dev
```

访问 `http://localhost:3000/generators/glitter-text`

## 设计特点

### UI/UX 设计

1. **专业配色**
   - 紫色到粉色渐变主题
   - 与首页风格统一的导航和底部
   - 清晰的视觉层次

2. **响应式布局**
   - 移动端优先设计
   - 平板和桌面端优化
   - Glitter 选择器自适应网格

3. **用户体验**
   - 实时预览
   - 直观的控制面板
   - 清晰的功能分组
   - 一键重置功能

### 性能优化

1. **图片加载**
   - 本地托管所有 glitter 图片
   - 避免外部依赖
   - 快速加载

2. **Canvas 优化**
   - 高效的渲染逻辑
   - 仅在参数变化时重绘
   - 使用 useEffect 管理副作用

## SEO 优化

- 完整的 metadata 配置
- 语义化 HTML 结构
- 描述性的标题和说明
- Open Graph 和 Twitter Card 支持

## 导航集成

### 首页集成

1. **顶部导航**
   - 添加了 "Generators" 链接
   - 桌面端和移动端都可访问

2. **More Creative Generators 板块**
   - 替换了原有的 "Resources & Learning Hub"
   - 突出展示 Glitter Text Generator
   - 保留其他学习资源卡片

3. **底部导航**
   - "Our Generators" 部分
   - 包含 Brat Generator 和 Glitter Text Generator

## 未来扩展

可能的功能增强：

1. 更多字体选择
2. 自定义颜色叠加
3. 动画 GIF 导出
4. 多行文本支持
5. 预设样式模板
6. 社交分享功能
7. 历史记录保存

## 技术栈

- **Next.js 13.5.1** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Radix UI** - 无障碍 UI 组件
- **Lucide React** - 图标库
- **HTML5 Canvas** - 图形渲染

## 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 许可证

MIT License

---

**创建日期**: 2025-01-28
**最后更新**: 2025-01-28
**版本**: 1.0.0

