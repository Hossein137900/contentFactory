"use client";
import BlogPost from "@/components/global/blog-post";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface BlogPost {
  title: string;
  content: string;
  author: string;
  date: Date;
  readTime: number;
  image: string;
  tags: string[];
  createdAt: Date;
  user: {
    name: string;
  };
  seoTitle: string;
  description: string;
}

export default function BlogDetailPage() {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const params = usePathname();

  const id = params.split(":")[0].split("/")[2];
  const fetchDetails = async () => {
    const response = await fetch(`/api/blog/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const blogs = await response.json();
    console.log(blogs, "blogs");
    setBlog(blogs.blog);
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  const blogPostData = {
    title: blog.title,
    content: blog.content,
    author: blog?.user?.name || "Admin",
    date: blog?.createdAt,
    readTime: 5,
    image: blog.image || "/assets/images/fade3.jpg",
    tags: blog.tags || ["لوستر", "دکوراسیون"],
    seoTitle: blog.seoTitle,
    description: blog.description,
  };

  return <BlogPost {...blogPostData} />;
}
