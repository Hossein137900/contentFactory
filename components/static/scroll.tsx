"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaVideo,
  FaPhotoVideo,
  FaFilm,
  FaLaptopCode,
  FaTimes,
} from "react-icons/fa";
import CustomVideoPlayer from "../global/video-custom";

const ProjectorEffect = () => {
  const [selectedItem, setSelectedItem] = useState<
    (typeof contentItems)[0] | null
  >(null);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      transition: {
        duration: 0.3,
      },
    },
  };
  useEffect(() => {
    const handleScroll = () => {
      const projector = document.querySelector(".projector");
      const elements = document.querySelectorAll(".item");
      if (!projector) return;

      const projectorRect = projector.getBoundingClientRect();
      elements.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const distance = Math.abs(itemRect.top - projectorRect.top);

        // Reduced activation distance to 50px
        if (distance < 300) {
          item.classList.add("item-active");
          item.classList.remove("item-inactive");
        } else {
          item.classList.remove("item-active");
          item.classList.add("item-inactive");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Content data
  const contentItems = [
    {
      title: "فیلمبرداری حرفه‌ای",
      description:
        "با استفاده از جدیدترین تجهیزات فیلمبرداری و تیم متخصص، تصاویری خیره‌کننده و با کیفیت برای پروژه شما خلق می‌کنیم",
      icon: FaVideo,
      videoUrl: "/assets/video/homme.mp4",
    },
    {
      title: "تدوین خلاقانه",
      description:
        "ترکیب هنرمندانه تصاویر، موسیقی و جلوه‌های ویژه برای ساخت محتوایی جذاب و تأثیرگذار",
      icon: FaPhotoVideo,
      videoUrl: "/assets/video/video.mp4",
    },
    {
      title: "موشن گرافیک",
      description:
        "طراحی انیمیشن‌های گرافیکی پویا و انتقال مفاهیم پیچیده به زبانی ساده و جذاب",
      icon: FaFilm,
      videoUrl: "/assets/video/video.mp4",
    },
    {
      title: "تولید محتوای دیجیتال",
      description:
        "ارائه راهکارهای نوین در تولید محتوای دیجیتال برای پلتفرم‌های مختلف با رویکرد حرفه‌ای",
      icon: FaLaptopCode,
      videoUrl: "/assets/video/video.mp4",
    },
  ];

  return (
    <div className="relative w-full  bg-black h-full text-white z-10" dir="rtl">
      {/* Top gradient */}
      <div className="fixed top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent z-30" />

      {/* Bottom gradient */}
      <div className="fixed bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-30" />

      <motion.div
        className="projector fixed left-0 top-1/2 -translate-y-1/2 z-50"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.svg
          viewBox="0 0 24 24"
          className="w-32 h-32 fill-yellow-400 filter drop-shadow-[0_0_30px_rgba(250,204,21,0.8)]"
          animate={{
            filter: [
              "drop-shadow(0 0 30px rgba(250,204,21,0.6))",
              "drop-shadow(0 0 50px rgba(250,204,21,0.9))",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <path d="M22 17a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v10zm-2-7c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7zm-11 4c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3z" />
        </motion.svg>

        <div className="light-container absolute top-1/2 left-full -translate-y-1/2">
          {/* Primary beam */}
          <motion.div
            className="absolute top-1/2 left-full -translate-y-1/2
                       w-[1200px] h-[600px]
                       bg-[radial-gradient(ellipse_at_left,rgba(250,204,21,0.3),transparent_70%)]
                       [clip-path:polygon(0_50%,100%_0,100%_100%)]
                       mix-blend-screen"
            animate={{
              opacity: [0.5, 0.7, 0.5],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Noise Overlay */}
          <motion.div
            className="absolute top-1/2 left-full -translate-y-1/2
                       w-[1200px] h-[600px]
                       bg-noise
                       [clip-path:polygon(0_50%,100%_0,100%_100%)]
                       mix-blend-overlay"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Neon Glow Core */}
          <motion.div
            className="absolute top-1/2 left-full -translate-y-1/2
                       w-[1200px] h-[600px]
                       bg-gradient-to-r from-yellow-300/60 via-yellow-200/20 to-transparent
                       [clip-path:polygon(0_50%,100%_30,100%_70%)]
                       blur-xl"
            animate={{
              opacity: [0.6, 1, 0.6],
              filter: [
                "blur(8px) brightness(1.2)",
                "blur(12px) brightness(1.5)",
                "blur(8px) brightness(1.2)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Light Particles */}
          <motion.div
            className="absolute top-1/2 left-full -translate-y-1/2
                       w-[1200px] h-[600px]
                       bg-[url('/noise.png')]
                       opacity-20
                       [clip-path:polygon(0_50%,100%_0,100%_100%)]
                       mix-blend-screen"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 10, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </motion.div>

      <div className="relative z-[9999]">
        <div className="content w-3/4 max-w-2xl mx-auto pt-[50vh] space-y-32">
          {contentItems.map((item, index) => (
            <motion.div
              key={index}
              className="item p-10 border-2 border-gray-200 rounded-2xl 
                       bg-gray-800/80 backdrop-blur-lg cursor-pointer
                       hover:border-yellow-400/50 hover:scale-[1.02]
                       transition-all duration-700 ease-out"
              initial={{ opacity: 1, y: 50 }}
              whileInView={{ opacity: 0.95, y: 0 }}
              onClick={() => setSelectedItem(item)}
              layoutId={`container-${index}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <span
                  className="text-5xl text-white group-hover:scale-110 
                             transition-transform duration-200"
                >
                  {<item.icon size={40} />}
                </span>
                <h2 className="text-3xl font-bold ">{item.title}</h2>
              </div>
              <p className="text-lg leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedItem && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
                onClick={() => setSelectedItem(null)}
              />

              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layoutId={`container-${contentItems.indexOf(selectedItem)}`}
                className="fixed inset-10 bg-gray-900 rounded-3xl z-50 
                         overflow-hidden border border-yellow-400/20"
              >
                <div className="relative h-full p-10">
                  <motion.button
                    className="absolute top-9 left-6 text-yellow-400 hover:text-yellow-300
                             bg-gray-800/50 p-2 rounded-full"
                    onClick={() => setSelectedItem(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTimes size={24} />
                  </motion.button>

                  <div className="h-full flex flex-col gap-8">
                    <div className="flex items-center gap-6">
                      <selectedItem.icon
                        size={40}
                        className="text-yellow-400"
                      />
                      <h1 className="text-2xl font-bold text-yellow-400">
                        {selectedItem.title}
                      </h1>
                    </div>

                    <p className="text-sm mb-24 md:mb-0 leading-relaxed text-gray-300">
                      {selectedItem.description}
                    </p>

                    <div className="max-w-2xl mt-10 mx-auto">
                      {selectedItem.videoUrl && (
                        <CustomVideoPlayer videoUrl={selectedItem.videoUrl} />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectorEffect;
