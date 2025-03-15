"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { motion } from "framer-motion";

interface BlogPost {
  slug: string;
  _id: string;
  title: string;
  description: string;
  image: string;
  userId: {
    _id: string;
    username: string;
  };
  user: string;
  content: string;
  seoTitle: string;
  tags: string[];
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

export default function BlogGrid() {
  const [isblog, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(
        /[^\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200Fa-z0-9-]/g,
        ""
      )
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  useEffect(() => {
    async function fetchBlogs() {
      const fetchedBlogs = await fetch("/api/blog", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await fetchedBlogs.json();
      const mappedBlogs = data.blogs.map((blog: BlogPost) => ({
        _id: blog._id,
        title: blog.title,
        slug: generateSlug(blog.title),
        description: blog.description,
        coverImage: "/assets/images/fade3.jpg",
        user: blog.userId.username,
        date: new Date(blog.createdAt),
        readTime: blog.readTime,
        tags: blog.tags,
        seoTitle: blog.seoTitle,
      }));

      setBlogs(mappedBlogs);
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    document.title = "وبلاگ | مدرن لایت"
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
         "مدرن لایت - وبلاگ ما با مطالب جذاب و آموزنده"
      );
    }
  }, []);
  const filteredBlogs = isblog.filter((blog) => {
    return (
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Store Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-[60vh] relative overflow-hidden"
      >
        <Image
          src="/assets/images/works"
          alt="Chandelier Craftsmanship"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <motion.h1
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="text-5xl font-bold text-center text-white"
          >
            وبلاگ ما
          </motion.h1>
          <motion.p
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="text-gray-300 text-center text-lg mt-4"
          >
            همه چیز در مورد نورپردازی{" "}
          </motion.p>
        </div>
      </motion.section>

      {/* Search Section */}
      <div className="max-w-xl mx-auto my-12 px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="جستجو در وبلاگ..."
            className="w-full px-4 py-3 rounded-lg border border-[#60a5fa] focus:outline-none focus:ring-2 focus:ring-[#60a5fa] text-[#60a5fa] placeholder-[#60a5fa]/80 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-[#60a5fa]/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Product (Blog) Grid */}
      <div className="max-w-7xl mx-auto mb-32 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <Link
            target="_blank"
            href={`/blogs/${blog._id}:${blog.slug}`}
            key={blog._id}
          >
            <article className="bg-white/30 rounded-lg  overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 group overflow-hidden">
                <Image
                  src={"/assets/images/works/cop1.jpg"}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[#e5d8d0] my-auto  bg-[#a37462]/10 px-4 py-2 rounded-t-lg text-lg font-bold flex items-center gap-2 transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    مشاهده وبلاگ
                    <BsArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-[#60a5fa] mb-2 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-stone-600 flex-grow line-clamp-3 mb-4">
                  {blog.description.slice(0, 30)} ...
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="border-[#60a5fa] border bg-white text-[#60a5fa] px-2 py-1 rounded-lg text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-[#60a5fa]">{blog?.user}</span>
                  </div>
                  <span className="text-blue-500">
                    {blog.readTime} دقیقه مطالعه
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredBlogs.length === 0 && (
        <div className="max-w-xl mx-auto text-center py-12">
          <div className="text-[#a37462] text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-2 text-[#a37462]">
            وبلاگی یافت نشد
          </h3>
          <p className="text-stone-600">لطفا با کلمات کلیدی دیگری جستجو کنید</p>
        </div>
      )}
    </div>
  );
}
