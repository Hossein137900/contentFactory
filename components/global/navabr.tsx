"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaHome,
  FaVideo,
  FaImages,
  FaUserAlt,
  FaEnvelope,
} from "react-icons/fa";
const menuItems = [
  {
    icon: FaHome,
    title: "خانه",
    color: "#4ade80",
    href: "/",
  },
  {
    icon: FaVideo,
    title: "ویدیوها",
    color: "#fb923c",
    href: "/videos",
  },
  {
    icon: FaImages,
    title: "گالری",
    color: "#60a5fa",
    href: "/gallery",
  },
  {
    icon: FaUserAlt,
    title: "درباره ما",
    color: "#f472b6",
    href: "/about",
  },
  {
    icon: FaEnvelope,
    title: "تماس",
    color: "#a78bfa",
    href: "/contact",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const DesktopNav = () => (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
      <motion.nav
        initial={{ width: "5rem" }}
        animate={{ width: isOpen ? "16rem" : "5rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="h-auto bg-gray-200/20 backdrop-blur-sm 
                 border-l border-gray-500/50
                 flex flex-col items-start p-4
                 rounded-[40px] relative"
      >
        {/* Active Item Indicator */}
        <AnimatePresence>
          <motion.div
            className="absolute right-4  h-14 rounded-xl bg-gray-700/40"
            initial={{ y: 0 }}
            animate={{ y: activeItem * 56 + 12 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {menuItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            onClick={() => setActiveItem(index)}
            className="flex items-center w-full gap-4 p-3 
                   text-gray-300 hover:text-[#2563eb]
                   rounded-xl z-10
                   transition-colors group relative"
            whileHover={{ x: -8 }}
            dir="rtl"
          >
            <div className="flex items-center justify-center relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: activeItem === index ? 1 : 0 }}
                className="absolute inset-0 rounded-full"
                // style={{ backgroundColor: `${item.color}30` }}
              />
              <item.icon
                size={24}
                color={activeItem === index ? item.color : "currentColor"}
              />
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="font-medium text-right whitespace-nowrap"
              style={{
                color: activeItem === index ? item.color : "currentColor",
              }}
            >
              {item.title}
            </motion.span>

            {/* Tooltip for collapsed state */}
            {/* <AnimatePresence>
              {!isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="absolute right-16 bg-gray-800 px-3 py-1 rounded-lg
                           text-sm whitespace-nowrap pointer-events-none
                           opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {item.title}
                </motion.div>
              )}
            </AnimatePresence> */}
          </motion.a>
        ))}

        {/* Active item progress indicator */}
        {/* <motion.div
          className="absolute left-4 top-0 h-1 w-1 rounded-full bg-gray-600/30"
          style={{ scale: isOpen ? 1 : 0 }}
        >
          <motion.div
            className="w-full py-5 rounded-full"
            style={{
              height: "100%",
              backgroundColor: menuItems[activeItem].color,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div> */}
      </motion.nav>
    </div>
  );

  const MobileNav = () => (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-4 p-4 bg-gray-200/20 backdrop-blur-sm rounded-full">
        {menuItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            onClick={() => setActiveItem(index)}
            className="p-2 text-gray-300 transition-colors relative"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              initial={false}
              animate={{
                backgroundColor:
                  activeItem === index ? `${item.color}30` : "transparent",
                scale: activeItem === index ? 1 : 0,
              }}
              className="absolute inset-0 rounded-full"
            />
            <item.icon
              size={24}
              color={activeItem === index ? item.color : "currentColor"}
            />
          </motion.a>
        ))}
      </nav>
    </div>
  );

  return isDesktop ? <DesktopNav /> : <MobileNav />;
};

export default Navbar;
