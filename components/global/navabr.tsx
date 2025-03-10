"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaHome,
  FaVideo,
  FaImages,
  FaUserAlt,
  FaEnvelope,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: FaHome, title: "خانه" },
    { icon: FaVideo, title: "ویدیوها" },
    { icon: FaImages, title: "گالری" },
    { icon: FaUserAlt, title: "درباره ما" },
    { icon: FaEnvelope, title: "تماس" },
  ];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
      <motion.nav
        initial={false}
        animate={{ width: isOpen ? "16rem" : "5rem" }}
        onHoverStart={() => setIsOpen(true)}
        onHoverEnd={() => setIsOpen(false)}
        className="h-auto bg-gray-200/20 backdrop-blur-sm 
               border-l border-gray-500/50
               flex flex-col items-start p-4
               rounded-[40px]"
      >
        {menuItems.map((item, index) => (
          <motion.a
            key={index}
            href="#"
            className="flex items-center w-full gap-4 p-3 
                 text-gray-300 hover:text-yellow-400
                 rounded-xl hover:bg-gray-800/50
                 transition-colors group"
            whileHover={{ x: -8 }}
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            dir="rtl"
          >
            <div className=" flex items-center justify-center">
              <item.icon size={24} />
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              className="font-medium text-right whitespace-nowrap"
            >
              {item.title}
            </motion.span>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isOpen ? 1 : 0 }}
              className="absolute left-2 w-1 h-1 rounded-full
                       bg-yellow-400 opacity-0 group-hover:opacity-100"
            />
          </motion.a>
        ))}
      </motion.nav>
    </div>
  );
};

export default Navbar;
