"use client";
import { useState, useEffect } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import Image from "next/image";

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

  useEffect(() => {
    setSliderWidth(window.innerWidth);
    const handleResize = () => setSliderWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDragEnd = (event: MouseEvent | TouchEvent, info: PanInfo) => {
    const swipeThreshold = sliderWidth * 0.2;
    const direction = info.offset.x > 0 ? -1 : 1;
    const newIndex = current + direction;

    if (
      Math.abs(info.offset.x) > swipeThreshold &&
      newIndex >= 0 &&
      newIndex < slides.length
    ) {
      setCurrent(newIndex);
    }

    controls.start({ x: -current * sliderWidth });
  };

  return (
    <div className=" min-h-screen overflow-hidden relative touch-none">
      <motion.div
        className="flex w-full h-full cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{
          left: -((slides.length - 1) * sliderWidth),
          right: 0,
        }}
        dragElastic={0.1}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={false}
        style={{ x: -current * sliderWidth }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {slides.map((slide) => (
          <motion.div
            key={slide.id}
            className="relative w-screen h-screen flex-shrink-0"
            style={{ touchAction: "none" }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority
              draggable="false"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center select-none">
              <motion.h2
                className="text-white text-5xl font-bold px-4 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {slide.title}
              </motion.h2>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((slide) => (
          <motion.div
            key={slide.id}
            className="w-3 h-3 rounded-full bg-white cursor-pointer"
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
