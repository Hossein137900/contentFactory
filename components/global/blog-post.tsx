import Image from "next/image";
import moment from "moment-jalaali";
import { useEffect } from "react";

interface BlogPost {
  title: string;
  content: string;
  author: string;
  date: Date;
  readTime: number;
  image: string;
  tags: string[];
  seoTitle: string;
  description: string;
}

export default function BlogPost(blogPostData: BlogPost) {
  const sampleBlogPost = blogPostData;
  const persianDate = moment(sampleBlogPost.date)
    .format("jDD jMMMM jYYYY")
    .replace(
      /[0-9]/g,
      (digit: string) =>
        ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"][parseInt(digit)]
    )
    .replace("Farvardin", "فروردین")
    .replace("Ordibehesht", "اردیبهشت")
    .replace("Khordad", "خرداد")
    .replace("Tir", "تیر")
    .replace("Mordad", "مرداد")
    .replace("Shahrivar", "شهریور")
    .replace("Mehr", "مهر")
    .replace("Aban", "آبان")
    .replace("Azar", "آذر")
    .replace("Dey", "دی")
    .replace("Bahman", "بهمن")
    .replace("Esfand", "اسفند");

  useEffect(() => {
    document.title = sampleBlogPost.seoTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        sampleBlogPost.description ? sampleBlogPost.description : "بلاگ مشترک"
      );
    }
  }, [sampleBlogPost.seoTitle, sampleBlogPost.description]);




  return (
    <article className="px-4  " dir="rtl">
      <div className="max-w-5xl mx-auto  border-x border-gray-400 px-2 py-2">
        <div className="relative h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <Image
            src="/assets/images/works/cop1.jpg"
            alt={sampleBlogPost.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="mb-4 backdrop-blur-sm bg-[#e5d8d0]/10 p-3 md:p-6 rounded-lg">
          <h1 className="md:text-4xl text-2xl font-bold mb-2 text-[#60a5fa] hover:text-black transition-colors duration-300">
            {sampleBlogPost.title}
          </h1>
          <div className="flex text-nowrap items-center gap-4 text-[#60a5fa]/80">
            <span className="text-xs md:text-md hover:text-black transition-colors duration-300">
              {persianDate}
            </span>
            <span>•</span>
            <span className="text-xs md:text-md hover:text-black transition-colors duration-300">
              {sampleBlogPost.readTime} دقیقه مطالعه
            </span>
            <span>•</span>
            <span className="text-xs md:text-md hover:text-black transition-colors duration-300">
              نویسنده: {sampleBlogPost.author}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {sampleBlogPost.tags.map((tag, index) => (
            <span
              key={index}
              className="border-[#60a5fa] border-1 text-[#60a5fa] px-4 py-1.5 rounded-xl text-xs font-medium  hover:text-black transition-colors duration-300 cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div
          className="text-black text-sm md:text-xl prose prose-invert max-w-none prose-p:text-[#e5d8d0]/90 prose-headings:text-[#e5d8d0] prose-a:text-[#e5d8d0] hover:prose-a:text-white prose-strong:text-[#e5d8d0]"
          dangerouslySetInnerHTML={{ __html: sampleBlogPost.content }}
        />
      </div>
    </article>
  );
}
