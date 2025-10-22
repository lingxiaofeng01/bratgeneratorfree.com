'use client';

import Link from 'next/link';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function PrivacyPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-lime-500" />
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Brat Generator</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
                HOME
              </Link>
              <Link href="/blog" className="text-slate-600 hover:text-slate-900 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
                About
              </Link>
              <Link href="/privacy" className="text-slate-900 font-medium">
                Privacy
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
                <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors py-2">
                  HOME
                </Link>
                <Link href="/blog" className="text-slate-600 hover:text-slate-900 transition-colors py-2">
                  Blog
                </Link>
                <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors py-2">
                  About
                </Link>
                <Link href="/privacy" className="text-slate-900 font-medium py-2">
                  Privacy
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
            <p className="text-slate-700 leading-relaxed">
              Brat Generator ("we," "us," "our," or "Company") operates the bratgeneratorfree.com website (the "Service"). 
              This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service 
              and the choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information Collection and Use</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We collect several different types of information for various purposes to provide and improve our Service to you.
            </p>
            
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Types of Data Collected:</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li><strong>Usage Data:</strong> We automatically collect information about how you interact with our Service, including IP address, browser type, pages visited, and time spent.</li>
              <li><strong>Cookies and Tracking:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information.</li>
              <li><strong>Device Information:</strong> We may collect information about your device, including device type, operating system, and unique device identifiers.</li>
              <li><strong>Contact Information:</strong> If you contact us, we may collect your email address and message content.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Google AdSense and Advertising</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Our Service uses Google AdSense to display advertisements. Google AdSense may collect and use information about your visits to this and other websites 
              in order to provide advertisements about goods and services of interest to you.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Google uses cookies to serve ads based on your prior visits to our website or other websites.</li>
              <li>You can opt out of personalized advertising by visiting Google's Ads Settings.</li>
              <li>We do not have access to or control over cookies placed by third-party advertisers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Google Analytics</h2>
            <p className="text-slate-700 leading-relaxed">
              We use Google Analytics to understand how users interact with our Service. Google Analytics collects information such as how often users visit this site, 
              what pages they visit when they do so, and what other sites they used prior to coming to this site. We use the information we get from Google Analytics 
              only to improve our Service. Google Analytics collects the IP address assigned to you on the date you visit sites, rather than your name or other identifying information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Use of Data</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Brat Generator uses the collected data for various purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Security of Data</h2>
            <p className="text-slate-700 leading-relaxed">
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. 
              While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. GDPR Compliance</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you are located in the European Union (EU) or European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR).
            </p>
            <p className="text-slate-700 leading-relaxed">
              You have the right to: access your personal data, correct inaccurate data, request deletion of your data, restrict processing, data portability, and object to processing. 
              To exercise any of these rights, please contact us using the information provided in the Contact section.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Changes to This Privacy Policy</h2>
            <p className="text-slate-700 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the bottom of this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Contact Us</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-slate-100 p-4 rounded-lg">
              <p className="text-slate-700"><strong>Email:</strong> support@bratgeneratorfree.com</p>
              <p className="text-slate-700 mt-2">Visit our <Link href="/contact" className="text-lime-600 hover:text-lime-700 underline">Contact Page</Link> for more information.</p>
            </div>
          </section>

          <section className="border-t border-slate-200 pt-8 mt-8">
            <p className="text-sm text-slate-500">Last Updated: October 2025</p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>&copy; 2025 Brat Generator. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

