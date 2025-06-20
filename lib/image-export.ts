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
  scribbleStyle?: string;
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
      // 确保字体被正确嵌入
      fontEmbedCSS: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        * {
          font-family: "Helvetica Inserat", "Arial Black", "Arial Black Condensed", "Impact", "Arial Rounded MT Bold", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
        }
      `,
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

    // 处理字体样式
    const textElements = element.querySelectorAll('*');
    textElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const computedStyle = window.getComputedStyle(htmlEl);
      
      // 确保字体渲染一致
      if (computedStyle.fontFamily) {
        originalStyles.set(htmlEl, htmlEl.style.cssText);
        htmlEl.style.fontFamily = '"Helvetica Inserat", "Arial Black", "Arial Black Condensed", "Impact", "Arial Rounded MT Bold", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
      }
    });

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
    // 设置背景色
    const backgroundColor = config.isCustomColor ? config.customColor : 
      config.bgColor === 'lime' ? '#8acf00' : '#ffffff';

    const mergedOptions: ExportOptions = {
      ...options,
      backgroundColor,
    };

    // 在导出前应用模糊效果到元素上
    const originalFilter = element.style.filter;
    if (config.blurAmount > 0) {
      element.style.filter = `blur(${config.blurAmount}px) contrast(1.3) saturate(1.0)`;
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
      // 恢复原始filter
      element.style.filter = originalFilter;
    }
  }
}

export default ImageExporter; 