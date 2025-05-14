"use client";
import { useState, useRef, useEffect, createElement } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  MotionValue,
  motionValue,
} from "framer-motion";
import Image from "next/image";
import { FiArrowLeft, FiExternalLink, FiX } from "react-icons/fi";
import {
  WorkProject,
  processSteps,
  statsData,
  workCategories,
} from "../../data/worksShowcase";

// Define types for our work categories and projects

const WorksShowcase = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(titleRef, { once: false, margin: "-100px 0px" });
  const [isMobile, setIsMobile] = useState(false);

  // For parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacitySection = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  // Handle window resize for responsive adjustments
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get active category data
  const activeCategoryData = workCategories.find(
    (category) => category.id === activeCategory
  );

  // Handle category selection
  const handleCategoryClick = (categoryId: string) => {
    if (isMobile) {
      // On mobile, directly navigate to the category
      setActiveCategory(categoryId);
    } else {
      // On desktop, toggle the category
      setActiveCategory(activeCategory === categoryId ? null : categoryId);
    }
    setSelectedProject(null); // Reset selected project when changing category
  };

  // Handle project selection
  const handleProjectClick = (project: WorkProject) => {
    setSelectedProject(project);
  };

  // Handle back button click
  const handleBackClick = () => {
    setSelectedProject(null);
  };

  // Handle close category
  const handleCloseCategory = () => {
    setActiveCategory(null);
    setSelectedProject(null);
  };

  // Mouse position for hover effects
  const mouseX = useRef<MotionValue<number>>(motionValue(0));
  const mouseY = useRef<MotionValue<number>>(motionValue(0));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    // Calculate mouse position relative to the element (0 to 1)
    mouseX.current.set((clientX - left) / width);
    mouseY.current.set((clientY - top) / height);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#030014] py-20 px-4 md:px-8"
      dir="rtl" // RTL for Persian content
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050118] to-[#030014] opacity-80"></div>

      {/* Animated background image with parallax */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <Image
          src={
            activeCategoryData?.projects[0]?.image || "/assets/images/cam1.jpg"
          }
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent"></div>
      </motion.div>

      {/* Content container */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        style={{ opacity: opacitySection }}
      >
        {/* Section header with animated title */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
          >
            نمونه کارهای ما
          </motion.h2>

          <motion.div
            className="h-1 w-20 mx-auto rounded-full mb-6"
            style={{
              background: `linear-gradient(90deg, ${workCategories[0].color}, ${
                workCategories[workCategories.length - 1].color
              })`,
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={
              isInView
                ? { width: "120px", opacity: 1 }
                : { width: 0, opacity: 0 }
            }
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          <motion.p
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            نگاهی به پروژه‌های اخیر ما بیندازید و ببینید چگونه به مشتریان خود
            کمک کرده‌ایم تا به اهداف خود برسند
          </motion.p>
        </div>

        {/* Main content area */}
        <div className="relative">
          {/* Back button - visible when a category is selected on mobile */}
          <AnimatePresence>
            {activeCategory && isMobile && (
              <motion.button
                className="fixed top-4 right-4 z-50 bg-black/30 backdrop-blur-md text-white p-3 rounded-full flex items-center justify-center shadow-lg"
                onClick={handleCloseCategory}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiArrowLeft size={24} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Categories Grid - Only shown when no category is selected */}
          <AnimatePresence>
            {!activeCategory && (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 300,
                }}
              >
                {workCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    className="relative cursor-pointer transition-all duration-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => handleCategoryClick(category.id)}
                    whileHover={{ scale: 1.03 }}
                    onMouseMove={handleMouseMove}
                  >
                    <motion.div
                      className="relative aspect-square md:aspect-auto md:h-64 rounded-2xl overflow-hidden backdrop-blur-lg"
                      style={{
                        boxShadow: `0 10px 30px -5px ${category.color}40`,
                        border: `1px solid ${category.color}30`,
                      }}
                    >
                      {/* Gradient overlay */}
                      <motion.div
                        className="absolute inset-0 z-10"
                        style={{
                          background: `linear-gradient(135deg, ${category.color}40, transparent)`,
                        }}
                        whileHover={{
                          background: `linear-gradient(135deg, ${category.color}60, ${category.color}20)`,
                        }}
                      />

                      {/* Content */}
                      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center z-20">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                          style={{
                            backgroundColor: `${category.color}33`,
                            border: `1px solid ${category.color}66`,
                          }}
                        >
                          <span className="text-white text-2xl">
                            {category.icon && createElement(category.icon)}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">
                          {category.title}
                        </h3>

                        <p className="text-gray-300 text-sm">
                          {category.description}
                        </p>

                        <motion.div
                          className="mt-4 px-4 py-2 text-white/70 rounded-full text-sm"
                          style={{
                            background: `${category.color}33`,
                            border: `1px solid ${category.color}66`,
                          }}
                          whileHover={{
                            background: `${category.color}66`,
                          }}
                        >
                          {category.projects.length} پروژه
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Projects Grid - Shown when a category is selected */}
          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.div
                key={`projects-${activeCategory}`}
                className="w-full"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
              >
                {/* Category header with back button */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3
                    className="text-2xl font-bold text-center"
                    style={{ color: activeCategoryData?.color }}
                  >
                    {activeCategoryData?.title}
                  </h3>
                </motion.div>

                {/* Back button - positioned at the bottom with parent category color */}
                <motion.button
                  onClick={handleCloseCategory}
                  className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg"
                  style={{
                    backgroundColor: `${activeCategoryData?.color}20`,
                    color: activeCategoryData?.color,
                    border: `1px solid ${activeCategoryData?.color}50`,
                    boxShadow: `0 8px 20px -5px ${activeCategoryData?.color}40`,
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ type: "spring", damping: 20 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: `${activeCategoryData?.color}30`,
                    boxShadow: `0 12px 25px -5px ${activeCategoryData?.color}60`,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiArrowLeft />
                  <span>بازگشت به {activeCategoryData?.title}</span>
                </motion.button>

                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeCategoryData?.projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="relative cursor-pointer rounded-xl overflow-hidden group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => handleProjectClick(project)}
                      whileHover={{ scale: 1.02 }}
                      onMouseMove={handleMouseMove}
                    >
                      {/* Project image */}
                      <div className="relative aspect-video">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Gradient overlay */}
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background: `linear-gradient(to top, ${activeCategoryData?.color}CC, transparent)`,
                          }}
                        />
                      </div>

                      {/* Project info */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300 group-hover:translate-y-0">
                        <h4 className="text-white text-lg font-bold mb-1">
                          {project.title}
                        </h4>
                        <p className="text-white/80 text-sm line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-xs px-2 py-1 rounded-full text-white"
                              style={{
                                backgroundColor: `${activeCategoryData?.color}66`,
                                border: `1px solid ${activeCategoryData?.color}AA`,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Project Detail Modal */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleBackClick} // Close when clicking outside
              >
                {/* Backdrop */}
                <motion.div
                  className="absolute inset-0 bg-black/80 backdrop-blur-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />

                {/* Modal content */}
                <motion.div
                  className="relative bg-[#0A0A1B] rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl"
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on content
                >
                  {/* Close button */}
                  <button
                    className="absolute top-4 left-4 z-50 bg-black/50 text-white p-2 rounded-full backdrop-blur-md"
                    onClick={handleBackClick}
                  >
                    <FiX size={20} />
                  </button>

                  {/* Project image */}
                  <div className="relative h-64 md:h-80">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#0A0A1B] to-transparent"
                      style={{
                        background: `linear-gradient(to top, #0A0A1B, ${activeCategoryData?.color}40 70%, transparent)`,
                      }}
                    />
                  </div>

                  {/* Project content */}
                  <div className="p-6 md:p-8 -mt-16 relative overflow-y-auto max-h-[50vh]">
                    <div className="flex flex-wrap items-center justify-between mb-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {selectedProject.title}
                      </h3>
                      <span
                        className="text-sm px-3 py-1 rounded-full mt-2 md:mt-0"
                        style={{
                          backgroundColor: `${activeCategoryData?.color}33`,
                          color: activeCategoryData?.color,
                          border: `1px solid ${activeCategoryData?.color}66`,
                        }}
                      >
                        {selectedProject.date}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {selectedProject.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-sm px-3 py-1 rounded-full text-white"
                          style={{
                            backgroundColor: `${activeCategoryData?.color}33`,
                            border: `1px solid ${activeCategoryData?.color}66`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Link button */}
                    {selectedProject.link && (
                      <motion.a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 rounded-full text-white font-medium"
                        style={{
                          background: `linear-gradient(90deg, ${activeCategoryData?.color}, ${activeCategoryData?.color}CC)`,
                          boxShadow: `0 10px 25px -5px ${activeCategoryData?.color}80`,
                        }}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: `0 15px 30px -5px ${activeCategoryData?.color}80`,
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="ml-2">مشاهده پروژه</span>
                        <FiExternalLink />
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Animated particles */}
          {[...Array(15)].map((_, i) => {
            const size = Math.random() * 4 + 2;
            const duration = Math.random() * 20 + 10;
            const initialX = Math.random() * 100;
            const initialY = Math.random() * 100;
            const delay = Math.random() * 5;
            const color =
              workCategories[Math.floor(Math.random() * workCategories.length)]
                .color;

            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  x: `${initialX}%`,
                  y: `${initialY}%`,
                  backgroundColor: color,
                  opacity: 0.4,
                }}
                animate={{
                  y: [`${initialY}%`, `${initialY - 30}%`],
                  opacity: [0, 0.7, 0],
                  scale: [1, 1.5, 0.8],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "linear",
                }}
              />
            );
          })}

          {/* Floating orbs with glass effect */}
          <motion.div
            className="absolute w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${workCategories[0].color}10 0%, ${workCategories[0].color}05 50%, transparent 70%)`,
              boxShadow: `inset 0 0 20px ${workCategories[0].color}20, 0 0 30px ${workCategories[0].color}10`,
              backdropFilter: "blur(5px)",
              border: `1px solid ${workCategories[0].color}10`,
              left: "10%",
              top: "20%",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          <motion.div
            className="absolute w-24 h-24 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${workCategories[2].color}10 0%, ${workCategories[2].color}05 50%, transparent 70%)`,
              boxShadow: `inset 0 0 15px ${workCategories[2].color}20, 0 0 20px ${workCategories[2].color}10`,
              backdropFilter: "blur(5px)",
              border: `1px solid ${workCategories[2].color}10`,
              right: "15%",
              bottom: "25%",
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -15, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2,
            }}
          />
        </div>

        {/* Animated rings */}
        <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
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

        {/* Mobile Category Navigation Pills - Only visible when no category is selected */}
        <AnimatePresence>
          {!activeCategory && isMobile && (
            <motion.div
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 bg-black/30 backdrop-blur-md rounded-full py-2 px-4 flex overflow-x-auto max-w-[90vw] no-scrollbar"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className="flex gap-2 px-2">
                {workCategories.map((category) => (
                  <motion.button
                    key={`mobile-pill-${category.id}`}
                    className="flex items-center gap-1 whitespace-nowrap px-3 py-1 rounded-full text-sm"
                    style={{
                      backgroundColor: `${category.color}33`,
                      color: category.color,
                      border: `1px solid ${category.color}66`,
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <span className="text-lg">
                      {createElement(category.icon)}
                    </span>
                    <span>{category.title}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating action button for mobile - to quickly return to categories */}
        <AnimatePresence>
          {activeCategory && isMobile && !selectedProject && (
            <motion.button
              className="fixed bottom-8 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${activeCategoryData?.color}, ${activeCategoryData?.color}CC)`,
                boxShadow: `0 5px 20px -5px ${activeCategoryData?.color}`,
              }}
              onClick={handleCloseCategory}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              whileTap={{ scale: 0.9 }}
            >
              <FiArrowLeft size={20} className="text-white" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Call to action */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            آماده همکاری با ما هستید؟
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            با ما تماس بگیرید تا درباره پروژه شما صحبت کنیم و راه‌حل‌های خلاقانه
            ارائه دهیم.
          </p>
          <motion.button
            className="px-8 py-3 rounded-full text-white font-medium"
            style={{
              background: `linear-gradient(90deg, ${workCategories[0].color}, ${workCategories[2].color})`,
              boxShadow: `0 8px 20px -5px ${workCategories[0].color}80`,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 12px 25px -5px ${workCategories[0].color}80`,
            }}
            whileTap={{ scale: 0.98 }}
          >
            تماس با ما
          </motion.button>
        </motion.div>

        {/* Our Process Section with React Icons */}
        <div className="mt-32 relative">
          {/* Staggered appearing text */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              فرآیند کار ما
            </motion.h3>

            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-12 max-w-4xl mx-auto">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-16 h-16 md:w-20 text-white/70 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}40, ${step.color}20)`,
                      border: `1px solid ${step.color}50`,
                    }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: `0 0 20px ${step.color}40`,
                    }}
                  >
                    {createElement(step.icon)}
                  </motion.div>
                  <h4 className="text-white font-bold text-lg">{step.title}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats with counting animation */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl backdrop-blur-sm"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  boxShadow: `0 10px 30px -5px ${stat.color}40`,
                }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold mb-2 flex justify-center"
                  style={{ color: stat.color }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    +
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  >
                    {stat.value}
                  </motion.span>
                  {stat.suffix && <span>{stat.suffix}</span>}
                </motion.div>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
export default WorksShowcase;
