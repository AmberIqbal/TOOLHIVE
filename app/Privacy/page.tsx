'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    
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
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last updated: March 6, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              At ImgToolset ("we," "our," or "us"), we are committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard information when you 
              use our website and image processing tools at imgtoolset.com.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-bold text-blue-800 mt-6 mb-3">Images You Upload</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you use our image processing tools (background removal, compression, resizing, or format conversion), 
              you upload images to our service. These images are:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Processed in real-time on our servers</li>
              <li><strong>Not stored permanently</strong> - deleted immediately after processing</li>
              <li><strong>Not shared</strong> with any third parties</li>
              <li><strong>Not used for training</strong> AI models or any other purposes</li>
            </ul>

            <h3 className="text-xl font-bold text-blue-800 mt-6 mb-3">Analytics Data</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use Google Analytics to understand how visitors use our website. This may include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Your IP address (anonymized)</li>
              <li>Browser type and version</li>
              <li>Pages you visit on our site</li>
              <li>Time spent on pages</li>
              <li>Referring website</li>
              <li>Device type (mobile, desktop, tablet)</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">How We Use Your Information</h2>
            
            <h3 className="text-xl font-bold text-blue-800 mt-6 mb-3">Image Processing</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Images you upload are used solely to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Perform the requested operation (remove background, compress, resize, or convert)</li>
              <li>Deliver the processed image back to you</li>
            </ul>

            <h3 className="text-xl font-bold text-blue-800 mt-6 mb-3">Analytics</h3>
            <p className="text-gray-700 leading-relaxed">
              We use analytics data to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Understand which tools are most popular</li>
              <li>Improve user experience</li>
              <li>Fix technical issues</li>
              <li>Make data-driven decisions about new features</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Google Analytics:</strong> To track website usage and improve our service</li>
              <li><strong>Essential cookies:</strong> To ensure the website functions properly</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              You can disable cookies in your browser settings, but this may affect website functionality.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We take data security seriously:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>HTTPS encryption:</strong> All data transmitted between your browser and our servers is encrypted</li>
              <li><strong>Secure servers:</strong> Our processing servers use industry-standard security measures</li>
              <li><strong>No permanent storage:</strong> Uploaded images are deleted immediately after processing</li>
              <li><strong>Limited access:</strong> Only authorized personnel have access to server infrastructure</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Google Analytics:</strong> For website analytics - <a href="https://policies.google.com/privacy" className="text-blue-600 underline" target="_blank" rel="noopener">Privacy Policy</a></li>
              <li><strong>Vercel:</strong> For website hosting - <a href="https://vercel.com/legal/privacy-policy" className="text-blue-600 underline" target="_blank" rel="noopener">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Access:</strong> Request information about data we have about you</li>
              <li><strong>Deletion:</strong> Request deletion of your data (though we don't store uploaded images)</li>
              <li><strong>Opt-out:</strong> Disable cookies or stop using our service at any time</li>
              <li><strong>Questions:</strong> Contact us about our privacy practices</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our service is not directed to children under 13 years of age. We do not knowingly collect 
              personal information from children under 13. If you are a parent or guardian and believe your 
              child has provided us with personal information, please contact us.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              updating the "Last updated" date at the top of this page. We encourage you to review this 
              Privacy Policy periodically for any changes.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md">
  <h2 className="text-2xl font-bold text-blue-900 mb-4">Contact Us</h2>
  <p className="text-gray-700 leading-relaxed mb-4">
    If you have any questions about this Privacy Policy, please contact us at:
  </p>
  <p className="text-gray-700">
    <strong>Email:</strong> <a href="mailto:imagetoolset@gmail.com" className="text-blue-600 underline">imgtoolset@gmail.com</a>
  </p>
</div>
        </div>
      </div>
    </div>
  );
}
