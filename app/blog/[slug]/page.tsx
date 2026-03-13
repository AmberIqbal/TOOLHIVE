import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post =  await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | ImgToolset Blog`,
    description: post.description,
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

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
              href="/blog"
              className="text-gray-600 hover:text-blue-600 transition font-medium"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </nav>

      <article className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-black text-blue-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-600 mb-6">
            <time>{post.date}</time>
            {post.author && <span>• {post.author}</span>}
          </div>
          {post.tags && (
            <div className="flex gap-2 flex-wrap">
              {post.tags.map((tag: string) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg prose-blue max-w-none">
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <ReactMarkdown
              components={{
                h1: ({children}) => <h1 className="text-4xl font-bold text-blue-900 mb-6 mt-8">{children}</h1>,
                h2: ({children}) => <h2 className="text-3xl font-bold text-blue-900 mb-4 mt-8">{children}</h2>,
                h3: ({children}) => <h3 className="text-2xl font-bold text-blue-800 mb-3 mt-6">{children}</h3>,
                p: ({children}) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
                ul: ({children}) => <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">{children}</ol>,
                a: ({children, href}) => <a href={href} className="text-blue-600 underline hover:text-blue-700">{children}</a>,
                strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
                code: ({children}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Try ImgToolset for Free
          </h3>
          <p className="mb-6 text-blue-50">
            Free AI-powered image tools - no signup required
          </p>
          <Link 
            href="/"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
          >
            Get Started
          </Link>
        </div>
      </article>
    </div>
  );
}