'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, Copy, Check, Download, RefreshCw, Type, Zap, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

// 20 carefully selected underline text styles
const underlineStyles = [
  {
    id: 'underhill',
    name: 'Underhill',
    description: 'Classic single underline',
    transform: (text: string) => text.split('').map(char => char === ' ' ? ' ' : char + '\u035F').join(''),
    example: 'U͟n͟d͟e͟r͟h͟i͟l͟l͟'
  },
  {
    id: 'dashing',
    name: 'Dashing',
    description: 'Bold dash underline',
    transform: (text: string) => text.split('').map(char => char === ' ' ? ' ' : char + '\u0332').join(''),
    example: 'D̲a̲s̲h̲i̲n̲g̲'
  },
  {
    id: 'lanes',
    name: 'Lanes',
    description: 'Double line underline',
    transform: (text: string) => text.split('').map(char => char === ' ' ? ' ' : char + '\u0333').join(''),
    example: 'L̳a̳n̳e̳s̳'
  },
  {
    id: 'skyline',
    name: 'Skyline',
    description: 'Overline style',
    transform: (text: string) => text.split('').map(char => char === ' ' ? ' ' : char + '\u035E').join(''),
    example: 'S͞k͞y͞l͞i͞n͞e͞'
  },
  {
    id: 'train-tracks',
    name: 'Train Tracks',
    description: 'Double line both sides',
    transform: (text: string) => text.split('').map(char => char === ' ' ? ' ' : char + '\u035E\u035F').join(''),
    example: 'T͟͞r͟͞a͟͞i͟͞n͟͞'
  },
  {
    id: 'guidance',
    name: 'Guidance',
    description: 'Spaced underline',
    transform: (text: string) => text.split('').map(char => char === ' ' ? '  ' : char + '\u0362').join(''),
    example: 'G͢ u͢ i͢ d͢ a͢ n͢ c͢ e͢'
  },
  {
    id: 'ellipses',
    name: 'Ellipses',
    description: 'Dotted underline',
    transform: (text: string) => text.split('').map(char => char === ' ' ? ' ' : char + '\u20E8').join(''),
    example: 'E⃨l⃨l⃨i⃨p⃨s⃨e⃨s⃨'
  },
  {
    id: 'underhand',
    name: 'Underhand',
    description: 'Wavy underline',
    transform: (text: string) => text.split('').map(char => char === ' ' ? ' ' : char + '\u0330').join(''),
    example: 'Ṵn̰d̰ḛr̰h̰a̰n̰d̰'
  },
  {
    id: 'gulls',
    name: 'Gulls',
    description: 'Curved underline',
    transform: (text: string) => text.split('').map(char => char === ' ' ? ' ' : char + '\u033C').join(''),
    example: 'G̼u̼l̼l̼s̼'
  },
  {
    id: 'meow',
    name: 'Meow',
    description: 'Connected underline',
    transform: (text: string) => text.split('').map(char => char === ' ' ? ' ' : char + '\u035C').join(''),
    example: 'M͜e͜o͜w͜'
  },
  {
    id: 'jaws',
    name: 'Jaws',
    description: 'Zigzag underline',
    transform: (text: string) => text.split('').map(char => char === ' ' ? ' ' : char + '\uA671').join(''),
    example: 'J꙱a꙱w꙱s꙱'
  },
  {
    id: 'dapper-dashing',
    name: 'Dapper Dashing',
    description: 'Italic with dash',
    transform: (text: string) => {
      const italicMap: Record<string, string> = {
        'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗',
        'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡',
        'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧',
        'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽',
        'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇',
        'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍'
      };
      return text.split('').map(char => {
        if (char === ' ') return ' ';
        const italic = italicMap[char] || char;
        return italic + '\u0332';
      }).join('');
    },
    example: '𝐷̲𝑎̲𝑝̲𝑝̲𝑒̲𝑟̲'
  },
  {
    id: 'silicon-dash',
    name: 'Silicon Dash',
    description: 'Monospace with dash',
    transform: (text: string) => {
      const monoMap: Record<string, string> = {
        'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓',
        'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝',
        'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣',
        'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵', 'G': '𝙶', 'H': '𝙷', 'I': '𝙸', 'J': '𝙹',
        'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽', 'O': '𝙾', 'P': '𝙿', 'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃',
        'U': '𝚄', 'V': '𝚅', 'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉'
      };
      return text.split('').map(char => {
        if (char === ' ') return ' ';
        const mono = monoMap[char] || char;
        return mono + '\u0332';
      }).join('');
    },
    example: '𝚂̲𝚒̲𝚕̲𝚒̲𝚌̲𝚘̲𝚗̲'
  },
  {
    id: 'chic-lanes',
    name: 'Chic Lanes',
    description: 'Italic with double line',
    transform: (text: string) => {
      const chicMap: Record<string, string> = {
        'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫',
        'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵',
        'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻',
        'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑',
        'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛',
        'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡'
      };
      return text.split('').map(char => {
        if (char === ' ') return ' ';
        const chic = chicMap[char] || char;
        return chic + '\u0333';
      }).join('');
    },
    example: '𝘊̳𝘩̳𝘪̳𝘤̳'
  },
  {
    id: 'swanky-guidance',
    name: 'Swanky Guidance',
    description: 'Bold with spaced line',
    transform: (text: string) => {
      const swankyMap: Record<string, string> = {
        'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝', 'i': '𝙞', 'j': '𝙟',
        'k': '𝙠', 'l': '𝙡', 'm': '𝙢', 'n': '𝙣', 'o': '𝙤', 'p': '𝙥', 'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩',
        'u': '𝙪', 'v': '𝙫', 'w': '𝙬', 'x': '𝙭', 'y': '𝙮', 'z': '𝙯',
        'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃', 'I': '𝙄', 'J': '𝙅',
        'K': '𝙆', 'L': '𝙇', 'M': '𝙈', 'N': '𝙉', 'O': '𝙊', 'P': '𝙋', 'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏',
        'U': '𝙐', 'V': '𝙑', 'W': '𝙒', 'X': '𝙓', 'Y': '𝙔', 'Z': '𝙕'
      };
      return text.split('').map(char => {
        if (char === ' ') return ' ';
        const swanky = swankyMap[char] || char;
        return swanky + '\u0362';
      }).join('');
    },
    example: '𝙎͢𝙬͢𝙖͢𝙣͢𝙠͢𝙮͢'
  },
  {
    id: 'classic-guidance',
    name: 'Classic Guidance',
    description: 'Bold serif with line',
    transform: (text: string) => {
      const classicMap: Record<string, string> = {
        'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣',
        'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭',
        'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳',
        'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉',
        'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓',
        'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
      };
      return text.split('').map(char => {
        if (char === ' ') return ' ';
        const classic = classicMap[char] || char;
        return classic + '\u0362';
      }).join('');
    },
    example: '𝐂͢𝐥͢𝐚͢𝐬͢𝐬͢𝐢͢𝐜͢'
  },
  {
    id: 'vintage-ellipses',
    name: 'Vintage Ellipses',
    description: 'Cursive with dots',
    transform: (text: string) => {
      const vintageMap: Record<string, string> = {
        'a': '𝒂', 'b': '𝒃', 'c': '𝒄', 'd': '𝒅', 'e': '𝒆', 'f': '𝒇', 'g': '𝒈', 'h': '𝒉', 'i': '𝒊', 'j': '𝒋',
        'k': '𝒌', 'l': '𝒍', 'm': '𝒎', 'n': '𝒏', 'o': '𝒐', 'p': '𝒑', 'q': '𝒒', 'r': '𝒓', 's': '𝒔', 't': '𝒕',
        'u': '𝒖', 'v': '𝒗', 'w': '𝒘', 'x': '𝒙', 'y': '𝒚', 'z': '𝒛',
        'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮', 'H': '𝑯', 'I': '𝑰', 'J': '𝑱',
        'K': '𝑲', 'L': '𝑳', 'M': '𝑴', 'N': '𝑵', 'O': '𝑶', 'P': '𝑷', 'Q': '𝑸', 'R': '𝑹', 'S': '𝑺', 'T': '𝑻',
        'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿', 'Y': '𝒀', 'Z': '𝒁'
      };
      return text.split('').map(char => {
        if (char === ' ') return ' ';
        const vintage = vintageMap[char] || char;
        return vintage + '\u20E8';
      }).join('');
    },
    example: '𝑽⃨𝒊⃨𝒏⃨𝒕⃨𝒂⃨𝒈⃨𝒆⃨'
  },
  {
    id: 'swanky-underhand',
    name: 'Swanky Underhand',
    description: 'Bold with wavy line',
    transform: (text: string) => {
      const swankyMap: Record<string, string> = {
        'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝', 'i': '𝙞', 'j': '𝙟',
        'k': '𝙠', 'l': '𝙡', 'm': '𝙢', 'n': '𝙣', 'o': '𝙤', 'p': '𝙥', 'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩',
        'u': '𝙪', 'v': '𝙫', 'w': '𝙬', 'x': '𝙭', 'y': '𝙮', 'z': '𝙯',
        'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃', 'I': '𝙄', 'J': '𝙅',
        'K': '𝙆', 'L': '𝙇', 'M': '𝙈', 'N': '𝙉', 'O': '𝙊', 'P': '𝙋', 'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏',
        'U': '𝙐', 'V': '𝙑', 'W': '𝙒', 'X': '𝙓', 'Y': '𝙔', 'Z': '𝙕'
      };
      return text.split('').map(char => {
        if (char === ' ') return ' ';
        const swanky = swankyMap[char] || char;
        return swanky + '\u0330';
      }).join('');
    },
    example: '𝙎̰𝙬̰𝙖̰𝙣̰𝙠̰𝙮̰'
  },
  {
    id: 'dapper-gulls',
    name: 'Dapper Gulls',
    description: 'Italic with curved line',
    transform: (text: string) => {
      const dapperMap: Record<string, string> = {
        'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗',
        'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡',
        'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧',
        'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽',
        'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇',
        'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍'
      };
      return text.split('').map(char => {
        if (char === ' ') return ' ';
        const dapper = dapperMap[char] || char;
        return dapper + '\u033C';
      }).join('');
    },
    example: '𝐷̼𝑎̼𝑝̼𝑝̼𝑒̼𝑟̼'
  },
  {
    id: 'silicon-meow',
    name: 'Silicon Meow',
    description: 'Monospace connected',
    transform: (text: string) => {
      const monoMap: Record<string, string> = {
        'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓',
        'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝',
        'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣',
        'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵', 'G': '𝙶', 'H': '𝙷', 'I': '𝙸', 'J': '𝙹',
        'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽', 'O': '𝙾', 'P': '𝙿', 'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃',
        'U': '𝚄', 'V': '𝚅', 'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉'
      };
      return text.split('').map(char => {
        if (char === ' ') return ' ';
        const mono = monoMap[char] || char;
        return mono + '\u035C';
      }).join('');
    },
    example: '𝚂͜𝚒͜𝚕͜𝚒͜𝚌͜𝚘͜𝚗͜'
  }
];

