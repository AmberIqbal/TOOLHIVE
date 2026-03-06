'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b border-blue-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <span className="text-xl font-bold text-blue-900">ImgToolset</span>
            </Link>
            <Link 
              href="/"
              className="text-gray-600 hover:text-blue-600 transition font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-blue-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600">
            Last updated: March 6, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using ImgToolset ("the Service"), you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our Service.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ImgToolset provides free online image processing tools, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>AI-powered background removal</li>
              <li>Image compression</li>
              <li>Image resizing</li>
              <li>Format conversion (PNG, JPG, WebP)</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Acceptable Use</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to use the Service only for lawful purposes. You must not:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Upload or process images containing illegal content</li>
              <li>Upload or process images you don't have rights to use</li>
              <li>Upload or process images containing malicious code or viruses</li>
              <li>Attempt to overload, hack, or disrupt the Service</li>
              <li>Use automated tools to abuse the Service</li>
              <li>Upload images containing child sexual abuse material</li>
              <li>Use the Service to violate others' privacy or rights</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Intellectual Property</h2>
            <h3 className="text-xl font-bold text-blue-800 mt-6 mb-3">Your Content</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You retain all rights to images you upload. By using our Service, you grant us a temporary 
              license to process your images solely for the purpose of providing the requested service. 
              We do not claim ownership of your images.
            </p>

            <h3 className="text-xl font-bold text-blue-800 mt-6 mb-3">Our Content</h3>
            <p className="text-gray-700 leading-relaxed">
              The Service, including its design, code, and features, is owned by ImgToolset and protected 
              by copyright and other intellectual property laws. You may not copy, modify, or distribute 
              our Service without permission.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Disclaimer of Warranties</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER 
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Accuracy or quality of processed images</li>
              <li>Uninterrupted or error-free operation</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We do not guarantee that the Service will meet your requirements or that results will be 
              error-free or accurate.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IMGTOOLSET SHALL NOT BE LIABLE FOR ANY INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, 
              WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER 
              INTANGIBLE LOSSES RESULTING FROM:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
              <li>Your use or inability to use the Service</li>
              <li>Any unauthorized access to or use of our servers</li>
              <li>Any errors or omissions in processed images</li>
              <li>Any loss or damage to your images or data</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Service Availability</h2>
            <p className="text-gray-700 leading-relaxed">
              We strive to keep the Service available 24/7, but we do not guarantee uninterrupted access. 
              We may:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
              <li>Temporarily suspend the Service for maintenance</li>
              <li>Modify or discontinue features without notice</li>
              <li>Implement usage limits to prevent abuse</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">File Size and Processing Limits</h2>
            <p className="text-gray-700 leading-relaxed">
              Current limits:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
              <li><strong>Maximum file size:</strong> 20MB per image</li>
              <li><strong>Supported formats:</strong> PNG, JPG, WebP</li>
              <li><strong>Processing timeout:</strong> 2 minutes per image</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We reserve the right to modify these limits at any time.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Your use of the Service is also governed by our <Link href="/privacy" className="text-blue-600 underline">Privacy Policy</Link>. 
              Please review it to understand how we collect and use information.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to terminate or suspend your access to the Service immediately, without 
              prior notice or liability, for any reason, including but not limited to breach of these Terms.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may modify these Terms at any time. We will notify users of any material changes by updating 
              the "Last updated" date at the top of this page. Your continued use of the Service after changes 
              constitutes acceptance of the new Terms.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws, without 
              regard to conflict of law provisions.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-gray-700">
              <strong>Website:</strong> <a href="https://imgtoolset.com" className="text-blue-600 underline">imgtoolset.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
