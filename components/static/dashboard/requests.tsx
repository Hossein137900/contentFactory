"use client";
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { toast } from 'react-hot-toast';

// Request type definition based on the API
interface Request {
  _id: string;
  name: string;
  phoneNumber: string;
  title: string;
  message: string;
  type: string;
  status: string;
  createdAt: string;
}

export const Requests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<Request | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    title: "",
    message: "",
    type: "content",
  });

  const services = [
    { value: "content", label: "تولید محتوا" },
    { value: "photo", label: "عکاسی صنعتی" },
    { value: "video", label: "ویدیو مارکتینگ" },
    { value: "social", label: "مدیریت شبکه‌های اجتماعی" },
  ];

  // Fetch user requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('لطفا وارد حساب کاربری خود شوید');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/request/userId', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
        });

        if (!response.ok) {
          throw new Error('خطا در دریافت درخواست‌ها');
        }

        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
        toast.error('خطا در دریافت درخواست‌ها');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handle edit request
  const handleEdit = (request: Request) => {
    setCurrentRequest(request);
    setFormData({
      name: request.name,
      phoneNumber: request.phoneNumber,
      title: request.title,
      message: request.message,
      type: request.type,
    });
    setShowEditModal(true);
  };

  // Handle delete request
  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این درخواست اطمینان دارید؟')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/request/userId', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: token || '',
        },
        body: JSON.stringify({
          body: { _id: id }
        }),
      });

      if (!response.ok) {
        throw new Error('خطا در حذف درخواست');
      }

      toast.success('درخواست با موفقیت حذف شد');
      setRequests(requests.filter(req => req._id !== id));
    } catch (error) {
      console.error('Error deleting request:', error);
      toast.error('خطا در حذف درخواست');
    }
  };

  // Handle update request
  const handleUpdate = async () => {
    if (!currentRequest) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/request/userId', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          token: token || '',
        },
        body: JSON.stringify({
          body: {
            _id: currentRequest._id,
            userId: currentRequest._id, // This should be the actual userId
            name: formData.name,
            phoneNumber: formData.phoneNumber,
            title: formData.title,
            request: formData.message,
            type: formData.type,
            status: currentRequest.status,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('خطا در بروزرسانی درخواست');
      }

      toast.success('درخواست با موفقیت بروزرسانی شد');
      
      // Update the local state
      setRequests(requests.map(req => 
        req._id === currentRequest._id 
          ? {...req, 
              name: formData.name, 
              phoneNumber: formData.phoneNumber, 
              title: formData.title, 
              message: formData.message, 
              type: formData.type
            } 
          : req
      ));
      
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating request:', error);
      toast.error('خطا در بروزرسانی درخواست');
    }
  };

  // Get service label by value
  const getServiceLabel = (value: string) => {
    const service = services.find(s => s.value === value);
    return service ? service.label : value;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 mx-20" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-gray-200">درخواست‌های من</h2>
      
      {requests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">شما هنوز درخواستی ثبت نکرده‌اید.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {requests.map((request) => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{request.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(request.createdAt)} | {getServiceLabel(request.type)}
                    </p>
                  </div>
                  <div className="flex space-x-2 space-x-reverse">
                    <button
                      onClick={() => handleEdit(request)}
                      className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(request._id)}
                      className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">نام و نام خانوادگی</p>
                    <p className="font-medium">{request.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">شماره تماس</p>
                    <p className="font-medium">{request.phoneNumber}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500">توضیحات</p>
                  <p className="mt-1 text-gray-700">{request.message}</p>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500">وضعیت</p>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'completed' ? 'bg-green-100 text-green-800' :
                    request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {request.status === 'pending' ? 'در انتظار بررسی' :
                     request.status === 'completed' ? 'تکمیل شده' :
                     request.status === 'rejected' ? 'رد شده' : request.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">ویرایش درخواست</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <FaTimes />
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-gray-700 mb-2">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    value={formData.name}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:outline-none focus:border-transparent"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                
                <div className="relative">
                  <label className="block text-gray-700 mb-2">شماره تماس</label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:outline-none focus:border-transparent"
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-gray-700 mb-2">موضوع</label>
                <input
                  type="text"
                  value={formData.title}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:outline-none focus:border-transparent"
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-gray-700 mb-2">نوع خدمات موردنیاز</label>
                <select
                  className="w-full p-3 border border-gray-200 focus:outline-none rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  {services.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className="block text-gray-700 mb-2">پیام</label>
                <textarea
                  rows={6}
                  value={formData.message}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:outline-none focus:border-transparent"
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  انصراف
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="px-6 py-2 bg-gradient-to-r from-[#2563eb] to-[#60a5fa] text-white rounded-lg hover:shadow-md transition-all"
                >
                  ذخیره تغییرات
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
