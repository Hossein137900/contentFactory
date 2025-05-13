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

const slides = [
  {
    id: 1,
    image: "/assets/images/cam1.jpg",
    title: "Welcome to Content Factory",
    subtitle: "Where creativity meets innovation",
    color: "#8B5CF6", // Violet
  },
  {
    id: 2,
    image: "/assets/images/cam2.jpg",
    title: "Create Amazing Content",
    subtitle: "Elevate your digital presence",
    color: "#EC4899", // Pink
  },
  {
    id: 3,
    image: "/assets/images/cam3.jpg",
    title: "Grow Your Business",
    subtitle: "Scale with confidence",
    color: "#3B82F6", // Blue
  },
  {
    id: 4,
    image: "/assets/images/cam1.jpg",
    title: "Scale Your Impact",
    subtitle: "Reach new audiences",
    color: "#10B981", // Emerald
  },
  {
    id: 5,
    image: "/assets/images/cam2.jpg",
    title: "Transform Your Brand",
    subtitle: "Stand out in the digital universe",
    color: "#F59E0B", // Amber
  },
];

// Generate stars with depth layers for parallax
const generateStars = () => {
  // Create 3 layers of stars with different parallax factors
  const layers = [
    {
      count: 80,
      size: [0.5, 1.5],
      opacity: [0.3, 0.6],
      factor: 10,
      speed: [3, 6],
    },
    {
      count: 50,
      size: [1, 2.5],
      opacity: [0.5, 0.8],
      factor: 20,
      speed: [4, 8],
    },
    {
      count: 30,
      size: [1.5, 3],
      opacity: [0.6, 0.9],
      factor: 30,
      speed: [5, 10],
    },
  ];

  let allStars: any[] = [];

  layers.forEach((layer, layerIndex) => {
    const stars = Array.from({ length: layer.count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (layer.size[1] - layer.size[0]) + layer.size[0],
      opacity:
        Math.random() * (layer.opacity[1] - layer.opacity[0]) +
        layer.opacity[0],
      animationDuration:
        Math.random() * (layer.speed[1] - layer.speed[0]) + layer.speed[0],
      animationDelay: Math.random() * 5,
      parallaxFactor: layer.factor,
      layer: layerIndex,
    }));

    allStars = [...allStars, ...stars];
  });

  return allStars;
};

