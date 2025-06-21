import { toPng, toJpeg, toSvg, toBlob } from 'html-to-image';

export interface ExportOptions {
  quality?: number;
  pixelRatio?: number;
  backgroundColor?: string;
  width?: number;
  height?: number;
  style?: Record<string, string>;
  cacheBust?: boolean;
}

// html-to-image库的选项接口
interface HtmlToImageOptions {
  quality?: number;
  pixelRatio?: number;
  backgroundColor?: string;
  width?: number;
  height?: number;
  style?: Record<string, string>;
  cacheBust?: boolean;
  fontEmbedCSS?: string;
  [key: string]: any; // 允许其他选项
}

export interface BratConfig {
  text: string;
  bgColor: string;
  customColor?: string;
  isCustomColor?: boolean;
  fontSize: number;
  borderRadius: number;
  textAlign: 'left' | 'center' | 'right';
  flipHorizontal: boolean;
  flipVertical: boolean;
  blurAmount: number;
  scribbleStyle?: 'classic' | 'mirror' | 'texture' | 'scribble';
}

export type ExportFormat = 'png' | 'jpeg' | 'svg' | 'blob';

export class ImageExporter {
  private static get defaultOptions(): ExportOptions {
    // 确保只在客户端访问window对象
    const pixelRatio = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
    
    return {
      quality: 1.0,
      pixelRatio,
      cacheBust: true,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
      }
    };
  }

  /**
   * 统一的图像导出方法
   * @param element - 需要导出的DOM元素
   * @param format - 导出格式
   * @param options - 导出选项
   * @returns Promise<string | Blob> - 根据格式返回Data URL或Blob
   */
  static async exportImage(
    element: HTMLElement,
    format: ExportFormat,
    options: ExportOptions = {}
  ): Promise<string | Blob> {
    // 确保只在客户端执行
    if (typeof window === 'undefined') {
      throw new Error('Image export is only available on the client side');
    }

    // 等待DOM和字体加载完成
    await this.waitForReady();

    const defaultOpts = this.defaultOptions;

    // 合并选项 - 符合html-to-image的Options接口
    const mergedOptions: HtmlToImageOptions = {
      quality: options.quality || defaultOpts.quality,
      pixelRatio: options.pixelRatio || defaultOpts.pixelRatio,
      backgroundColor: options.backgroundColor,
      width: options.width,
      height: options.height,
      style: options.style || defaultOpts.style,
      cacheBust: options.cacheBust !== undefined ? options.cacheBust : defaultOpts.cacheBust,
      // 移除强制字体嵌入，让预设样式的字体设置生效
    };

    // 临时应用样式以确保渲染一致性
    const originalStyles = await this.applyTemporaryStyles(element, options);

    try {
      let result: string | Blob;

      switch (format) {
        case 'png':
          result = await toPng(element, mergedOptions);
          break;
        case 'jpeg':
          result = await toJpeg(element, {
            ...mergedOptions,
            quality: options.quality || 0.95
          });
          break;
        case 'svg':
          result = await toSvg(element, mergedOptions);
          break;
        case 'blob':
          const blobResult = await toBlob(element, mergedOptions);
          if (!blobResult) throw new Error('Failed to generate blob');
          result = blobResult;
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }

      return result;
    } finally {
      // 恢复原始样式
      this.restoreStyles(element, originalStyles);
    }
  }

  /**
   * 等待DOM和字体就绪
   */
  private static async waitForReady(): Promise<void> {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // 等待字体加载
    await document.fonts.ready;
    
    // 等待DOM渲染完成
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 确保所有图片都已加载
    const images = document.querySelectorAll('img');
    await Promise.all(
      Array.from(images).map(img => {
        return new Promise((resolve) => {
          if (img.complete) {
            resolve(null);
          } else {
            img.addEventListener('load', () => resolve(null));
            img.addEventListener('error', () => resolve(null));
          }
        });
      })
    );
  }

  /**
   * 应用临时样式以确保渲染一致性
   */
  private static async applyTemporaryStyles(
    element: HTMLElement,
    options: ExportOptions
  ): Promise<Map<HTMLElement, string>> {
    const originalStyles = new Map<HTMLElement, string>();

    // 保存并应用根元素样式
    originalStyles.set(element, element.style.cssText);
    
    if (options.style) {
      Object.entries(options.style).forEach(([key, value]) => {
        (element.style as any)[key] = value;
      });
    }

    // 不再强制覆盖字体样式，让预设样式生效
    // 只处理字体加载确保，不改变字体族
    return originalStyles;
  }

  /**
   * 恢复原始样式
   */
  private static restoreStyles(
    element: HTMLElement,
    originalStyles: Map<HTMLElement, string>
  ): void {
    originalStyles.forEach((cssText, el) => {
      el.style.cssText = cssText;
    });
  }

  /**
   * 生成文件名
   */
  static generateFilename(text: string, format: ExportFormat): string {
    const cleanText = text
      .replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g, '-')
      .toLowerCase()
      .substring(0, 20) || 'cover';

    const extensions: Record<ExportFormat, string> = {
      png: 'png',
      jpeg: 'jpg',
      svg: 'svg',
      blob: 'png' // Blob通常保存为PNG
    };

    return `brat-${cleanText}.${extensions[format]}`;
  }

  /**
   * 下载文件
   */
  static downloadFile(
    data: string | Blob,
    filename: string,
    format: ExportFormat
  ): void {
    let downloadUrl: string;
    
    if (data instanceof Blob) {
      downloadUrl = URL.createObjectURL(data);
    } else {
      downloadUrl = data;
    }

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    
    // 清理
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      if (data instanceof Blob) {
        URL.revokeObjectURL(downloadUrl);
      }
    }, 1000);
  }

  /**
   * 完整的导出和下载流程
   */
  static async exportAndDownload(
    element: HTMLElement,
    format: ExportFormat,
    config: BratConfig,
    options: ExportOptions = {}
  ): Promise<string> {
    // 设置背景色 - 根据预设样式决定
    let backgroundColor: string;
    if (config.scribbleStyle === 'texture') {
      // Paper模式强制白色背景
      backgroundColor = '#ffffff';
    } else {
      // 其他模式使用用户选择的颜色
      backgroundColor = config.isCustomColor && config.customColor ? config.customColor : 
        ({
          lime: '#8acf00',
          white: '#ffffff', 
          black: '#000000',
          pink: '#f472b6',
          blue: '#60a5fa',
          purple: '#a78bfa',
          orange: '#fb923c',
          red: '#f87171',
        }[config.bgColor] || '#8acf00');
    }

    const mergedOptions: ExportOptions = {
      ...options,
      backgroundColor,
      // 在导出选项中也添加圆角样式
      style: {
        ...options.style,
        borderRadius: `${config.borderRadius}px`,
        overflow: 'hidden',
        WebkitBorderRadius: `${config.borderRadius}px`,
        MozBorderRadius: `${config.borderRadius}px`,
        // 根据预设样式添加特殊背景效果
        ...(config.scribbleStyle === 'texture' && {
          backgroundImage: `
            linear-gradient(0deg, rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          filter: 'contrast(1.0) brightness(1.0)',
        }),
      }
    };

    // 在导出前应用样式到元素上
    const originalFilter = element.style.filter;
    const originalBorderRadius = element.style.borderRadius;
    const originalOverflow = element.style.overflow;
    const originalBackgroundImage = element.style.backgroundImage;
    const originalBackgroundSize = element.style.backgroundSize;
    
    // 处理Mirror模式的文字内容
    let originalTextContent: string | null = null;
    let originalFontFamily: string = '';
    let originalFontWeight: string = '';
    let originalTextAlign: string = '';
    
    if (config.scribbleStyle === 'mirror') {
      const textElement = element.querySelector('.font-black') as HTMLElement;
      if (textElement) {
        originalTextContent = textElement.textContent;
        originalFontFamily = textElement.style.fontFamily;
        originalFontWeight = textElement.style.fontWeight;
        originalTextAlign = textElement.style.textAlign;
        
        // 应用字母反转效果
        const mirrorText = (config.text || '').split('\n').map(line => 
          line.split(' ').map(word => 
            word.split('').reverse().join('')
          ).join(' ')
        ).join('\n').toLowerCase();
        textElement.textContent = mirrorText;
        
        // 应用Mirror模式的字体样式
        textElement.style.fontFamily = '"Helvetica Neue", "Arial", "Segoe UI", Roboto, sans-serif';
        textElement.style.fontWeight = '400';
        textElement.style.textAlign = 'right';
      }
    } else if (config.scribbleStyle === 'texture') {
      const textElement = element.querySelector('.font-black') as HTMLElement;
      if (textElement) {
        originalFontFamily = textElement.style.fontFamily;
        originalFontWeight = textElement.style.fontWeight;
        originalTextAlign = textElement.style.textAlign;
        
        // 应用Paper模式的字体样式
        textElement.style.fontFamily = '"Helvetica Neue", "Arial", "Segoe UI", Roboto, sans-serif';
        textElement.style.fontWeight = '400';
        textElement.style.textAlign = 'justify';
        textElement.style.color = '#000000';
      }
    }
    
    // 应用模糊效果
    if (config.blurAmount > 0) {
      element.style.filter = `blur(${config.blurAmount}px) contrast(1.3) saturate(1.0)`;
    }
    
    // 应用边框半径
    if (config.borderRadius > 0) {
      element.style.borderRadius = `${config.borderRadius}px`;
      element.style.overflow = 'hidden';
      element.style.setProperty('-webkit-border-radius', `${config.borderRadius}px`);
      element.style.setProperty('-moz-border-radius', `${config.borderRadius}px`);
    }

    // 应用Paper模式的背景纹理
    if (config.scribbleStyle === 'texture') {
      element.style.backgroundImage = `
        linear-gradient(0deg, rgba(0,0,0,0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
      `;
      element.style.backgroundSize = '20px 20px';
    }

    try {
      // 导出图像
      const imageData = await this.exportImage(element, format, mergedOptions);
      
      // 生成文件名并下载
      const filename = this.generateFilename(config.text, format);
      this.downloadFile(imageData, filename, format);

      // 返回PNG格式的数据用于分享（如果当前格式不是PNG）
      if (format !== 'png') {
        const pngData = await this.exportImage(element, 'png', mergedOptions);
        return pngData as string;
      }

      return imageData as string;
    } finally {
      // 恢复原始样式
      element.style.filter = originalFilter;
      element.style.borderRadius = originalBorderRadius;
      element.style.overflow = originalOverflow;
      element.style.backgroundImage = originalBackgroundImage;
      element.style.backgroundSize = originalBackgroundSize;
      // 清理webkit和moz前缀
      element.style.removeProperty('-webkit-border-radius');
      element.style.removeProperty('-moz-border-radius');
      
      // 恢复Mirror模式的原始文字内容
      if (config.scribbleStyle === 'mirror' && originalTextContent !== null) {
        const textElement = element.querySelector('.font-black') as HTMLElement;
        if (textElement) {
          textElement.textContent = originalTextContent;
          textElement.style.fontFamily = originalFontFamily;
          textElement.style.fontWeight = originalFontWeight;
          textElement.style.textAlign = originalTextAlign;
        }
      } else if (config.scribbleStyle === 'texture') {
        const textElement = element.querySelector('.font-black') as HTMLElement;
        if (textElement) {
          textElement.style.fontFamily = originalFontFamily;
          textElement.style.fontWeight = originalFontWeight;
          textElement.style.textAlign = originalTextAlign;
        }
      }
    }
  }
}

export default ImageExporter; 