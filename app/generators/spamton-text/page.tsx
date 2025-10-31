'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Sparkles, Download, Menu, X, Copy, Check, Zap, Star, ChevronRight, RefreshCw, DollarSign, Shuffle, Wand2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

// Spamton conversion modes
const CONVERSION_MODES = [
  {
    id: 'classic',
    name: 'Classic Spamton',
    description: 'Original Spamton G. Spamton style with brackets and caps',
    icon: Star,
    example: '[[ BIG SHOT ]] SPECIAL DEAL FOR YOU!!'
  },
  {
    id: 'salesman',
    name: 'Salesman Mode',
    description: 'Heavy on sales pitch and dollar signs',
    icon: DollarSign,
    example: 'HEY EVERY !! ITS ME!!! $$$'
  },
  {
    id: 'chaos',
    name: 'Chaos Mode',
    description: 'Maximum chaos with random caps and symbols',
    icon: Zap,
    example: 'nOW\'S yOUR cHANCE tO bE A [[BIG SHOT]]!!'
  },
  {
    id: 'pipis',
    name: 'Pipis Mode',
    description: 'Includes random PIPIS references',
    icon: Sparkles,
    example: 'GET YOUR [Hyperlink Blocked] AND PIPIS!!'
  }
];

// Spamton-style replacements
const SPAMTON_REPLACEMENTS: Record<string, string[]> = {
  'you': ['YOU', 'U', 'YO U'],
  'your': ['YOUR', 'UR', 'YO UR'],
  'now': ['NOW', 'N0W', 'NOWS'],
  'big': ['BIG', 'B1G', '[[BIG]]'],
  'deal': ['DEAL', 'D3AL', '[DEAL OF THE CENTURY]'],
  'free': ['FREE', 'FR33', '[COMPLIMENTARY]'],
  'money': ['MONEY', 'M0NEY', 'KROMER', '$$$'],
  'friend': ['FRIEND', 'FR1END', '[VALUED CUSTOMER]'],
  'help': ['HELP', 'H3LP', '[ASSISTANCE]'],
  'please': ['PLEASE', 'PL3ASE', 'PLS'],
  'yes': ['YES', 'Y3S', 'YEAH'],
  'no': ['NO', 'N0', 'NOPE'],
  'the': ['THE', 'TH3', 'DA'],
  'and': ['AND', '&', 'N'],
  'is': ['IS', '1S', 'IZ'],
  'are': ['ARE', 'R', 'AR'],
  'be': ['BE', 'B', 'B3'],
  'to': ['TO', '2', 'T0'],
  'for': ['FOR', '4', 'F0R'],
  'of': ['OF', '0F', 'UV'],
  'a': ['A', '@', '4'],
  'it': ['IT', '1T', 'I7'],
  'that': ['THAT', 'TH@T', 'DAT'],
  'this': ['THIS', 'TH1S', 'DIS'],
  'with': ['WITH', 'W1TH', 'WIT'],
  'have': ['HAVE', 'H4VE', 'HAV'],
  'from': ['FROM', 'FR0M', 'FRUM'],
  'they': ['THEY', 'TH3Y', 'DEY'],
  'will': ['WILL', 'W1LL', 'WIL'],
  'would': ['WOULD', 'W0ULD', 'WUD'],
  'can': ['CAN', 'C4N', 'KAN'],
  'get': ['GET', 'G3T', 'GIT'],
  'all': ['ALL', '@LL', 'AL'],
  'my': ['MY', 'M1', 'MAI'],
  'me': ['ME', 'M3', 'MEE'],
  'one': ['ONE', '1', 'WUN'],
  'time': ['TIME', 'T1ME', 'TYM'],
  'like': ['LIKE', 'L1KE', 'LYK'],
  'just': ['JUST', 'JU5T', 'JUS'],
  'know': ['KNOW', 'KN0W', 'NO'],
  'take': ['TAKE', 'T4KE', 'TAK'],
  'people': ['PEOPLE', 'P30PLE', 'PPL'],
  'into': ['INTO', '1NTO', 'IN2'],
  'year': ['YEAR', 'Y3AR', 'YR'],
  'good': ['GOOD', 'G00D', 'GUD'],
  'some': ['SOME', 'S0ME', 'SUM'],
  'could': ['COULD', 'C0ULD', 'CUD'],
  'them': ['THEM', 'TH3M', 'DEM'],
  'see': ['SEE', 'S33', 'C'],
  'other': ['OTHER', '0THER', 'UDDER'],
  'than': ['THAN', 'TH4N', 'DAN'],
  'then': ['THEN', 'TH3N', 'DEN'],
  'look': ['LOOK', 'L00K', 'LUK'],
  'only': ['ONLY', '0NLY', 'ONLI'],
  'come': ['COME', 'C0ME', 'CUM'],
  'its': ['ITS', '1TS', 'ITZ'],
  'over': ['OVER', '0VER', 'OVAH'],
  'think': ['THINK', 'TH1NK', 'TINK'],
  'also': ['ALSO', '@LSO', 'AWSO'],
  'back': ['BACK', 'B4CK', 'BAK'],
  'after': ['AFTER', '@FTER', 'AFTA'],
  'use': ['USE', 'US3', 'UZE'],
  'two': ['TWO', 'TW0', '2'],
  'how': ['HOW', 'H0W', 'HAO'],
  'our': ['OUR', '0UR', 'R'],
  'work': ['WORK', 'W0RK', 'WURK'],
  'first': ['FIRST', 'F1RST', '1ST'],
  'well': ['WELL', 'W3LL', 'WEL'],
  'way': ['WAY', 'W4Y', 'WAI'],
  'even': ['EVEN', '3VEN', 'EVIN'],
  'new': ['NEW', 'N3W', 'NU'],
  'want': ['WANT', 'W4NT', 'WUNT'],
  'because': ['BECAUSE', 'B3CAUSE', 'CUZ'],
  'any': ['ANY', '@NY', 'ENY'],
  'these': ['THESE', 'TH3SE', 'DEEZ'],
  'give': ['GIVE', 'G1VE', 'GIV'],
  'day': ['DAY', 'D4Y', 'DAI'],
  'most': ['MOST', 'M0ST', 'MOAST'],
  'us': ['US', 'U5', 'UZ']
};

