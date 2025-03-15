import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaTimes,
} from "react-icons/fa";
import { useEffect, useRef } from "react";

interface SocialModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalPosition: {
    top: number;
    left?: number;
    right?: number;
  };
}
const socialItems = [
  {
    icon: FaGithub,
    title: "Github",
    link: "https://github.com",
    color: "#fff",
  },
  {
    icon: FaLinkedin,
    title: "LinkedIn",
    link: "https://linkedin.com",
    color: "#0077b5",
  },
  {
    icon: FaInstagram,
    title: "Instagram",
    link: "https://instagram.com",
    color: "#e4405f",
  },
  {
    icon: FaTwitter,
    title: "Twitter",
    link: "https://twitter.com",
    color: "#1da1f2",
  },
];

const SocialModal = ({ isOpen, onClose, modalPosition }: SocialModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!modalPosition) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-gray-200/10 fixed lg:top-[250px] lg:right-[260px] right-2 top-20 backdrop-blur-sm rounded-2xl p-1 md:p-4 border border-gray-100/20"
        >
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute -top-2 -left-2 p-1.5 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
          >
            <FaTimes size={12} className="text-gray-300" />
          </motion.button>

          <div className="flex flex-col lg:flex-row items-center gap-4">
            {socialItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl hover:bg-gray-700/50 transition-colors group"
              >
                <item.icon
                  size={24}
                  className="transition-colors group-hover:text-white"
                  color={item.color}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialModal;
