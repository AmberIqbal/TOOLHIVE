
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Imgtoolset Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: post.image ? [post.image] : [],
    },
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
              <span className="text-2xl"></span>
              <span className="text-xl font-bold text-blue-900">ImgToolSet</span>
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
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-5xl font-black text-blue-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-6 text-gray-600">
            <span>{post.date}</span>
            {post.readingTime && (
              <>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </>
            )}
            {post.author && (
              <>
                <span>•</span>
                <span>By {post.author}</span>
              </>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg prose-blue max-w-none">
          <div className="blog-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Try Our Tools?
          </h2>
          <p className="text-blue-100 mb-6 text-lg">
            Start editing your images for free - no signup required!
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition shadow-xl"
          >
            Try ImgToolSet Free →
          </Link>
        </div>
      </article>

      {/* Custom Styles for Blog Content */}
      <style jsx global>{`
        .blog-content h2 {
          font-size: 2rem;
          font-weight: 800;
          color: #1e3a8a;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e40af;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        
        .blog-content p {
          color: #475569;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          font-size: 1.125rem;
        }
        
        .blog-content ul, .blog-content ol {
          color: #475569;
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }
        
        .blog-content strong {
          color: #1e293b;
          font-weight: 600;
        }
        
        .blog-content a {
          color: #2563eb;
          text-decoration: underline;
        }
        
        .blog-content a:hover {
          color: #1e40af;
        }
        
        .blog-content code {
          background: #f1f5f9;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
          color: #e11d48;
        }
        
        .blog-content pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 1.5rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.5rem;
          color: #64748b;
          font-style: italic;
          margin: 1.5rem 0;
        }
        
        .blog-content img {
          border-radius: 0.75rem;
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );
}