const SPAMTON_PHRASES = [
  '[[ BIG SHOT ]]',
  '[Hyperlink Blocked]',
  'PIPIS',
  'KROMER',
  'HEY EVERY !!',
  'NOWS YOUR CHANCE TO BE A',
  '[DEALS DEALS DEALS]',
  '[SPECIL OFFER]',
  '[NUMBER 1 RATED SALESMAN1997]',
  '[VALUED CUSTOMER]',
  '[HEART-SHAPED OBJECT]',
  '[Commemorative Ring]',
  '[SIDE CHICK]',
  '[LITTLE SPONGE]',
  '[Fifty Percent Off]',
  '[AMAZING DEALS]',
  '[KEYGEN]',
  '[FREEDOM SAUCE]',
  '[COMMUNION]',
  '[HEAVEN]'
];

export default function SpamtonTextGenerator() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [inputText, setInputText] = useState('Now is your chance to be a big shot!');
  const [outputText, setOutputText] = useState('');
  const [selectedMode, setSelectedMode] = useState('classic');
  const [copied, setCopied] = useState(false);
  const [intensity, setIntensity] = useState(50);

  // Convert text to Spamton style
  const convertToSpamton = useCallback((text: string, mode: string, intensityLevel: number): string => {
    if (!text) return '';

    let result = text;
    const words = result.split(/\s+/);
    const processedWords: string[] = [];

    words.forEach((word, index) => {
      const lowerWord = word.toLowerCase().replace(/[^a-z]/g, '');
      const punctuation = word.match(/[^a-z0-9]/gi)?.join('') || '';
      
      // Apply replacements based on intensity
      if (SPAMTON_REPLACEMENTS[lowerWord] && Math.random() * 100 < intensityLevel) {
        const replacements = SPAMTON_REPLACEMENTS[lowerWord];
        const replacement = replacements[Math.floor(Math.random() * replacements.length)];
        processedWords.push(replacement + punctuation);
      } else {
        // Random capitalization based on mode
        let processedWord = word;
        
        if (mode === 'chaos') {
          processedWord = word.split('').map(c => 
            Math.random() < 0.5 ? c.toUpperCase() : c.toLowerCase()
          ).join('');
        } else if (mode === 'classic' || mode === 'salesman') {
          processedWord = Math.random() < 0.3 ? word.toUpperCase() : word;
        }
        
        processedWords.push(processedWord);
      }

      // Add Spamton phrases randomly based on mode and intensity
      if (mode === 'pipis' && Math.random() * 100 < intensityLevel / 3) {
        processedWords.push(SPAMTON_PHRASES[Math.floor(Math.random() * SPAMTON_PHRASES.length)]);
      } else if (mode === 'salesman' && Math.random() * 100 < intensityLevel / 4) {
        const salesPhrases = ['!!', '$$$', '[DEAL]', '[SPECIAL]'];
        processedWords.push(salesPhrases[Math.floor(Math.random() * salesPhrases.length)]);
      } else if (mode === 'classic' && index % 5 === 0 && Math.random() < 0.3) {
        processedWords.push('!!');
      }
    });

    result = processedWords.join(' ');

    // Add brackets for classic mode
    if (mode === 'classic' && Math.random() < 0.2) {
      const bracketPhrases = ['BIG SHOT', 'DEALS', 'SPECIL'];
      const phrase = bracketPhrases[Math.floor(Math.random() * bracketPhrases.length)];
      result = result.replace(new RegExp(phrase, 'gi'), `[[ ${phrase} ]]`);
    }

    return result;
  }, []);

  // Update output when input or settings change
  useEffect(() => {
    const converted = convertToSpamton(inputText, selectedMode, intensity);
    setOutputText(converted);
  }, [inputText, selectedMode, intensity, convertToSpamton]);

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Regenerate with same settings
  const handleRegenerate = () => {
    const converted = convertToSpamton(inputText, selectedMode, intensity);
    setOutputText(converted);
  };

  // Load example text
  const loadExample = (example: string) => {
    setInputText(example);
  };

  const exampleTexts = [
    "Hello friend, would you like to make a deal?",
    "This is an amazing opportunity you don't want to miss!",
    "Get your free trial now and become successful!",
    "I can help you achieve your dreams today!"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <DollarSign className="w-8 h-8 text-yellow-500" />
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Spamton Text Generator</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-yellow-600 transition-colors">
                HOME
              </Link>
              <Link
                href="/generators"
                className="text-slate-900 font-medium hover:text-yellow-600 transition-colors"
              >
                Generators
              </Link>
              <Link
                href="/blog"
                className="text-slate-600 hover:text-yellow-600 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-slate-600 hover:text-yellow-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-slate-600 hover:text-yellow-600 transition-colors text-sm"
              >
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
                <Link
                  href="/"
                  className="text-slate-600 hover:text-yellow-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/generators"
                  className="text-slate-900 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Generators
                </Link>
                <Link
                  href="/blog"
                  className="text-slate-600 hover:text-yellow-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-yellow-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            <span>[[ NUMBER 1 RATED SALESMAN1997 ]]</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
            Spamton Text Generator
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Transform your text into Spamton G. Spamton style! Create [[ BIG SHOT ]] messages with our FREE Spamton text converter.
            Perfect for memes, social media, and becoming a [VALUED CUSTOMER]!
          </p>
        </div>

        {/* Main Generator Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Modes */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white shadow-lg border-2 border-yellow-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-yellow-500" />
                Conversion Modes
              </h3>
              <div className="space-y-3">
                {CONVERSION_MODES.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedMode === mode.id
                          ? 'border-yellow-500 bg-yellow-50 shadow-md'
                          : 'border-slate-200 hover:border-yellow-300 hover:bg-yellow-50/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`w-5 h-5 mt-0.5 ${
                          selectedMode === mode.id ? 'text-yellow-600' : 'text-slate-400'
                        }`} />
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 mb-1">{mode.name}</div>
                          <div className="text-xs text-slate-600 mb-2">{mode.description}</div>
                          <div className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">
                            {mode.example}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Intensity Slider */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <Label className="text-sm font-semibold text-slate-900 mb-3 block">
                  Spamton Intensity: {intensity}%
                </Label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>Mild</span>
                  <span>MAXIMUM [[ CHAOS ]]</span>
                </div>
              </div>
            </Card>

            {/* Quick Examples */}
            <Card className="p-6 bg-gradient-to-br from-pink-50 to-yellow-50 shadow-lg border-2 border-pink-200 mt-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Shuffle className="w-5 h-5 text-pink-500" />
                Quick Examples
              </h3>
              <div className="space-y-2">
                {exampleTexts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => loadExample(example)}
                    className="w-full text-left p-3 rounded-lg bg-white hover:bg-pink-50 border border-pink-200 hover:border-pink-400 transition-all text-sm"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Input/Output */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <Card className="p-6 bg-white shadow-lg border-2 border-slate-200">
              <Label className="text-lg font-bold text-slate-900 mb-3 block">
                Your Text
              </Label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your text here to transform it into Spamton style..."
                className="w-full h-32 p-4 border-2 border-slate-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none resize-none text-slate-900 placeholder:text-slate-400"
              />
              <div className="flex items-center justify-between mt-3 text-sm text-slate-500">
                <span>{inputText.length} characters</span>
                <Button
                  onClick={() => setInputText('')}
                  variant="outline"
                  size="sm"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Clear
                </Button>
              </div>
            </Card>

            {/* Output Section */}
            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-pink-50 shadow-lg border-2 border-yellow-300">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-lg font-bold text-slate-900">
                  [[ SPAMTON RESULT ]]
                </Label>
                <div className="flex gap-2">
                  <Button
                    onClick={handleRegenerate}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 border-yellow-400 text-yellow-700 hover:bg-yellow-100"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </Button>
                  <Button
                    onClick={handleCopy}
                    size="sm"
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-yellow-400 min-h-32 font-mono text-slate-900 whitespace-pre-wrap break-words">
                {outputText || 'Your Spamton text will appear here...'}
              </div>
              <div className="flex items-center justify-between mt-3 text-sm text-slate-600">
                <span>{outputText.length} characters</span>
                <span className="text-yellow-600 font-semibold">✨ [[ BIG SHOT ]] READY!</span>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleCopy}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white font-semibold py-6 text-lg"
              >
                <Copy className="w-5 h-5 mr-2" />
                Copy [[ BIG SHOT ]] Text
              </Button>
              <Button
                onClick={handleRegenerate}
                variant="outline"
                className="flex-1 border-2 border-yellow-500 text-yellow-700 hover:bg-yellow-50 font-semibold py-6 text-lg"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Why Use Our Spamton Text Generator?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-white shadow-lg border-2 border-yellow-200 hover:border-yellow-400 transition-all">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Instant Conversion</h4>
              <p className="text-slate-600 text-sm">
                Real-time text transformation as you type. See your [[ BIG SHOT ]] text instantly!
              </p>
            </Card>

            <Card className="p-6 bg-white shadow-lg border-2 border-pink-200 hover:border-pink-400 transition-all">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-pink-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Multiple Modes</h4>
              <p className="text-slate-600 text-sm">
                Choose from Classic, Salesman, Chaos, and Pipis modes for different Spamton styles.
              </p>
            </Card>

            <Card className="p-6 bg-white shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Wand2 className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Adjustable Intensity</h4>
              <p className="text-slate-600 text-sm">
                Control how much Spamton chaos you want with our intensity slider (0-100%).
              </p>
            </Card>

            <Card className="p-6 bg-white shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Copy className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Easy Copy & Share</h4>
              <p className="text-slate-600 text-sm">
                One-click copy to clipboard. Perfect for Discord, Twitter, and memes!
              </p>
            </Card>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mb-16" id="how-to-use">
          <Card className="p-8 bg-gradient-to-br from-yellow-50 to-pink-50 shadow-xl border-2 border-yellow-300">
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              How to Use the Spamton Text Generator
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Choose Your Mode</h4>
                <p className="text-slate-600 text-sm">
                  Select from Classic, Salesman, Chaos, or Pipis mode based on your desired style.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Enter Your Text</h4>
                <p className="text-slate-600 text-sm">
                  Type or paste your text into the input box. Use examples for quick start!
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Adjust Intensity</h4>
                <p className="text-slate-600 text-sm">
                  Use the slider to control how much Spamton transformation you want (0-100%).
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Copy & Share</h4>
                <p className="text-slate-600 text-sm">
                  Click the copy button and share your [[ BIG SHOT ]] text anywhere!
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* About Spamton Section */}
        <section className="mb-16">
          <Card className="p-8 bg-white shadow-xl border-2 border-slate-200">
            <h3 className="text-3xl font-bold text-slate-900 mb-6">
              What is Spamton Text?
            </h3>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 mb-4">
                Spamton G. Spamton is a beloved character from the indie game <strong>Deltarune</strong> created by Toby Fox.
                Known for his erratic speech patterns, excessive use of brackets, random capitalization, and sales pitch language,
                Spamton has become a popular internet meme.
              </p>
              <p className="text-slate-700 mb-4">
                Our <strong>Spamton Text Generator</strong> captures the essence of Spamton's unique communication style,
                allowing you to transform any text into authentic Spamton-speak. Whether you're creating memes,
                entertaining friends on Discord, or just having fun with the character's quirky personality,
                this tool makes it easy to become a [[ BIG SHOT ]]!
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                <p className="text-slate-800 font-semibold mb-2">
                  🌟 Key Features of Spamton's Speech:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li>Random capitalization and number substitutions (3 for E, 1 for I, etc.)</li>
                  <li>Excessive use of brackets [[ like this ]]</li>
                  <li>Sales pitch language and dollar signs ($$$)</li>
                  <li>References to KROMER, PIPIS, and [Hyperlink Blocked]</li>
                  <li>Enthusiastic punctuation (!! and multiple exclamation marks)</li>
                  <li>Broken, chaotic sentence structure</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white shadow-lg border-2 border-slate-200">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-yellow-500" />
                What is a Spamton Text Generator?
              </h4>
              <p className="text-slate-600 text-sm">
                A Spamton Text Generator is a free online tool that converts normal text into Spamton G. Spamton's
                unique speaking style from Deltarune, complete with random caps, brackets, and sales pitch language.
              </p>
            </Card>

            <Card className="p-6 bg-white shadow-lg border-2 border-slate-200">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-yellow-500" />
                Is this Spamton generator free to use?
              </h4>
              <p className="text-slate-600 text-sm">
                Yes! Our Spamton Text Generator is 100% free with no registration required.
                Generate unlimited [[ BIG SHOT ]] text anytime!
              </p>
            </Card>

            <Card className="p-6 bg-white shadow-lg border-2 border-slate-200">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-yellow-500" />
                What's the difference between the modes?
              </h4>
              <p className="text-slate-600 text-sm">
                <strong>Classic</strong> mode uses standard Spamton style with brackets. <strong>Salesman</strong> mode
                adds more sales pitch elements. <strong>Chaos</strong> mode maximizes randomness.
                <strong>Pipis</strong> mode includes more Deltarune references.
              </p>
            </Card>

            <Card className="p-6 bg-white shadow-lg border-2 border-slate-200">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-yellow-500" />
                Can I use this for social media?
              </h4>
              <p className="text-slate-600 text-sm">
                Absolutely! The generated text works perfectly on Twitter, Discord, Reddit, Instagram,
                and any platform that supports Unicode text. Just copy and paste!
              </p>
            </Card>

            <Card className="p-6 bg-white shadow-lg border-2 border-slate-200">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-yellow-500" />
                How does the intensity slider work?
              </h4>
              <p className="text-slate-600 text-sm">
                The intensity slider (0-100%) controls how aggressively the text is transformed.
                Lower values keep more of the original text, while higher values add more Spamton chaos!
              </p>
            </Card>

            <Card className="p-6 bg-white shadow-lg border-2 border-slate-200">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-yellow-500" />
                Why does regenerating give different results?
              </h4>
              <p className="text-slate-600 text-sm">
                Each generation uses randomization to create authentic Spamton-style text.
                This means you can regenerate multiple times to find the perfect [[ BIG SHOT ]] version!
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 rounded-2xl p-12 text-white mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Become a [[ BIG SHOT ]]?
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start creating amazing Spamton-style text now! Join thousands of users transforming their messages
            into [[ SPECIL ]] content. It's FREE and takes just seconds!
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-slate-100 font-bold px-8 py-6 text-lg shadow-xl"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Generating Now
          </Button>
        </section>

        {/* SEO Content Section */}
        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 shadow-xl border-2 border-slate-300">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              The Ultimate Spamton Text Generator for Deltarune Fans
            </h3>
            <div className="prose prose-slate max-w-none text-slate-700 space-y-4">
              <p>
                Looking for the best <strong>Spamton text generator</strong>? You've found it! Our advanced tool
                perfectly captures Spamton G. Spamton's iconic speech patterns from Toby Fox's Deltarune.
                Whether you're a hardcore Deltarune fan or just discovered this [[ NUMBER 1 RATED SALESMAN1997 ]],
                our generator makes it easy to create authentic Spamton-style text.
              </p>
              <p>
                Unlike basic text converters, our <strong>Spamton translator</strong> offers multiple conversion modes,
                adjustable intensity, and real-time preview. The Classic mode delivers traditional Spamton speak with
                brackets and caps. Salesman mode cranks up the sales pitch energy with extra dollar signs and deals.
                Chaos mode unleashes maximum randomness for truly unpredictable results. And Pipis mode adds those
                special Deltarune references fans love.
              </p>
              <p>
                Perfect for creating <strong>Spamton memes</strong>, Discord messages, Twitter posts, or just having fun
                with friends. Our generator uses advanced algorithms to ensure your text sounds authentically Spamton,
                complete with [Hyperlink Blocked], KROMER references, and that signature chaotic energy.
                The regenerate feature lets you try different variations until you find the perfect [[ BIG SHOT ]] message.
              </p>
              <p>
                <strong>Why choose our Spamton generator?</strong> It's fast, free, and requires no download or registration.
                Works on all devices - desktop, tablet, and mobile. The intuitive interface makes it easy for anyone to
                create professional-quality Spamton text in seconds. Plus, with our intensity slider, you control exactly
                how much Spamton chaos you want in your text.
              </p>
              <p>
                Join the community of Deltarune fans using our tool to spread [[ DEALS DEALS DEALS ]] across the internet.
                Whether you're roleplaying as Spamton, creating content, or just want to make your friends laugh,
                this is the <strong>best free Spamton text generator</strong> available online. Start creating your
                [[ BIG SHOT ]] messages today!
              </p>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="w-6 h-6 text-yellow-500" />
                <span className="text-xl font-bold">Spamton Generator</span>
              </div>
              <p className="text-slate-400 text-sm">
                The ultimate free Spamton text generator for Deltarune fans.
                Create [[ BIG SHOT ]] text instantly!
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link
                    href="/"
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/generators"
                    className="hover:text-white transition-colors"
                  >
                    All Generators
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a
                    href="#how-to-use"
                    className="hover:text-white transition-colors"
                  >
                    How to Use
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <Link
                    href="/generators"
                    className="hover:text-white transition-colors"
                  >
                    Other Text Generators
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Brat Generator. All rights reserved. Spamton and Deltarune are properties of Toby Fox.
            This is a fan-made tool for entertainment purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

