"use client";
import React, { JSX, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaUsers,
  FaPlus,
  FaTasks,
  FaUser,
} from "react-icons/fa";
import { User } from "@/components/static/adminComponent/user";
import { Carts } from "@/components/static/adminComponent/carts";
import EditBlog from "@/components/static/adminComponent/editBlog";
import { useRouter } from "next/navigation";
import AddBlogPage from "../addBlog/page";
import ContentForm from "../addContent/page";



type SidebarItem = "carts" | "users" | "blog" | "Addblog" | "profile" | "content";

  

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
  const items: Array<{ key: SidebarItem; label: string; icon: JSX.Element }> = [
      { key: "carts", label: "سفارشات", icon: <FaShoppingCart size={18} /> },
      { key: "users", label: "کاربران", icon: <FaUsers size={18} /> },
      { key: "Addblog", label: "افزودن بلاگ", icon: <FaPlus size={18} /> },
      { key: "blog", label: "مدیریت بلاگ", icon: <FaTasks size={18} /> },
      { key: "profile", label: "مدیریت پروفایل", icon: <FaUser size={18} /> },
      { key: "content", label: "افزودن محتوا", icon: <FaPlus size={18} /> },
    ];
  
  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ type: "spring", stiffness: 300, damping: 50 }}
      className="w-64 bg-gray-800 text-white h-screen p-4 fixed right-0 top-0 z-[10000]"
    >
      <h2 className="text-xl font-bold mb-6">پنل ادمین</h2>
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

const AdminContent: React.FC<{ selected: SidebarItem }> = ({ selected }) => {
  switch (selected) {
    case "users":
      return <User />;
    case "blog":
      return <EditBlog />;
    case "Addblog":
      return <AddBlogPage />;
    case "carts":
      return <Carts />;
    case "content":
      return <ContentForm />;
    default:
      return <User />;
  }
};


const AdminPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<SidebarItem>("users");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/auth");
        return;
      }

      try {
        const response = await fetch("/api/auth/login", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        if (!response.ok) {
          router.push("/");
          return;
        }

        const data = await response.json();
        if (data.message !== "Admin access granted") {
          router.push("/");
        }
        if (data.message === "Admin access granted") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error(error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [router]);
  useEffect(() => {
    document.title = "مدرن لایت -  ادمین";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", " ادمین - مدرن لایت");
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  if (loading && !isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500 border-solid"></div>
      </div>
    );
  }
  return (
    <div
      className="min-h-screen bg-gradient-to-l from-[#16222A] to-[#3A6073] text-yellow-500"
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
              className="text-2xl mt-24 lg:mt-4 text-gray-300 focus:outline-none"
            >
              {sidebarOpen ? "✖" : "☰"}
            </button>
          </div>
          <AdminContent selected={selectedItem} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