// Generate cosmic elements
const generateCosmicElements = (count: number) => {
  return Array.from({ length: count }, () => {
    const hue = Math.floor(Math.random() * 360);
    const size = Math.random() * 100 + 50;

    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      size,
      color: `hsla(${hue}, 70%, 60%, 0.15)`,
      animationDuration: Math.random() * 20 + 15,
      animationDelay: Math.random() * 10,
      parallaxFactor: Math.random() * 40 + 10,
      rotation: Math.random() * 360,
    };
  });
};

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

  // Mouse position for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothed mouse values for more natural movement
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Generate stars and cosmic elements
  const stars = useRef(generateStars());
  const cosmicElements = useRef(generateCosmicElements(5));

  // Progress animation
  const progressAnimation = useAnimation();

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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-[#030014] relative overflow-hidden">
      {/* Deep space background with stars and cosmic elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base background with gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-[#0F0728] via-[#070219] to-[#030014]"></div>

        {/* Cosmic elements - nebulae, gas clouds, etc. */}
        {cosmicElements.current.map((element, i) => {
          const elementX = useTransform(
            smoothMouseX,
            [-0.5, 0.5],
            [
              `${element.x - element.parallaxFactor * 0.05}%`,
              `${element.x + element.parallaxFactor * 0.05}%`,
            ]
          );

          const elementY = useTransform(
            smoothMouseY,
            [-0.5, 0.5],
            [
              `${element.y - element.parallaxFactor * 0.05}%`,
              `${element.y + element.parallaxFactor * 0.05}%`,
            ]
          );

          return (
            <motion.div
              key={`cosmic-${i}`}
              className="absolute rounded-full blur-3xl"
              style={{
                width: `${element.size}px`,
                height: `${element.size}px`,
                background: element.color,
                left: elementX,
                top: elementY,
                transform: `rotate(${element.rotation}deg)`,
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.1, 1],
                rotate: [
                  element.rotation,
                  element.rotation + 10,
                  element.rotation,
                ],
              }}
              transition={{
                duration: element.animationDuration,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          );
        })}

        {/* Stars with parallax effect */}
        {stars.current.map((star, i) => {
          // Create transforms for each star based on mouse position and layer
          const parallaxStrength = star.parallaxFactor * 0.05;

          const starX = useTransform(
            smoothMouseX,
            [-0.5, 0.5],
            [`${star.x - parallaxStrength}%`, `${star.x + parallaxStrength}%`]
          );

          const starY = useTransform(
            smoothMouseY,
            [-0.5, 0.5],
            [`${star.y - parallaxStrength}%`, `${star.y + parallaxStrength}%`]
          );

          return (
            <motion.div
              key={`star-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: "white",
                boxShadow: `0 0 ${star.size * 1.5}px rgba(255, 255, 255, ${
                  star.opacity
                })`,
                left: starX,
                top: starY,
                opacity: star.opacity,
              }}
              animate={{
                opacity: [star.opacity, star.opacity * 1.5, star.opacity],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: star.animationDuration,
                delay: star.animationDelay,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          );
        })}

        {/* Subtle light beams */}
        <motion.div
          className="absolute top-0 left-1/4 w-[2px] h-[30vh] bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"
          style={{
            left: useTransform(smoothMouseX, [-0.5, 0.5], ["20%", "30%"]),
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
            right: useTransform(smoothMouseX, [-0.5, 0.5], ["30%", "35%"]),
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

        {/* Reactive color overlay based on current slide */}
        <motion.div
          className="absolute inset-0 z-10 mix-blend-soft-light"
          animate={{
            backgroundColor: slides[current].color,
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

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
                      className="absolute -bottom-2 left-0 h-[6px] rounded-full"
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
                Explore Now
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/20 rounded-full overflow-hidden z-30">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: progressColor }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={progressAnimation}
          />
        </div>

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
            <IoIosArrowBack size={24} className="text-white" />
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
            <IoIosArrowForward size={24} className="text-white" />
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

        {/* Floating particles inside the slider with mouse interaction */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => {
            const particleSize = Math.random() * 3 + 1;
            const particleX = useTransform(
              smoothMouseX,
              [-0.5, 0.5],
              [`${Math.random() * 100 - 10}%`, `${Math.random() * 100 + 10}%`]
            );

            const particleY = useTransform(
              smoothMouseY,
              [-0.5, 0.5],
              [`${Math.random() * 100 - 5}%`, `${Math.random() * 100 + 5}%`]
            );

            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: particleSize + "px",
                  height: particleSize + "px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  boxShadow: "0 0 4px rgba(255, 255, 255, 0.8)",
                  left: particleX,
                  top: particleY,
                }}
                animate={{
                  y: [0, -30],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            );
          })}
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

      {/* Add CSS classes to your global styles */}

      {/* Floating orbs with glass effect */}
      <motion.div
        className="absolute w-32 h-32 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 70%)",
          boxShadow:
            "inset 0 0 20px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          left: useTransform(smoothMouseX, [-0.5, 0.5], ["10%", "15%"]),
          top: useTransform(smoothMouseY, [-0.5, 0.5], ["20%", "25%"]),
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute w-24 h-24 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 70%)",
          boxShadow:
            "inset 0 0 15px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          right: useTransform(smoothMouseX, [-0.5, 0.5], ["15%", "20%"]),
          bottom: useTransform(smoothMouseY, [-0.5, 0.5], ["25%", "30%"]),
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />

      {/* Animated rings */}
      <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="w-40 h-40 rounded-full border border-white/10"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0 w-40 h-40 rounded-full border border-white/10"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute inset-0 w-40 h-40 rounded-full border border-white/10"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
        />
      </div>

      {/* Animated rings on the other side */}
      <div className="absolute right-1/4 bottom-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="w-32 h-32 rounded-full border border-white/10"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute inset-0 w-32 h-32 rounded-full border border-white/10"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 1.5,
          }}
        />
        <motion.div
          className="absolute inset-0 w-32 h-32 rounded-full border border-white/10"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 2.5,
          }}
        />
      </div>

      {/* Animated light beams */}
      <motion.div
        className="absolute h-[200px] w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"
        style={{
          left: useTransform(smoothMouseX, [-0.5, 0.5], ["70%", "75%"]),
          top: useTransform(smoothMouseY, [-0.5, 0.5], ["10%", "15%"]),
          transform: "rotate(30deg)",
        }}
        animate={{
          opacity: [0, 0.7, 0],
          height: ["150px", "200px", "150px"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute h-[150px] w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent"
        style={{
          left: useTransform(smoothMouseX, [-0.5, 0.5], ["25%", "30%"]),
          bottom: useTransform(smoothMouseY, [-0.5, 0.5], ["20%", "25%"]),
          transform: "rotate(-20deg)",
        }}
        animate={{
          opacity: [0, 0.5, 0],
          height: ["100px", "150px", "100px"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />
    </div>
  );
};

// Add these CSS classes to your global styles
const globalStyles = `
.perspective-1200 {
  perspective: 1200px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.bg-gradient-radial {
  background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 50%, var(--tw-gradient-to) 100%);
}
`;

export default HeroSection;
