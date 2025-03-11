"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaTag,
  FaComment,
  FaPhone,
  FaBuilding,
} from "react-icons/fa";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    service: "content",
  });

  const services = [
    { value: "content", label: "تولید محتوا" },
    { value: "photo", label: "عکاسی صنعتی" },
    { value: "video", label: "ویدیو مارکتینگ" },
    { value: "social", label: "مدیریت شبکه‌های اجتماعی" },
  ];

  const inputFields = [
    {
      name: "name",
      icon: <FaUser />,
      placeholder: "نام و نام خانوادگی",
      type: "text",
      required: true,
    },
    {
      name: "email",
      icon: <FaEnvelope />,
      placeholder: "ایمیل",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      icon: <FaPhone />,
      placeholder: "شماره تماس",
      type: "tel",
      required: true,
    },
    {
      name: "company",
      icon: <FaBuilding />,
      placeholder: "نام شرکت",
      type: "text",
      required: false,
    },
    {
      name: "subject",
      icon: <FaTag />,
      placeholder: "موضوع",
      type: "text",
      required: true,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div
      className="pt-16 pb-36 px-4 bg-gradient-to-b from-white to-gray-50"
      dir="rtl"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      >
        <div className="relative flex flex-col items-center gap-4 mb-12">
          <div className="absolute -top-6 w-32 h-32 bg-[#2563eb]/20 rounded-full blur-xl" />

          <div className="flex items-center gap-4 w-full max-w-2xl">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#2563eb]/80 to-transparent" />
            <h2 className="text-3xl font-bold text-center relative z-10 text-[#2563eb]">
              فرم تماس با ما
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-[#2563eb]/80 to-transparent" />
          </div>

          <span className="text-gray-600 text-lg font-medium mt-2 text-center">
            برای شروع همکاری فرم زیر را تکمیل کنید
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.map((field) => (
              <motion.div
                key={field.name}
                whileHover={{ scale: 1.01 }}
                className="relative"
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {field.icon}
                </div>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full pl-10 pr-4 placeholder:text-right py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:outline-none focus:border-transparent transition-all duration-300"
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                />
              </motion.div>
            ))}
          </div>

          <div className="relative">
            <label className="block text-gray-700 mb-2">
              نوع خدمات موردنیاز
            </label>
            <select
              className="w-full p-3 border border-gray-200 focus:outline-none  rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, service: e.target.value })
              }
            >
              {services.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>

          <motion.div whileHover={{ scale: 1.01 }} className="relative">
            <div className="absolute left-3 top-6 text-gray-400">
              <FaComment />
            </div>
            <textarea
              placeholder="پیام شما"
              rows={6}
              className="w-full pl-10 pr-4 py-3 border focus:outline-none  border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-300"
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            />
          </motion.div>

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="privacy"
              className="rounded text-[#2563eb]"
              required
            />
            <label htmlFor="privacy" className="text-sm text-gray-600">
              با قوانین و مقررات سایت موافقم
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r focus:outline-none  from-[#2563eb] to-[#60a5fa] text-white py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            ارسال درخواست
          </motion.button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            پس از ارسال فرم، کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت
          </p>
        </div>
      </motion.div>
    </div>
  );
}
