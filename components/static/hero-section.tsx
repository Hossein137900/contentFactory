"use client";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  useAnimation,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiPlayFill, RiPauseFill } from "react-icons/ri";
import { slides } from "../../data/heroSection";

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const isScrollingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [progress, setProgress] = useState(0);
  const [progressColor, setProgressColor] = useState(slides[0].color);
  console.log(dimensions, progress, progressColor);

  // Mouse position for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothed mouse values for more natural movement
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });

  // Progress animation
  const progressAnimation = useAnimation();

  // For light beams
  const lightBeam1Left = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    ["20%", "30%"]
  );
  const lightBeam2Right = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    ["30%", "35%"]
  );

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Handle progress bar animation
  useEffect(() => {
    if (isAutoPlaying) {
      setProgress(0);
      setProgressColor(slides[current].color);

      progressAnimation.start({
        scaleX: 1,
        transition: { duration: 6, ease: "linear" },
      });
    } else {
      progressAnimation.stop();
    }

    return () => {
      progressAnimation.stop();
    };
  }, [current, isAutoPlaying, progressAnimation]);

  // Auto-advance slides
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying && !isHovering) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 6000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovering]);

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize mouse position to be between -0.5 and 0.5
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      mouseX.set(x);
      mouseY.set(y);
    }
  };

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    // Reset mouse position when leaving
    mouseX.set(0);
    mouseY.set(0);
  };

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.85,
      filter: "blur(0px) brightness(0.8)",
      rotateY: direction > 0 ? 10 : -10,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px) brightness(1)",
      rotateY: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 },
        scale: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }, // Custom spring-like ease
        filter: { duration: 0.8 },
        rotateY: { duration: 0.8 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.85,
      filter: "blur(0px) brightness(0.8)",
      rotateY: direction < 0 ? 10 : -10,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        filter: { duration: 0.5 },
        rotateY: { duration: 0.5 },
      },
    }),
  };

  const titleVariants = {
    hidden: { y: 40, opacity: 0, filter: "blur(0px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: 0.3,
        duration: 1,
        ease: [0.19, 1.0, 0.22, 1.0], // Ease out expo
      },
    },
    exit: {
      y: -30,
      opacity: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  const subtitleVariants = {
    hidden: { y: 30, opacity: 0, filter: "blur(0px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: 0.5,
        duration: 1,
        ease: [0.19, 1.0, 0.22, 1.0],
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      filter: "blur(8px)",
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  const buttonVariants = {
    initial: {
      scale: 1,
      boxShadow: "0 0 0 rgba(255, 255, 255, 0)",
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(8px)",
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
      background: "rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(12px)",
    },
    tap: {
      scale: 0.95,
      boxShadow: "0 0 5px rgba(255, 255, 255, 0.2)",
    },
  };

  const indicatorVariants = {
    inactive: {
      width: "8px",
      height: "8px",
      opacity: 0.5,
      background: "rgba(255, 255, 255, 0.5)",
    },
    active: {
      width: "30px",
      height: "8px",
      opacity: 1,
      background: slides[current].color,
      transition: { duration: 0.3 },
    },
    hover: {
      opacity: 0.8,
      scale: 1.1,
    },
  };

  const navigateSlide = (newIndex: number) => {
    setDirection(newIndex > current ? 1 : -1);
    setCurrent(newIndex);
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
    const threshold = 100;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && current > 0) {
        navigateSlide(current - 1);
      } else if (deltaX < 0 && current < slides.length - 1) {
        navigateSlide(current + 1);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 bg-[#030014] relative overflow-hidden"
      dir="rtl"
    >
      {/* Deep space background with gradient */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base background with gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-[#0F0728] via-[#070219] to-[#030014]"></div>

        {/* Subtle light beams */}
        <motion.div
          className="absolute top-0 left-1/4 w-[2px] h-[30vh] bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"
          style={{
            left: lightBeam1Left,
          }}
          animate={{
            height: ["30vh", "40vh", "30vh"],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute top-0 right-1/3 w-[1px] h-[20vh] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
          style={{
            right: lightBeam2Right,
          }}
          animate={{
            height: ["20vh", "25vh", "20vh"],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      {/* Main slider container with glass effect */}
      <div
        ref={containerRef}
        className="max-w-6xl w-full h-[650px] rounded-[30px] overflow-hidden relative z-10 perspective-1200"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Glass border effect */}
        <div className="absolute inset-0 rounded-[30px] z-20 pointer-events-none">
          <div className="absolute inset-0 rounded-[30px] border border-white/10 "></div>
          <div className="absolute inset-0 rounded-[30px] bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50"></div>
        </div>

        {/* Main slider with 3D perspective effect */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 transform-style-3d"
          >
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              fill
              className="object-cover"
              priority
              draggable="false"
            />

            {/* Content overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center px-8">
              {/* Animated accent line */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "80px", opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{ backgroundColor: slides[current].color }}
                className="h-1 rounded-full mb-8"
              />

              <AnimatePresence mode="wait">
                <motion.h2
                  key={`title-${current}`}
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-white text-5xl md:text-6xl font-bold text-center mb-6 tracking-tight"
                >
                  <span className="relative">
                    {slides[current].title}
                    <motion.span
                      className="absolute -bottom-2 left-0 h-[6px] rounded-"
                      style={{ backgroundColor: slides[current].color }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    />
                  </span>
                </motion.h2>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`subtitle-${current}`}
                  variants={subtitleVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-gray-200 text-xl md:text-2xl text-center max-w-2xl mt-2 font-light"
                >
                  {slides[current].subtitle}
                </motion.p>
              </AnimatePresence>

              {/* Call to action button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="mt-10 px-8 py-3 rounded-full text-white font-medium"
                style={{
                  background: `linear-gradient(90deg, ${slides[current].color}, ${slides[current].color}CC)`,
                  boxShadow: `0 10px 25px -5px ${slides[current].color}80`,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 15px 30px -5px ${slides[current].color}80`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                اکتشاف کنید
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation controls with glass neomorphism */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center gap-6 z-30">
          {/* Previous button */}
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() =>
              navigateSlide(current > 0 ? current - 1 : slides.length - 1)
            }
            className={`flex items-center justify-center w-14 h-14 rounded-full border border-white/20 backdrop-blur-xl ${
              current === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
            disabled={current === 0}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              boxShadow:
                "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            <IoIosArrowForward size={24} className="text-white" />
          </motion.button>

          {/* Slide indicators */}
          <div className="flex gap-3 mx-4">
            {slides.map((slide, index) => (
              <motion.button
                key={slide.id}
                variants={indicatorVariants}
                initial="inactive"
                animate={current === index ? "active" : "inactive"}
                whileHover="hover"
                className="h-2 rounded-full"
                onClick={() => navigateSlide(index)}
              />
            ))}
          </div>

          {/* Next button */}
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() =>
              navigateSlide(current < slides.length - 1 ? current + 1 : 0)
            }
            className={`flex items-center justify-center w-14 h-14 rounded-full border border-white/20 backdrop-blur-xl ${
              current === slides.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100"
            }`}
            disabled={current === slides.length - 1}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              boxShadow:
                "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            <IoIosArrowBack size={24} className="text-white" />
          </motion.button>

          {/* Autoplay toggle button */}
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={toggleAutoplay}
            className="absolute -right-20 flex items-center justify-center w-12 h-12 rounded-full border border-white/20 backdrop-blur-xl"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              boxShadow:
                "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            {isAutoPlaying ? (
              <RiPauseFill size={20} className="text-white" />
            ) : (
              <RiPlayFill size={20} className="text-white" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Slide number indicator */}
      <div className="absolute bottom-12 right-12 text-white/70 font-mono text-sm z-20">
        <motion.span
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {(current + 1).toString().padStart(2, "0")}
        </motion.span>
        <span className="mx-1">/</span>
        <span>{slides.length.toString().padStart(2, "0")}</span>
      </div>
    </div>
  );
};

export default HeroSection;
