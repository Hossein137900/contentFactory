import { IconType } from "react-icons";
import {
  HiOutlineLightBulb,
  HiOutlineDocumentText,
  HiOutlinePencilAlt,
  HiOutlineChartBar,
  HiOutlineShare,
  HiOutlineSparkles,
  HiOutlineGlobe,
  HiOutlineCamera,
  HiOutlineVideoCamera,
  HiOutlineColorSwatch,
} from "react-icons/hi";

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  color: string;
  image: string;
}

interface ContentType {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  color: string;
  features: string[];
  image: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  type: string;
  image: string;
  color: string;
}

// Content creation process steps
export const processSteps: ProcessStep[] = [
  {
    id: "ideation",
    title: "ایده‌پردازی",
    description:
      "در این مرحله، ایده‌های خلاقانه برای محتوای شما شکل می‌گیرد. با تحلیل بازار هدف و نیازهای مخاطبان، بهترین مفاهیم را برای کسب و کار شما طراحی می‌کنیم.",
    icon: HiOutlineLightBulb,
    color: "#8B5CF6", // Violet
    image: "/assets/images/cam1.jpg",
  },
  {
    id: "strategy",
    title: "استراتژی محتوا",
    description:
      "استراتژی محتوایی منسجم و هدفمند برای دستیابی به اهداف کسب و کار شما تدوین می‌کنیم. این شامل برنامه‌ریزی زمانی، کانال‌های انتشار و شاخص‌های موفقیت است.",
    icon: HiOutlineDocumentText,
    color: "#EC4899", // Pink
    image: "/assets/images/cam2.jpg",
  },
  {
    id: "creation",
    title: "تولید محتوا",
    description:
      "تیم خلاق ما با استفاده از جدیدترین ابزارها و تکنیک‌ها، محتوای با کیفیت بالا تولید می‌کند. از متن گرفته تا عکس، ویدیو و گرافیک، همه چیز با دقت و ظرافت خلق می‌شود.",
    icon: HiOutlinePencilAlt,
    color: "#3B82F6", // Blue
    image: "/assets/images/cam3.jpg",
  },
  {
    id: "optimization",
    title: "بهینه‌سازی",
    description:
      "محتوای تولید شده برای موتورهای جستجو و پلتفرم‌های مختلف بهینه‌سازی می‌شود تا بیشترین بازدهی و دسترسی‌پذیری را داشته باشد.",
    icon: HiOutlineChartBar,
    color: "#10B981", // Emerald
    image: "/assets/images/cam1.jpg",
  },
  {
    id: "distribution",
    title: "انتشار",
    description:
      "محتوای شما در بهترین زمان و مناسب‌ترین کانال‌ها منتشر می‌شود تا به دست مخاطبان هدف برسد و بیشترین تأثیر را داشته باشد.",
    icon: HiOutlineShare,
    color: "#F59E0B", // Amber
    image: "/assets/images/cam2.jpg",
  },
  {
    id: "analysis",
    title: "تحلیل و بهبود",
    description:
      "عملکرد محتوا را به طور مداوم رصد می‌کنیم و با تحلیل داده‌ها، استراتژی‌ها را بهبود می‌دهیم تا نتایج بهتری حاصل شود.",
    icon: HiOutlineSparkles,
    color: "#EF4444", // Red
    image: "/assets/images/cam3.jpg",
  },
];

// Content types we create
export const contentTypes: ContentType[] = [
  {
    id: "blog",
    title: "محتوای وبلاگ",
    description:
      "مقالات تخصصی و جذاب که اعتبار برند شما را افزایش می‌دهد و ترافیک ارگانیک به سایت شما می‌آورد.",
    icon: HiOutlineDocumentText,
    color: "#8B5CF6", // Violet
    features: [
      "مقالات سئو شده",
      "محتوای آموزشی",
      "مطالعات موردی",
      "راهنماهای تخصصی",
    ],
    image: "/assets/images/cam1.jpg",
  },
  {
    id: "social",
    title: "محتوای شبکه‌های اجتماعی",
    description:
      "محتوای جذاب و تعاملی برای افزایش حضور برند شما در پلتفرم‌های اجتماعی و جذب مخاطبان جدید.",
    icon: HiOutlineGlobe,
    color: "#EC4899", // Pink
    features: [
      "پست‌های اینستاگرام",
      "استوری‌های تعاملی",
      "محتوای لینکدین",
      "کمپین‌های شبکه‌های اجتماعی",
    ],
    image: "/assets/images/cam2.jpg",
  },
  {
    id: "photo",
    title: "عکاسی محصول",
    description:
      "تصاویر حرفه‌ای و با کیفیت از محصولات و خدمات شما که تأثیر بصری قدرتمندی ایجاد می‌کند.",
    icon: HiOutlineCamera,
    color: "#3B82F6", // Blue
    features: ["عکاسی محصول", "عکاسی صنعتی", "عکاسی غذا", "عکاسی مد و پوشاک"],
    image: "/assets/images/cam3.jpg",
  },
  {
    id: "video",
    title: "ویدیو و موشن گرافیک",
    description:
      "ویدیوهای جذاب و موشن گرافیک‌های حرفه‌ای که پیام برند شما را به شکلی پویا و تأثیرگذار منتقل می‌کند.",
    icon: HiOutlineVideoCamera,
    color: "#10B981", // Emerald
    features: [
      "ویدیوهای معرفی محصول",
      "موشن گرافیک",
      "تیزرهای تبلیغاتی",
      "ویدیوهای آموزشی",
    ],
    image: "/assets/images/cam1.jpg",
  },
  {
    id: "graphic",
    title: "طراحی گرافیک",
    description:
      "طراحی‌های گرافیکی خلاقانه و حرفه‌ای برای انواع نیازهای بصری کسب و کار شما.",
    icon: HiOutlineColorSwatch,
    color: "#F59E0B", // Amber
    features: [
      "طراحی لوگو",
      "هویت بصری برند",
      "بروشور و کاتالوگ",
      "بنر و پوستر",
    ],
    image: "/assets/images/cam2.jpg",
  },
];

// Sample portfolio items
export const portfolioItems: PortfolioItem[] = [
  {
    id: "portfolio-1",
    title: "کمپین محتوایی برند لوازم خانگی",
    type: "استراتژی محتوا",
    image: "/assets/images/cam1.jpg",
    color: processSteps[0].color,
  },
  {
    id: "portfolio-2",
    title: "عکاسی محصولات فروشگاه آنلاین",
    type: "عکاسی محصول",
    image: "/assets/images/cam2.jpg",
    color: processSteps[1].color,
  },
  {
    id: "portfolio-3",
    title: "سری ویدیوهای آموزشی اپلیکیشن",
    type: "ویدیو",
    image: "/assets/images/cam3.jpg",
    color: processSteps[2].color,
  },
  {
    id: "portfolio-4",
    title: "محتوای شبکه‌های اجتماعی رستوران",
    type: "شبکه‌های اجتماعی",
    image: "/assets/images/cam1.jpg",
    color: processSteps[3].color,
  },
  {
    id: "portfolio-5",
    title: "طراحی هویت بصری استارتاپ",
    type: "طراحی گرافیک",
    image: "/assets/images/cam2.jpg",
    color: processSteps[4].color,
  },
];
