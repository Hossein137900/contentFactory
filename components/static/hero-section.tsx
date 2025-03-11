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
  const controls = useAnimation();
  const touchStartRef = useRef({ x: 0, y: 0 });
  const isScrollingRef = useRef(false);

  useEffect(() => {
    setSliderWidth(window.innerWidth);
    const handleResize = () => {
      setSliderWidth(window.innerWidth);
      controls.set({ x: -current * window.innerWidth });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [current, controls]);

  const navigateSlide = (direction: "prev" | "next") => {
    const newIndex =
      direction === "next"
        ? (current + 1) % slides.length
        : (current - 1 + slides.length) % slides.length;

    setCurrent(newIndex);
    controls.start({
      x: -newIndex * sliderWidth,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
  };
  // const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent) => {
  //   if ("touches" in event) {
  //     setDragStart({
  //       x: event.touches[0].clientX,
  //       y: event.touches[0].clientY,
  //     });
  //   } else {
  //     setDragStart({
  //       x: (event as MouseEvent).clientX,
  //       y: (event as MouseEvent).clientY,
  //     });
  //   }
  // };
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

    // Determine if the user is trying to scroll vertically
    if (!isScrollingRef.current) {
      isScrollingRef.current = Math.abs(deltaY) > Math.abs(deltaX);
    }

    // If vertical scrolling is detected, don't prevent default behavior
    if (isScrollingRef.current) {
      e.stopPropagation();
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

  // const handleDragEnd = (event: MouseEvent | TouchEvent, info: PanInfo) => {
  //   const swipeThreshold = sliderWidth * 0.2;
  //   if (Math.abs(info.offset.x) > swipeThreshold) {
  //     if (info.offset.x > 0 && current > 0) {
  //       navigateSlide("prev");
  //     } else if (info.offset.x < 0 && current < slides.length - 1) {
  //       navigateSlide("next");
  //     } else {
  //       controls.start({ x: -current * sliderWidth });
  //     }
  //   } else {
  //     controls.start({ x: -current * sliderWidth });
  //   }
  // };

  return (
    <div className="min-h-screen relative">
      <div
        className="overflow-auto "
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="flex w-full h-full"
          animate={controls}
          initial={false}
          style={{ x: -current * sliderWidth }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative w-screen h-screen flex-shrink-0"
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

      {/* Navigation buttons */}
      <div className="hidden md:block">
        <button
          onClick={() => navigateSlide("prev")}
          className="absolute left-4 bottom-16 bg-white/20 hover:bg-white/30 p-3 rounded-full text-white transition-all"
          style={{ display: current === 0 ? "none" : "block" }}
        >
          <FaChevronLeft size={24} />
        </button>

        <button
          onClick={() => navigateSlide("next")}
          className="absolute left-16 bottom-16 bg-white/20 hover:bg-white/30 p-3 rounded-full text-white transition-all"
          style={{ display: current === slides.length - 1 ? "none" : "block" }}
        >
          <FaChevronRight size={24} />
        </button>
      </div>

      {/* Dots navigation */}
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