export default function UnderlineTextGenerator() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [inputText, setInputText] = useState('Underline Text');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [transformedTexts, setTransformedTexts] = useState<Record<string, string>>({});

  // Transform text for all styles
  useEffect(() => {
    const transformed: Record<string, string> = {};
    underlineStyles.forEach(style => {
      transformed[style.id] = style.transform(inputText);
    });
    setTransformedTexts(transformed);
  }, [inputText]);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadAsText = () => {
    const content = underlineStyles.map(style => 
      `${style.name}: ${transformedTexts[style.id]}`
    ).join('\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `underline-text-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <Sparkles className="w-8 h-8 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
              <span className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                Brat Generator
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-indigo-600 transition-colors">
                HOME
              </Link>
              <Link href="/generators" className="text-slate-900 font-medium hover:text-indigo-600 transition-colors">
                Generators
              </Link>
              <Link href="/blog" className="text-slate-600 hover:text-indigo-600 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-indigo-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-slate-600 hover:text-indigo-600 transition-colors">
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-600" />
              ) : (
                <Menu className="w-6 h-6 text-slate-600" />
              )}
            </button>
          </nav>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-200">
              <div className="flex flex-col space-y-4 pt-4">
                <Link href="/" className="text-slate-600 hover:text-indigo-600 transition-colors py-2">
                  HOME
                </Link>
                <Link href="/generators" className="text-slate-900 font-medium py-2">
                  Generators
                </Link>
                <Link href="/blog" className="text-slate-600 hover:text-indigo-600 transition-colors py-2">
                  Blog
                </Link>
                <Link href="/about" className="text-slate-600 hover:text-indigo-600 transition-colors py-2">
                  About
                </Link>
                <Link href="/contact" className="text-slate-600 hover:text-indigo-600 transition-colors py-2">
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            <span>20 Premium Underline Text Styles</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Underline Text Generator - Free Online Tool
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mt-2">
              U͟n͟d͟e͟r͟l͟i͟n͟e͟ ͟Y͟o͟u͟r͟ ͟T͟e͟x͟t͟ ͟I͟n͟s͟t͟a͟n͟t͟l͟y͟
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Create stunning underline text with our free underline text generator. Transform plain text into
            eye-catching underlined text for Instagram, Twitter, Discord, and more. Generate underline text
            styles instantly with one-click copy & paste - no signup required!
          </p>
        </section>

        {/* Input Section */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm mb-12 shadow-lg border-2 border-indigo-100">
          <div className="max-w-2xl mx-auto">
            <Label htmlFor="input-text" className="text-lg font-semibold text-slate-900 mb-3 block flex items-center gap-2">
              <Type className="w-5 h-5 text-indigo-600" />
              Enter Your Text
            </Label>
            <div className="flex gap-3">
              <Input
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your text here..."
                className="text-lg h-14 border-2 border-indigo-200 focus:border-indigo-500"
              />
              <Button
                onClick={() => setInputText('Underline Text')}
                variant="outline"
                className="h-14 px-6 border-2 hover:bg-indigo-50"
              >
                <RefreshCw className="w-5 h-5" />
              </Button>
            </div>
            <div className="mt-4 flex gap-3">
              <Button
                onClick={downloadAsText}
                className="flex-1 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold"
              >
                <Download className="w-5 h-5 mr-2" />
                Download All Styles
              </Button>
            </div>
          </div>
        </Card>

        {/* Styles Grid */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3 flex items-center justify-center gap-3">
              <Zap className="w-8 h-8 text-yellow-500" />
              20 Underline Text Styles - Free Underline Generator
            </h2>
            <p className="text-slate-600 text-lg">
              Click any underline text style to copy it instantly to your clipboard. Our underline text generator
              makes it easy to create beautiful underlined text for any platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {underlineStyles.map((style) => (
              <Card
                key={style.id}
                className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-slate-100 hover:border-indigo-300 cursor-pointer"
                onClick={() => copyToClipboard(transformedTexts[style.id], style.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-1">{style.name}</h3>
                      <p className="text-sm text-slate-500">{style.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {copiedId === style.id ? (
                        <div className="bg-green-100 text-green-700 p-2 rounded-lg">
                          <Check className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="bg-indigo-100 text-indigo-700 p-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Copy className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-lg p-4 min-h-[80px] flex items-center justify-center">
                    <p className="text-2xl font-medium text-center break-all select-all">
                      {transformedTexts[style.id]}
                    </p>
                  </div>

                  <div className="mt-3 text-xs text-slate-400 text-center">
                    Click to copy
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/5 group-hover:to-purple-600/5 transition-all pointer-events-none" />
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose Our Free Underline Text Generator?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The most comprehensive and user-friendly underline text generator with premium underline text
              styles. Create professional underlined text for free with our online underline generator.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-xl transition-all border-2 border-slate-100 hover:border-indigo-200">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">20 Premium Underline Text Styles</h3>
              <p className="text-slate-600 leading-relaxed">
                Carefully curated collection of 20 unique underline text styles, from classic single underline text to
                decorative underlined text patterns. Each underline style is optimized for maximum compatibility across
                all social media platforms. Generate underline text that works everywhere!
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-all border-2 border-slate-100 hover:border-purple-200">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Copy className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">One-Click Underline Text Copy</h3>
              <p className="text-slate-600 leading-relaxed">
                Instantly copy any underlined text style with a single click. Our underline text generator
                makes it effortless - no complicated steps, no manual selection. Just click any underline text
                and paste it wherever you need beautiful underlined text!
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-all border-2 border-slate-100 hover:border-pink-200">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Universal Underline Text Compatibility</h3>
              <p className="text-slate-600 leading-relaxed">
                Our underline text generator works perfectly on Instagram, Twitter, Facebook, Discord, WhatsApp,
                and all major platforms. Generate underline text using Unicode characters for maximum compatibility.
                Your underlined text will display correctly everywhere!
              </p>
            </Card>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mb-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              How to Use Our Free Underline Text Generator
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Create stunning underline text in just 3 simple steps with our underline text generator.
              Generate beautiful underlined text for free!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="font-bold text-slate-900 mb-3 text-xl">Type Your Text to Underline</h3>
              <p className="text-slate-600 leading-relaxed">
                Enter any text you want to underline in the input field. Our underline text generator will
                instantly transform your text into all 20 beautiful underline text styles. Generate underline
                text in real-time!
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="font-bold text-slate-900 mb-3 text-xl">Choose Your Underline Text Style</h3>
              <p className="text-slate-600 leading-relaxed">
                Browse through 20 beautiful underline text styles and pick the underlined text that matches
                your vibe. Each underline style has a unique character. Our underline text generator offers
                styles for every occasion!
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="font-bold text-slate-900 mb-3 text-xl">Copy & Paste Underline Text</h3>
              <p className="text-slate-600 leading-relaxed">
                Click any underline text style card to copy your underlined text instantly. Then paste your
                underline text anywhere - social media posts, messages, documents, or websites. Our underline
                text generator makes it that easy!
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Underline Text Generator - Perfect For Every Occasion
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our underline text generator helps you create underlined text that adds emphasis and style to
              your content across all platforms. Generate underline text for any purpose!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-indigo-500">
              <h3 className="text-xl font-bold text-slate-900 mb-3">📱 Underline Text for Social Media</h3>
              <p className="text-slate-600 mb-3">
                Use our underline text generator to make your Instagram captions, Twitter posts, and Facebook
                updates stand out. Create eye-catching underlined text that catches attention with our free
                underline generator!
              </p>
              <div className="bg-indigo-50 rounded-lg p-3 text-sm">
                <span className="text-indigo-700 font-medium">Underline Text Example:</span> "C͟h͟e͟c͟k͟ ͟o͟u͟t͟ ͟m͟y͟ ͟n͟e͟w͟ ͟p͟o͟s͟t͟!"
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-slate-900 mb-3">💬 Underline Text for Messaging</h3>
              <p className="text-slate-600 mb-3">
                Generate underline text for WhatsApp, Discord, and Telegram messages. Our underline text
                generator helps you add personality with unique underlined text styles that express your mood.
                Create underline text that stands out!
              </p>
              <div className="bg-purple-50 rounded-lg p-3 text-sm">
                <span className="text-purple-700 font-medium">Underline Text Example:</span> "I̲m̲p̲o̲r̲t̲a̲n̲t̲ ̲m̲e̲s̲s̲a̲g̲e̲!"
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-pink-500">
              <h3 className="text-xl font-bold text-slate-900 mb-3">✨ Profile Bios</h3>
              <p className="text-slate-600 mb-3">
                Create eye-catching profile bios and usernames that make you memorable on any
                social platform or gaming community.
              </p>
              <div className="bg-pink-50 rounded-lg p-3 text-sm">
                <span className="text-pink-700 font-medium">Example:</span> "D̳e̳s̳i̳g̳n̳e̳r̳ ̳&̳ ̳C̳r̳e̳a̳t̳o̳r̳"
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-rose-500">
              <h3 className="text-xl font-bold text-slate-900 mb-3">🎨 Creative Projects</h3>
              <p className="text-slate-600 mb-3">
                Enhance your designs, presentations, and creative work with decorative underlined
                text that adds a professional touch.
              </p>
              <div className="bg-rose-50 rounded-lg p-3 text-sm">
                <span className="text-rose-700 font-medium">Example:</span> "P͞r͞o͞j͞e͞c͞t͞ ͞T͞i͞t͞l͞e͞"
              </div>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Underline Text Generator - Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Learn more about our free underline text generator and how to create perfect underlined text
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-slate-900 mb-2 text-lg">
                How does our free underline text generator work?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Our underline text generator uses Unicode combining characters to create underline text. These
                special characters are universally supported across all platforms and devices, ensuring your
                underlined text displays correctly everywhere. Generate underline text that works on any platform!
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-slate-900 mb-2 text-lg">
                Can I use underline text on Instagram and other social media?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Yes! Our underline text generator creates underlined text that works perfectly on Instagram,
                Twitter, Facebook, TikTok, Discord, WhatsApp, and virtually all social media platforms. Simply
                generate underline text and copy-paste it anywhere. Our underline text is universally compatible!
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-slate-900 mb-2 text-lg">
                Is the underline text generator free to use?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Absolutely! Our underline text generator is 100% free with no hidden costs, no registration
                required, and no limits on usage. Generate as much underlined text as you need!
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-slate-900 mb-2 text-lg">
                Will underlined text work on mobile devices?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Yes! Our underline styles are fully compatible with iOS, Android, and all mobile platforms.
                The text will display correctly on smartphones, tablets, and desktop computers.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-slate-900 mb-2 text-lg">
                Can I combine different underline styles?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                While you can't mix styles on the same character, you can use different styles for different
                words in your text. Simply generate each word separately and combine them manually.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-slate-900 mb-2 text-lg">
                What's the difference between the various underline styles?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Each style uses different Unicode combining characters to create unique visual effects - from
                simple single lines to double lines, wavy lines, dotted patterns, and decorative combinations.
                Some styles also change the font style for added variety.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Amazing Underline Text?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
            Start using our free underline text generator now and create stunning underlined text that makes
            your content stand out! Generate underline text for free with 20+ premium styles.
          </p>
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold text-lg px-8 py-6 h-auto"
          >
            Generate Underline Text Now
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-indigo-400" />
                <span className="font-bold text-lg">Brat Generator</span>
              </div>
              <p className="text-slate-400 text-sm">
                Create stunning text effects with our free online generators. No signup required!
              </p>
            </div>

            <div>
              <div className="font-semibold mb-4">Generators</div>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Brat Generator
                  </Link>
                </li>
                <li>
                  <Link href="/generators/glitter-text" className="hover:text-white transition-colors">
                    Glitter Text
                  </Link>
                </li>
                <li>
                  <Link href="/generators/underline-text" className="hover:text-white transition-colors">
                    Underline Text
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold mb-4">Resources</div>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold mb-4">Legal</div>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2025 Brat Generator. All rights reserved. Create stunning text effects for free!</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

