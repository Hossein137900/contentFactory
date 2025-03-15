"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    image: "/assets/images/cam1.jpg",
    title: "Welcome to Content Factory",
  },
  {
    id: 2,
    image: "/assets/images/cam2.jpg",
    title: "Create Amazing Content",
  },
  {
    id: 3,
    image: "/assets/images/cam3.jpg",
    title: "Grow Your Business",
  },
  {
    id: 4,
    image: "/assets/images/cam1.jpg",
    title: "Scale Your Impact",
  },
  {
    id: 5,
    image: "/assets/images/cam2.jpg",
    title: "Transform Your Brand",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const controls = useAnimation();
  const touchStartRef = useRef({ x: 0, y: 0 });
  const isScrollingRef = useRef(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying && window.innerWidth >= 768) {
      // Only autoplay on desktop
      interval = setInterval(() => {
        const nextIndex = (current + 1) % slides.length;
        setCurrent(nextIndex);
        controls.start({
          x: -nextIndex * sliderWidth,
          transition: { type: "spring", stiffness: 300, damping: 25 },
        });
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [current, sliderWidth, controls, isAutoPlaying]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      setSliderWidth(width);
      controls.set({ x: -current * width });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [current, controls]);

  const navigateSlide = (direction: "prev" | "next") => {
    let newIndex;
    if (direction === "next") {
      newIndex = current < slides.length - 1 ? current + 1 : current;
    } else {
      newIndex = current > 0 ? current - 1 : current;
    }

    setCurrent(newIndex);
    controls.start({
      x: -newIndex * sliderWidth,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    isScrollingRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const deltaX = e.touches[0].clientX - touchStartRef.current.x;
    const deltaY = e.touches[0].clientY - touchStartRef.current.y;

    if (!isScrollingRef.current) {
      isScrollingRef.current = Math.abs(deltaY) > Math.abs(deltaX);
    }

    if (!isScrollingRef.current) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isScrollingRef.current) return;

    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const threshold = sliderWidth * 0.2;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && current > 0) {
        navigateSlide("prev");
      } else if (deltaX < 0 && current < slides.length - 1) {
        navigateSlide("next");
      }
    }
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <div
        className="h-full w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="flex h-full"
          animate={controls}
          initial={false}
          style={{ x: -current * sliderWidth }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative w-screen h-full flex-shrink-0"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
                draggable="false"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <motion.h2
                  className="text-white text-5xl font-bold px-4 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {slide.title}
                </motion.h2>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="hidden md:block">
        <button
          onClick={() => navigateSlide("prev")}
          className={`absolute left-4 bottom-16 bg-white/20 hover:bg-white/30 p-3 rounded-full text-white transition-all ${
            current === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <FaChevronLeft size={24} />
        </button>

        <button
          onClick={() => navigateSlide("next")}
          className={`absolute left-16 bottom-16 bg-white/20 hover:bg-white/30 p-3 rounded-full text-white transition-all ${
            current === slides.length - 1
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          }`}
        >
          <FaChevronRight size={24} />
        </button>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((slide) => (
          <motion.button
            key={slide.id}
            className="w-3 h-3 rounded-full bg-white"
            animate={{
              opacity: current === slide.id - 1 ? 1 : 0.3,
              scale: current === slide.id - 1 ? 1.2 : 1,
            }}
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              setCurrent(slide.id - 1);
              controls.start({ x: -(slide.id - 1) * sliderWidth });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
