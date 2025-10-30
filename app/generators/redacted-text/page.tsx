'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, Copy, Check, RotateCcw, Eye, EyeOff, Mail, Link2, Download, Shield, Zap, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export default function RedactedTextGenerator() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [inputText, setInputText] = useState('John Smith\'s email is john@example.com and his phone is (555) 123-4567.');
  const [wordsToRedact, setWordsToRedact] = useState('');
  const [outputText, setOutputText] = useState('');
  const [showOriginal, setShowOriginal] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Quick redact options
  const [redactEmails, setRedactEmails] = useState(false);
  const [redactUrls, setRedactUrls] = useState(false);
  const [redactPhones, setRedactPhones] = useState(false);
  const [redactNumbers, setRedactNumbers] = useState(false);
  
  // Advanced options
  const [caseInsensitive, setCaseInsensitive] = useState(true);
  const [wholeWordOnly, setWholeWordOnly] = useState(false);
  
  // Statistics
  const [stats, setStats] = useState({
    redactedSections: 0,
    charactersHidden: 0,
    inputChars: 0,
    inputWords: 0,
    outputChars: 0,
    outputWords: 0
  });

  // Update page title and meta
  useEffect(() => {
    document.title = 'Redacted Text Generator - Free Online Text Redaction Tool | Privacy-Focused';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free, private, and fast text redaction tool. Hide sensitive information instantly with client-side processing. Redact emails, URLs, phone numbers, and custom words. No data stored or transmitted.');
    }
  }, []);

  // Email regex pattern
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  
  // URL regex pattern
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  
  // Phone regex pattern (various formats)
  const phoneRegex = /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/g;
  
  // Number regex pattern
  const numberRegex = /\b\d+\b/g;

  // Redact text function
  const redactText = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    let result = inputText;
    let redactedCount = 0;
    let hiddenChars = 0;

    // Redact custom words
    if (wordsToRedact.trim()) {
      const words = wordsToRedact.split(',').map(w => w.trim()).filter(w => w);
      words.forEach(word => {
        if (!word) return;
        
        let regex;
        if (wholeWordOnly) {
          const pattern = caseInsensitive 
            ? `\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`
            : `\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`;
          regex = new RegExp(pattern, caseInsensitive ? 'gi' : 'g');
        } else {
          const pattern = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          regex = new RegExp(pattern, caseInsensitive ? 'gi' : 'g');
        }
        
        result = result.replace(regex, (match) => {
          redactedCount++;
          hiddenChars += match.length;
          return '█'.repeat(match.length);
        });
      });
    }

    // Quick redact emails
    if (redactEmails) {
      result = result.replace(emailRegex, (match) => {
        redactedCount++;
        hiddenChars += match.length;
        return '█'.repeat(match.length);
      });
    }

    // Quick redact URLs
    if (redactUrls) {
      result = result.replace(urlRegex, (match) => {
        redactedCount++;
        hiddenChars += match.length;
        return '█'.repeat(match.length);
      });
    }

    // Quick redact phone numbers
    if (redactPhones) {
      result = result.replace(phoneRegex, (match) => {
        redactedCount++;
        hiddenChars += match.length;
        return '█'.repeat(match.length);
      });
    }

    // Quick redact numbers
    if (redactNumbers) {
      result = result.replace(numberRegex, (match) => {
        redactedCount++;
        hiddenChars += match.length;
        return '█'.repeat(match.length);
      });
    }

    setOutputText(result);
    
    // Update statistics
    const inputWords = inputText.trim().split(/\s+/).length;
    const outputWords = result.trim().split(/\s+/).length;
    
    setStats({
      redactedSections: redactedCount,
      charactersHidden: hiddenChars,
      inputChars: inputText.length,
      inputWords: inputWords,
      outputChars: result.length,
      outputWords: outputWords
    });
  };

  // Auto-redact when settings change
  useEffect(() => {
    redactText();
  }, [inputText, wordsToRedact, redactEmails, redactUrls, redactPhones, redactNumbers, caseInsensitive, wholeWordOnly]);

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Download as text file
  const downloadText = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `redacted-text-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Reset function
  const handleReset = () => {
    setInputText('');
    setWordsToRedact('');
    setOutputText('');
    setRedactEmails(false);
    setRedactUrls(false);
    setRedactPhones(false);
    setRedactNumbers(false);
    setCaseInsensitive(true);
    setWholeWordOnly(false);
    setShowOriginal(false);
  };

  // Sample text presets
  const loadSample = (type: string) => {
    const samples = {
      legal: 'The defendant, John Doe (SSN: 123-45-6789), residing at 123 Main Street, contacted attorney Sarah Johnson at sarah.johnson@lawfirm.com regarding case #2024-CV-12345.',
      medical: 'Patient Mary Smith (DOB: 01/15/1980, MRN: 987654) was seen by Dr. Robert Chen on 03/20/2024. Contact: mary.smith@email.com, Phone: (555) 234-5678.',
      business: 'Contract between ABC Corp and XYZ Ltd. Contact: john.manager@abccorp.com, Phone: +1-555-123-4567. Account #: 4532-1234-5678-9012.'
    };
    setInputText(samples[type as keyof typeof samples] || '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header - Reuse from homepage */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-slate-800">
                Redacted Text Generator
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-600 hover:text-lime-600 transition-colors">
                HOME
              </Link>
              <Link href="/generators" className="text-slate-600 hover:text-lime-600 transition-colors">
                Generators
              </Link>
              <Link href="/blog" className="text-slate-600 hover:text-lime-600 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-lime-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-slate-600 hover:text-lime-600 transition-colors">
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-600" />
              ) : (
                <Menu className="w-6 h-6 text-slate-600" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-200 pt-4">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-slate-600 hover:text-lime-600 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
                <Link href="/generators" className="text-slate-600 hover:text-lime-600 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Generators</Link>
                <Link href="/blog" className="text-slate-600 hover:text-lime-600 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                <Link href="/about" className="text-slate-600 hover:text-lime-600 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                <Link href="/contact" className="text-slate-600 hover:text-lime-600 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-blue-600 mr-4" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900">
              Redacted Text Generator - <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Free & Privacy-Focused</span>
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-slate-600 mb-6 leading-relaxed">
            Hide sensitive information instantly with our redacted text generator. All processing happens in your browser - we never see your data.
            Use this redacted text generator to redact emails, URLs, phone numbers, and custom words with powerful text redaction features.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-semibold">100% Private</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 font-semibold">Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
              <FileText className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 font-semibold">No Signup Required</span>
            </div>
          </div>
        </section>

        {/* Main Generator Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <Card className="p-6 bg-white shadow-xl border-2 border-blue-200 hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <Label className="text-lg font-semibold text-slate-900">Input Text You Want To Redact</Label>
              </div>
              <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-xs font-semibold text-green-700">100% Private</span>
              </div>
            </div>

            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or type your text here..."
              className="min-h-[200px] text-base font-mono resize-none border-2 border-blue-300 focus:border-blue-500 rounded-lg mb-3"
            />

            <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
              <span>Characters: {stats.inputChars}</span>
              <span>Words: {stats.inputWords}</span>
            </div>

            {/* Sample Text Buttons */}
            <div className="mb-4">
              <Label className="text-sm font-semibold text-slate-700 mb-2 block">Quick Samples:</Label>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => loadSample('legal')} className="text-xs">
                  Legal Document
                </Button>
                <Button variant="outline" size="sm" onClick={() => loadSample('medical')} className="text-xs">
                  Medical Record
                </Button>
                <Button variant="outline" size="sm" onClick={() => loadSample('business')} className="text-xs">
                  Business Contract
                </Button>
              </div>
            </div>

            {/* Words to Redact */}
            <div className="mb-4">
              <Label className="text-base font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                Words to Redact (separate by commas)
              </Label>
              <Textarea
                value={wordsToRedact}
                onChange={(e) => setWordsToRedact(e.target.value)}
                placeholder="e.g., John Smith, john@example.com, (555) 123-4567"
                className="min-h-[80px] text-sm border-2 border-slate-300 focus:border-blue-500 rounded-lg"
              />
              <p className="text-xs text-slate-500 mt-2 flex items-start gap-1">
                <span className="text-blue-600">💡</span>
                Enter words separated by commas. Use Advanced Options below for more control.
              </p>
            </div>

            {/* Quick Redact Options */}
            <div className="mb-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <Label className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                Quick Redact:
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-slate-200 hover:border-blue-400 transition-colors">
                  <Switch
                    id="redact-emails"
                    checked={redactEmails}
                    onCheckedChange={setRedactEmails}
                  />
                  <Label htmlFor="redact-emails" className="cursor-pointer flex items-center gap-2 text-sm font-medium">
                    <Mail className="w-4 h-4 text-blue-600" />
                    Email Addresses
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-slate-200 hover:border-blue-400 transition-colors">
                  <Switch
                    id="redact-urls"
                    checked={redactUrls}
                    onCheckedChange={setRedactUrls}
                  />
                  <Label htmlFor="redact-urls" className="cursor-pointer flex items-center gap-2 text-sm font-medium">
                    <Link2 className="w-4 h-4 text-purple-600" />
                    URLs
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-slate-200 hover:border-blue-400 transition-colors">
                  <Switch
                    id="redact-phones"
                    checked={redactPhones}
                    onCheckedChange={setRedactPhones}
                  />
                  <Label htmlFor="redact-phones" className="cursor-pointer text-sm font-medium">
                    📞 Phone Numbers
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-slate-200 hover:border-blue-400 transition-colors">
                  <Switch
                    id="redact-numbers"
                    checked={redactNumbers}
                    onCheckedChange={setRedactNumbers}
                  />
                  <Label htmlFor="redact-numbers" className="cursor-pointer text-sm font-medium">
                    🔢 All Numbers
                  </Label>
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            <details className="mb-4">
              <summary className="cursor-pointer text-base font-semibold text-slate-900 mb-3 flex items-center gap-2 hover:text-blue-600 transition-colors">
                <span>▼</span> Advanced Options
              </summary>
              <div className="space-y-3 mt-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between">
                  <Label htmlFor="case-insensitive" className="cursor-pointer text-sm">
                    Case insensitive matching
                  </Label>
                  <Switch
                    id="case-insensitive"
                    checked={caseInsensitive}
                    onCheckedChange={setCaseInsensitive}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="whole-word" className="cursor-pointer text-sm">
                    Whole word matching only
                  </Label>
                  <Switch
                    id="whole-word"
                    checked={wholeWordOnly}
                    onCheckedChange={setWholeWordOnly}
                  />
                </div>
              </div>
            </details>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={redactText}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 text-base shadow-lg hover:shadow-xl transition-all"
              >
                <Shield className="w-5 h-5 mr-2" />
                Redact Text
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="px-6 py-6 border-2 border-slate-300 hover:border-red-400 hover:bg-red-50 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
          </Card>

          {/* Output Section */}
          <Card className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 shadow-xl border-2 border-purple-200 hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <Label className="text-lg font-semibold text-slate-900">Your Redacted Text</Label>
              </div>
            </div>

            <div className="relative">
              <Textarea
                value={showOriginal ? inputText : outputText}
                readOnly
                placeholder="Redacted text will appear here..."
                className="min-h-[200px] text-base font-mono resize-none bg-white border-2 border-purple-300 rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-slate-600 mt-3 mb-4">
              <span>Characters: {stats.outputChars}</span>
              <span>Words: {stats.outputWords}</span>
            </div>

            {/* Show/Hide Original Toggle */}
            <div className="mb-4">
              <Button
                onClick={() => setShowOriginal(!showOriginal)}
                variant="outline"
                className="w-full border-2 border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                {showOriginal ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hide Original
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Show Original
                  </>
                )}
              </Button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-3 mb-4 p-4 bg-white rounded-lg border border-slate-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.redactedSections}</div>
                <div className="text-xs text-slate-600">Redacted Sections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.charactersHidden}</div>
                <div className="text-xs text-slate-600">Characters Hidden</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Button
                onClick={copyToClipboard}
                className={`${
                  copied
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-semibold transition-all shadow-md hover:shadow-lg`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                onClick={downloadText}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            {/* Privacy Notice */}
            <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-green-800 leading-relaxed">
                <strong>100% Private:</strong> Processed in your browser. We do not store or transmit your data.
              </p>
            </div>
          </Card>
        </div>

        {/* Why Choose Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
            Why Choose Our Redacted Text Generator?
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Our redacted text generator offers the best privacy-focused text redaction experience with powerful features and intuitive design.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-xl transition-all hover:scale-105 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">100% Private</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                All processing happens in your browser. No data is sent to our servers. Your sensitive information never leaves your device.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-xl transition-all hover:scale-105 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Lightning Fast</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Instant text redaction with real-time processing. No waiting, no loading - see results immediately as you type.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-xl transition-all hover:scale-105 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Smart Detection</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Automatically detect and redact emails, URLs, phone numbers, and custom patterns with advanced regex matching.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-xl transition-all hover:scale-105 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Completely Free</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                No registration, no limits, no hidden costs. Use as much as you want, whenever you want. Always free.
              </p>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 md:p-12 border-2 border-blue-200">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
            How Our Redacted Text Generator Works
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Learn how to use our redacted text generator in just a few simple steps. This redacted text generator makes text redaction easy and secure.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                1
              </div>
              <h4 className="font-semibold text-slate-900 mb-2 text-lg">Enter Your Text</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Paste or type the text you want to redact into the input area. This can be any document, email, or text content.
              </p>
              <div className="mt-3 p-3 bg-white rounded-lg border border-blue-200 text-xs text-left">
                <code className="text-blue-600">Example: "John Smith's email is john@example.com"</code>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                2
              </div>
              <h4 className="font-semibold text-slate-900 mb-2 text-lg">Specify Words to Redact</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Enter the words or phrases you want to redact, separated by commas. Or use Quick Redact for emails, URLs, and phone numbers.
              </p>
              <div className="mt-3 p-3 bg-white rounded-lg border border-purple-200 text-xs text-left">
                <code className="text-purple-600">Example: "John Smith, john@example.com"</code>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                3
              </div>
              <h4 className="font-semibold text-slate-900 mb-2 text-lg">Auto Redaction</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                The tool automatically processes your text in real-time. All specified words are replaced with █ blocks instantly.
              </p>
              <div className="mt-3 p-3 bg-white rounded-lg border border-green-200 text-xs text-left">
                <code className="text-green-600">Result: "████ █████'s email is ████████████████"</code>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                4
              </div>
              <h4 className="font-semibold text-slate-900 mb-2 text-lg">Review and Export</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Review your redacted text, toggle visibility to see original text, and copy or download the result.
              </p>
              <div className="mt-3 p-3 bg-white rounded-lg border border-orange-200 text-xs text-left">
                <code className="text-orange-600">Options: Copy, Download, Show/Hide Original</code>
              </div>
            </div>
          </div>
        </section>

        {/* Common Use Cases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
            Redacted Text Generator Use Cases
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Discover how professionals use our redacted text generator across different industries to protect sensitive information.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-xl transition-all border-2 border-slate-200 hover:border-blue-400">
              <div className="text-4xl mb-4 text-center">⚖️</div>
              <h3 className="text-xl font-semibold mb-3 text-center text-slate-900">Legal Document Redaction</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Use our redacted text generator to redact sensitive information from legal documents, contracts, and court filings while preserving document structure.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all border-2 border-slate-200 hover:border-green-400">
              <div className="text-4xl mb-4 text-center">🏥</div>
              <h3 className="text-xl font-semibold mb-3 text-center text-slate-900">Healthcare Privacy Protection</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Protect patient privacy with our redacted text generator by redacting personal identifiers from medical records and healthcare documents.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all border-2 border-slate-200 hover:border-purple-400">
              <div className="text-4xl mb-4 text-center">📰</div>
              <h3 className="text-xl font-semibold mb-3 text-center text-slate-900">Journalism & Media</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Journalists use our redacted text generator to protect sources and sensitive information in news articles and investigative reports.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all border-2 border-slate-200 hover:border-orange-400">
              <div className="text-4xl mb-4 text-center">💼</div>
              <h3 className="text-xl font-semibold mb-3 text-center text-slate-900">Business Confidentiality</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our redacted text generator helps redact proprietary information, employee details, financial data, and confidential business information.
              </p>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
            Redacted Text Generator FAQ
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Common questions about using our redacted text generator for secure text redaction.
          </p>
          <div className="space-y-4">
            <details className="group bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-blue-400 transition-all shadow-sm hover:shadow-md">
              <summary className="cursor-pointer font-semibold text-slate-900 text-lg flex items-center justify-between">
                <span>Is my data safe with this redacted text generator?</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Yes, absolutely! Our redacted text generator processes all text in your browser using client-side JavaScript.
                Your data never leaves your device and is never transmitted to our servers. This redacted text generator doesn't store, collect, or have
                access to any of your text content. This ensures complete privacy and security for your sensitive information.
              </p>
            </details>

            <details className="group bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-blue-400 transition-all shadow-sm hover:shadow-md">
              <summary className="cursor-pointer font-semibold text-slate-900 text-lg flex items-center justify-between">
                <span>How do I use the redacted text generator?</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Simply paste your text in the redacted text generator input area, enter the words you want to redact (separated by commas), and the tool
                will automatically replace all instances with █ blocks. You can also use Quick Redact options in our redacted text generator to automatically
                detect and redact emails, URLs, phone numbers, and all numbers with a single click.
              </p>
            </details>

            <details className="group bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-blue-400 transition-all shadow-sm hover:shadow-md">
              <summary className="cursor-pointer font-semibold text-slate-900 text-lg flex items-center justify-between">
                <span>Can I redact multiple words at once?</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Yes! Enter multiple words or phrases separated by commas in the "Words to Redact" field. For example:
                "John Smith, john@example.com, (555) 123-4567" will redact all three items simultaneously. The tool processes
                all entries in real-time for instant results.
              </p>
            </details>

            <details className="group bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-blue-400 transition-all shadow-sm hover:shadow-md">
              <summary className="cursor-pointer font-semibold text-slate-900 text-lg flex items-center justify-between">
                <span>Is the redaction case-sensitive?</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed">
                By default, redaction is case-insensitive. If you enter "john@example.com", it will redact "John@Example.COM",
                "JOHN@EXAMPLE.COM", and any other case variations. You can change this behavior in the Advanced Options section
                by toggling the "Case insensitive matching" option.
              </p>
            </details>

            <details className="group bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-blue-400 transition-all shadow-sm hover:shadow-md">
              <summary className="cursor-pointer font-semibold text-slate-900 text-lg flex items-center justify-between">
                <span>What are the Advanced Options?</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Advanced Options let you control how text matching works: "Case insensitive matching" (default: on) makes "John"
                match "john" or "JOHN". "Whole word matching only" (default: off) ensures "cat" only matches the word "cat" and
                not "category" or "scattered". These options give you precise control over the redaction process.
              </p>
            </details>

            <details className="group bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-blue-400 transition-all shadow-sm hover:shadow-md">
              <summary className="cursor-pointer font-semibold text-slate-900 text-lg flex items-center justify-between">
                <span>Can I see the original text after redacting?</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Yes! Use the "Show/Hide Original" toggle button in the output section to switch between the redacted and original
                text. This helps you verify that the redaction was done correctly and allows you to review what information was hidden.
              </p>
            </details>

            <details className="group bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-blue-400 transition-all shadow-sm hover:shadow-md">
              <summary className="cursor-pointer font-semibold text-slate-900 text-lg flex items-center justify-between">
                <span>Is this redacted text generator free to use?</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Yes, our redacted text generator is completely free to use with no limitations, registration required, or hidden costs.
                We believe privacy tools like this redacted text generator should be accessible to everyone. Use it as much as you need for personal or commercial purposes.
              </p>
            </details>

            <details className="group bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-blue-400 transition-all shadow-sm hover:shadow-md">
              <summary className="cursor-pointer font-semibold text-slate-900 text-lg flex items-center justify-between">
                <span>Can I use this redacted text generator for commercial purposes?</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Yes, you can use our redacted text generator for any legal purpose, including commercial use. There are no restrictions
                on how you use this redacted text generator or the redacted content you create. Perfect for businesses, legal firms, healthcare providers,
                and journalists.
              </p>
            </details>
          </div>
        </section>
      </main>

      {/* Footer - Reuse from homepage */}
      <footer className="bg-slate-900 text-slate-300 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-6 h-6 text-blue-500" />
                <h4 className="text-lg font-bold text-white">Redacted Text Generator</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Free, private, and fast text redaction tool. Hide sensitive information instantly with client-side processing.
              </p>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-4">Generators</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Brat Generator
                  </Link>
                </li>
                <li>
                  <Link href="/generators/glitter-text" className="hover:text-white transition-colors">
                    Glitter Text Generator
                  </Link>
                </li>
                <li>
                  <Link href="/generators/corrupted-text" className="hover:text-white transition-colors">
                    Corrupted Text Generator
                  </Link>
                </li>
                <li>
                  <Link href="/generators/mirror-text" className="hover:text-white transition-colors">
                    Mirror Text Generator
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/generators" className="hover:text-white transition-colors">
                    All Generators
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-sm">
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
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>© 2025 Redacted Text Generator. All rights reserved. Free online text redaction tool for privacy and security.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

