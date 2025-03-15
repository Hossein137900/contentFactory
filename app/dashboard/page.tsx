"use client";
import React, { useState, JSX, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaUserEdit, FaChartBar } from "react-icons/fa";
import Profile from "@/components/static/dashboard/profile";
import {Requests} from "@/components/static/dashboard/requests";

type SidebarItem = "reqests" | "profile" ;

const sidebarVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: "0%", opacity: 1 },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
};

const Sidebar: React.FC<{
  selected: SidebarItem;
  onSelect: (item: SidebarItem) => void;
  onClose: () => void;
}> = ({ selected, onSelect, onClose }) => {
  const items: { key: SidebarItem; label: string; icon: JSX.Element }[] = [
    { key: "reqests", label: "درخواست ها ", icon: <FaShoppingCart size={18} /> },
    {
      key: "profile",
      label: "بروزرسانی پروفایل",
      icon: <FaUserEdit size={18} />,
    },
  ];

  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ type: "spring", stiffness: 300, damping: 50 }}
      className="w-64 bg-gray-800 text-white h-screen p-4 fixed  right-0 top-0 z-50"
    >
      <h2 className="text-xl font-bold mb-6">داشبورد</h2>
      <ul>
        {items.map((item) => (
          <li key={item.key}>
            <button
              onClick={() => {
                onSelect(item.key);
                onClose();
              }}
              className={`w-full text-left flex items-center px-4 py-2 rounded mb-2 transition-colors duration-200 ${
                selected === item.key ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
            >
              <span className="ml-2 text-yellow-400">{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const DashboardContent: React.FC<{ selected: SidebarItem }> = ({
  selected,
}) => {
  switch (selected) {
    case "reqests":
      return <Requests />;
    case "profile":
      return <Profile />;

  }
};
const DashboardPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<SidebarItem>("profile");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  useEffect(() => {
    document.title = "داشبورد - مدرن لایت";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", " داشبورد کاربر - مدرن لایت");
    }
  }, []);

  return (
    <div
      className="min-h-screen  bg-gradient-to-l from-[#16222A] to-[#3A6073] text-yellow-500"
      dir="rtl"
    >
      <div className="flex">
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                key="overlay"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black z-40"
                onClick={toggleSidebar}
              />
              <Sidebar
                key="sidebar"
                selected={selectedItem}
                onSelect={setSelectedItem}
                onClose={toggleSidebar}
              />
            </>
          )}
        </AnimatePresence>
        <div className="flex-1">
          <div className="flex items-center justify-between p-4 shadow">
            <button
              onClick={toggleSidebar}
              className="text-2xl text-gray-300 focus:outline-none"
            >
              {sidebarOpen ? "✖" : "☰"}
            </button>
           
          </div>
          <DashboardContent selected={selectedItem} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
