"use client";
import { AnimatePresence, motion, HTMLMotionProps } from "framer-motion";
import { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaCopyright,
  FaChevronUp,
} from "react-icons/fa";

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const footerItems = [
    {
      icon: FaGithub,
      title: "Github",
      link: "https://github.com",
    },
    {
      icon: FaLinkedin,
      title: "LinkedIn",
      link: "https://linkedin.com",
    },
    {
      icon: FaInstagram,
      title: "Instagram",
      link: "https://instagram.com",
    },
    {
      icon: FaTwitter,
      title: "Twitter",
      link: "https://twitter.com",
    },
  ];

  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:p-0"
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -top-8 left-1/2 -translate-x-1/2 
                   bg-gray-200/20 backdrop-blur-sm p-3 rounded-full
                   border border-gray-500/50 text-gray-300
                   hover:text-yellow-400 transition-colors
                   lg:hidden"
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronUp size={20} />
        </motion.div>
      </motion.button>

      <motion.div
        initial={{ height: "4rem" }}
        animate={{
          height: isExpanded ? "22rem" : "3.5rem",
          opacity: 1,
        }}
        onHoverStart={() => window.innerWidth >= 1024 && setIsExpanded(true)}
        onHoverEnd={() => window.innerWidth >= 1024 && setIsExpanded(false)}
        className="mx-auto max-w-screen-xl bg-gray-200/20 backdrop-blur-md 
                   border-t border-gray-500/50 rounded-t-3xl
                   flex flex-col items-center
                   overflow-hidden transition-all duration-300
                   lg:justify-center"
      >
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 p-6 w-full
                     lg:flex lg:justify-center lg:items-center lg:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // transition={{ delay: 0.2 }}
        >
          {footerItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="p-3 rounded-full bg-gray-800/50 text-gray-300
                          group-hover:bg-yellow-400 group-hover:text-gray-900
                          transition-colors duration-300"
              >
                <item.icon size={24} />
              </motion.div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    // exit={{ opacity: 0 }}
                    className="text-gray-300 font-medium"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.a>
          ))}
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex items-center gap-2 text-gray-400 text-sm pb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              // exit={{ opacity: 0 }}
            >
              <FaCopyright size={14} />
              <span>2025 Content Factory. All rights reserved.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
