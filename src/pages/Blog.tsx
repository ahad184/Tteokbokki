import React, { useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { client } from "../contentful/client";

const BlogPage: React.FC = () => {
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await client.getEntries({
          content_type: "blog",
          limit: 2,
        });

        if (res.items && res.items.length > 0) {
          setBlog(res.items[0].fields);
        } else {
          setError("No blog posts found.");
        }
      } catch (err: any) {
        console.error("Contentful fetch error:", err);
        setError("Failed to load blog post. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, []);

  // Safely format date
  const formatDate = (dateStr: any) => {
    try {
      if (!dateStr) return null;
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "Invalid Date";
      return d.toLocaleDateString(undefined, { dateStyle: "long" });
    } catch (e) {
      return "Date Error";
    }
  };

  // Helper to render content safely (handles both Rich Text objects and plain strings)
  const renderContent = (content: any) => {
    try {
      if (!content) return <p>No content available.</p>;

      // If it's a Contentful Rich Text object (has nodeType)
      if (typeof content === "object" && content.nodeType === "document") {
        return documentToReactComponents(content);
      }

      // If it's a plain string or other format
      if (typeof content === "string") {
        return <p className="whitespace-pre-wrap">{content}</p>;
      }

      return <p>Content format not supported.</p>;
    } catch (err) {
      console.error("Render content error:", err);
      return <p className="text-red-500">Error rendering content.</p>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-lg">
        <div className="animate-pulse text-red-600 font-medium tracking-wide">
          Loading blog...
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] text-lg gap-6 px-4 text-center">
        <p className="text-gray-500 font-medium max-w-md">
          {error || "Blog content is currently unavailable."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Debug log for final render state (visible in console)
  console.log("Rendering BlogPage with data:", blog);

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full bg-red-600 text-white shadow-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-sm lg:px-0">
          <span className="font-bold tracking-tight">Blog Details</span>
          <span className="text-xs opacity-80 font-medium">
            Home <span className="mx-1 text-red-300">/</span> Blog Details
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Main Post Image */}
          {blog.coverImage?.fields?.file?.url && (
            <div className="w-full overflow-hidden rounded-3xl shadow-2xl mb-10">
              <img
                src={
                  blog.coverImage.fields.file.url.startsWith("//")
                    ? `https:${blog.coverImage.fields.file.url}`
                    : blog.coverImage.fields.file.url
                }
                alt={blog.title || "Blog cover"}
                className="w-full h-[300px] md:h-[480px] object-cover"
              />
            </div>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4 font-medium uppercase tracking-widest">
            <span className="text-red-500">
              By {blog.authorName || "Admin"}
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            {blog.publishedDate && (
              <span>{formatDate(blog.publishedDate)}</span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
            {blog.title || "Untitled Blog Post"}
          </h1>

          {/* Content Body */}
          <div className="mt-8 space-y-6 text-gray-700 text-lg leading-relaxed prose prose-red max-w-none">
            {renderContent(blog.content)}
          </div>

          {/* Tags */}
          {Array.isArray(blog.tags) && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100 flex gap-2 flex-wrap">
              {blog.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-gray-50 text-gray-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author */}
          {(blog.authorBio || blog.authorName) && (
            <div className="mt-16 bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {blog.authorName || "Anonymous Writer"}
              </h3>
              <p className="text-gray-600 italic leading-relaxed">
                {blog.authorBio}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
