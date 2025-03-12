"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { workExamples, WorkCategory, WorkExample } from "../../lib/works";
import Image from "next/image";
import WorkModal from "@/components/global/WorkModal";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsFileEarmarkText, BsCamera } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { RiPencilRuler2Line } from "react-icons/ri";
import { MdOutlineSocialDistance } from "react-icons/md";

export default function WorksPage() {
  const [selectedWork, setSelectedWork] = useState<WorkExample | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<
    WorkCategory | "All"
  >("All");

  const categoryIcons = {
    All: AiOutlineAppstore,
    "Content Strategy": BsFileEarmarkText,
    "Social Media": MdOutlineSocialDistance,
    "Video Production": BsCamera,
    Copywriting: FaPencilAlt,
    "Graphic Design": RiPencilRuler2Line,
  };

  const categoryMapping = {
    All: "همه",
    "Content Strategy": "استراتژی محتوا",
    "Social Media": "شبکه‌های اجتماعی",
    "Video Production": "تولید ویدیو",
    Copywriting: "متن‌نویسی",
    "Graphic Design": "طراحی گرافیک",
  };

  const categories: (WorkCategory | "All")[] = [
    "All",
    "Content Strategy",
    "Social Media",
    "Video Production",
    "Copywriting",
    "Graphic Design",
  ];

  const filteredWorks =
    selectedCategory === "All"
      ? workExamples
      : workExamples.filter((work) => work.category === selectedCategory);

  return (
    <>
      <main className="min-h-screen p-8 max-w-5xl mx-auto mt-24" dir="rtl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          نمونه‌کارهای خلاقانه ما
        </motion.h1>

        <div className="flex flex-wrap gap-1 justify-center mb-16">
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            return (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                aria-label={`Filter by ${categoryMapping[category]}`}
                role="button"

                title={categoryMapping[category]}                whileTap={{ scale: 0.95 }}
                className={`md:px-6 md:py-3 px-2 py-1 text-xs text-nowrap md:text-sm rounded-full flex items-center gap-2 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : " hover:bg-gray-200"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <Icon size={20} />
                {categoryMapping[category]}
              </motion.button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                onClick={() => setSelectedWork(work)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={work.imageUrl}
                    alt={work.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{work.title}</h3>
                  <p className="text-gray-600 mb-4">{work.description}</p>
                  {work.stats && (
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-bold">
                          {work.stats.views?.toLocaleString()}
                        </p>
                        <p className="text-gray-500">بازدید</p>
                      </div>
                      <div>
                        <p className="font-bold">{work.stats.engagement}</p>
                        <p className="text-gray-500">تعامل</p>
                      </div>
                      <div>
                        <p className="font-bold">{work.stats.reach}</p>
                        <p className="text-gray-500">دسترسی</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
      <WorkModal
        work={selectedWork!}
        isOpen={!!selectedWork}
        onClose={() => setSelectedWork(null)}
      />
    </>
  );
}
