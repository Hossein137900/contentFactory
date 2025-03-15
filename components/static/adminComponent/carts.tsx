'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaCalendarAlt, FaUser, FaPhone } from 'react-icons/fa';

interface Request {
  _id: string;
  title: string;
  name: string;
  phoneNumber: string;
  message: string;
  type: string;
  createdAt: string;
}

const RequestModal = ({ 
  isOpen, 
  onClose, 
  request 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  request: Request;
}) => {
  if (!request) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-2xl z-50 w-full max-w-md border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="text-center">
                <span className="inline-block p-3 bg-yellow-400/10 rounded-full mb-2">
                  <FaEnvelope className="text-yellow-400 text-2xl" />
                </span>
                <h3 className="text-2xl font-bold text-white">{request.title}</h3>
                <p className="text-yellow-400/80 text-sm">{request.type}</p>
              </div>
              
              <div className="space-y-4 mt-6">
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                  <FaUser className="text-yellow-400" />
                  <div>
                    <p className="text-xs text-gray-400">نام</p>
                    <p className="text-white">{request.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                  <FaPhone className="text-yellow-400" />
                  <div>
                    <p className="text-xs text-gray-400">شماره تماس</p>
                    <p className="text-white">{request.phoneNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                  <FaCalendarAlt className="text-yellow-400" />
                  <div>
                    <p className="text-xs text-gray-400">تاریخ درخواست</p>
                    <p className="text-white">{new Date(request.createdAt).toLocaleDateString('fa-IR')}</p>
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-xs text-gray-400 mb-2">پیام</p>
                  <p className="text-white leading-relaxed">{request.message}</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-full mt-8 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-3 rounded-lg font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg shadow-yellow-400/20"
            >
              بستن
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const Carts = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/request');
      const data = await response.json();
      setRequests(data.requests);
      setLoading(false);
    } catch (error) {
      console.error('خطا در دریافت درخواست‌ها', error);
      toast.error('خطا در دریافت درخواست‌ها');
      setLoading(false);
    }
  };

  const handleShowRequest = (request: Request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-400 border-t-transparent"></div>
          <p className="mt-4 text-yellow-400 animate-pulse">در حال بارگذاری درخواست‌ها...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6" dir="rtl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">
          <span className="text-yellow-400">درخواست‌های</span> دریافتی
        </h2>
        <div className="bg-white/10 px-4 py-2 rounded-lg">
          <span className="text-white">{requests.length}</span>
          <span className="text-gray-400 mr-1">درخواست</span>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white/5 rounded-xl p-8 text-center">
          <FaEnvelope className="text-yellow-400 text-4xl mx-auto mb-4 opacity-50" />
          <p className="text-white text-lg">هیچ درخواستی یافت نشد</p>
          <p className="text-gray-400 mt-2">درخواست‌های جدید در اینجا نمایش داده خواهند شد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-20">
          {requests.map((request) => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-yellow-400/50 transition-all group"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                    {request.title}
                  </h3>
                  <span className="bg-yellow-400/20 text-yellow-400 text-xs px-2 py-1 rounded">
                    {request.type}
                  </span>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-300">
                    <FaUser className="text-yellow-400 mr-2" />
                    <span>{request.name}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <FaPhone className="text-yellow-400 mr-2" />
                    <span>{request.phoneNumber}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <FaCalendarAlt className="text-yellow-400 mr-2" />
                    <span>{new Date(request.createdAt).toLocaleDateString('fa-IR')}</span>
                  </div>
                </div>
                
                <p className="text-gray-400 line-clamp-2 mb-4">
                  {request.message}
                </p>
                
                <button
                  onClick={() => handleShowRequest(request)}
                  className="w-full bg-white/10 hover:bg-yellow-400 text-white hover:text-gray-900 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 group-hover:bg-yellow-400"
                >
                  <FaEnvelope />
                  مشاهده جزئیات
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {selectedRequest && (
        <RequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          request={selectedRequest}
        />
      )}
    </div>
  );
};
