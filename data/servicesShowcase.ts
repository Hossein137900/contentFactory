import { IconType } from "react-icons";
import {
  FaPen,
  FaShareAlt,
  FaSearch,
  FaVideo,
  FaChartBar,
} from "react-icons/fa";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  image: string;
  color: string;
  features: {
    title: string;
    description: string;
  }[];
}

// Sample services data in Persian with React Icons
export const services: ServiceItem[] = [
  {
    id: "content-creation",
    title: "تولید محتوا",
    description:
      "تولید محتوای حرفه‌ای متناسب با صدای برند و مخاطبان شما. از مقالات تا ویدیوها، ما محتوای جذابی می‌سازیم که با مخاطبان شما ارتباط برقرار می‌کند.",
    icon: FaPen,
    image: "/assets/images/cam1.jpg",
    color: "#8B5CF6", // Violet
    features: [
      {
        title: "تیم حرفه‌ای",
        description: "تیم متخصص ما سال‌ها تجربه صنعتی را به هر پروژه می‌آورد.",
      },
      {
        title: "استراتژی سفارشی",
        description:
          "ما استراتژی‌های متناسب با اهداف خاص کسب و کار شما توسعه می‌دهیم.",
      },
      {
        title: "نتایج قابل اندازه‌گیری",
        description: "موفقیت خود را با تحلیل‌ها و گزارش‌های جامع پیگیری کنید.",
      },
    ],
  },
  {
    id: "social-media",
    title: "مدیریت شبکه‌های اجتماعی",
    description:
      "مدیریت استراتژیک شبکه‌های اجتماعی برای رشد مخاطبان و تعامل. ما همه چیز را از برنامه‌ریزی محتوا تا تجزیه و تحلیل مدیریت می‌کنیم.",
    icon: FaShareAlt,
    image: "/assets/images/cam2.jpg",
    color: "#EC4899", // Pink
    features: [
      {
        title: "تیم حرفه‌ای",
        description: "تیم متخصص ما سال‌ها تجربه صنعتی را به هر پروژه می‌آورد.",
      },
      {
        title: "استراتژی سفارشی",
        description:
          "ما استراتژی‌های متناسب با اهداف خاص کسب و کار شما توسعه می‌دهیم.",
      },
      {
        title: "نتایج قابل اندازه‌گیری",
        description: "موفقیت خود را با تحلیل‌ها و گزارش‌های جامع پیگیری کنید.",
      },
    ],
  },
  {
    id: "seo",
    title: "بهینه‌سازی SEO",
    description:
      "استراتژی‌های SEO مبتنی بر داده برای بهبود دید و رتبه‌بندی شما. ما محتوای شما را برای جذب ترافیک ارگانیک بیشتر بهینه می‌کنیم.",
    icon: FaSearch,
    image: "/assets/images/cam3.jpg",
    color: "#3B82F6", // Blue
    features: [
      {
        title: "تیم حرفه‌ای",
        description: "تیم متخصص ما سال‌ها تجربه صنعتی را به هر پروژه می‌آورد.",
      },
      {
        title: "استراتژی سفارشی",
        description:
          "ما استراتژی‌های متناسب با اهداف خاص کسب و کار شما توسعه می‌دهیم.",
      },
      {
        title: "نتایج قابل اندازه‌گیری",
        description: "موفقیت خود را با تحلیل‌ها و گزارش‌های جامع پیگیری کنید.",
      },
    ],
  },
  {
    id: "video-production",
    title: "تولید ویدیو",
    description:
      "تولید ویدیوی با کیفیت بالا از مفهوم تا ویرایش نهایی. ما داستان‌های بصری جذابی می‌سازیم که توجه را جلب می‌کنند.",
    icon: FaVideo,
    image: "/assets/images/cam1.jpg",
    color: "#10B981", // Emerald
    features: [
      {
        title: "تیم حرفه‌ای",
        description: "تیم متخصص ما سال‌ها تجربه صنعتی را به هر پروژه می‌آورد.",
      },
      {
        title: "استراتژی سفارشی",
        description:
          "ما استراتژی‌های متناسب با اهداف خاص کسب و کار شما توسعه می‌دهیم.",
      },
      {
        title: "نتایج قابل اندازه‌گیری",
        description: "موفقیت خود را با تحلیل‌ها و گزارش‌های جامع پیگیری کنید.",
      },
    ],
  },
  {
    id: "analytics",
    title: "تحلیل محتوا",
    description:
      "تجزیه و تحلیل جامع عملکرد محتوا برای اصلاح استراتژی شما. ما داده‌ها را به بینش‌های قابل اجرا برای بهبود مداوم تبدیل می‌کنیم.",
    icon: FaChartBar,
    image: "/assets/images/cam2.jpg",
    color: "#F59E0B", // Amber
    features: [
      {
        title: "تیم حرفه‌ای",
        description: "تیم متخصص ما سال‌ها تجربه صنعتی را به هر پروژه می‌آورد.",
      },
      {
        title: "استراتژی سفارشی",
        description:
          "ما استراتژی‌های متناسب با اهداف خاص کسب و کار شما توسعه می‌دهیم.",
      },
      {
        title: "نتایج قابل اندازه‌گیری",
        description: "موفقیت خود را با تحلیل‌ها و گزارش‌های جامع پیگیری کنید.",
      },
    ],
  },
];

export const brandIcons = [
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
];
