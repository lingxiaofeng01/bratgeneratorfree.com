'use client';

import Link from 'next/link';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function TermsPage() {
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
              <Link href="/terms" className="text-slate-900 font-medium">
                Terms
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
                <Link href="/terms" className="text-slate-900 font-medium py-2">
                  Terms
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-700 leading-relaxed">
              By accessing and using Brat Generator (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Disclaimer of Affiliation</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>IMPORTANT:</strong> Brat Generator is a fan-inspired creative tool inspired by Charli XCX's iconic "brat" aesthetic. 
              This is NOT an official product and is NOT affiliated with, endorsed by, or associated with Charli XCX, her management, record label, or any official entity.
            </p>
            <p className="text-slate-700 leading-relaxed">
              We are independent creators who built this tool for the community. All references to "brat" aesthetic are for inspirational purposes only. 
              We respect all intellectual property rights and do not claim ownership of any trademarked content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Use License</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on Brat Generator for personal, 
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on the Service</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Disclaimer</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The materials on Brat Generator are provided on an 'as is' basis. Brat Generator makes no warranties, expressed or implied, 
              and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, 
              fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Further, Brat Generator does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of 
              the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Limitations</h2>
            <p className="text-slate-700 leading-relaxed">
              In no event shall Brat Generator or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, 
              or due to business interruption) arising out of the use or inability to use the materials on Brat Generator, even if Brat Generator or an authorized 
              representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Accuracy of Materials</h2>
            <p className="text-slate-700 leading-relaxed">
              The materials appearing on Brat Generator could include technical, typographical, or photographic errors. Brat Generator does not warrant that 
              any of the materials on its website are accurate, complete, or current. Brat Generator may make changes to the materials contained on its website 
              at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Links</h2>
            <p className="text-slate-700 leading-relaxed">
              Brat Generator has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. 
              The inclusion of any link does not imply endorsement by Brat Generator of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Modifications</h2>
            <p className="text-slate-700 leading-relaxed">
              Brat Generator may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound 
              by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Governing Law</h2>
            <p className="text-slate-700 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Brat Generator operates, 
              and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact Information</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us at:
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

