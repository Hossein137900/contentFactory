'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaEnvelope } from 'react-icons/fa'; // Changed icon to envelope

interface Request {
  _id: string;
  title: string;
  name: string;
  phoneNumber: string;
  message: string;
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
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            className="fixed top-1/2  right-0 lg:right-1/4 -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 rounded-lg shadow-xl z-50 w-full max-w-md"
          >
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-white font-bold mb-2">{request.title}</h3>
                <p className="text-gray-300">نام: {request.name}</p>
                <p className="text-gray-300">شماره تماس: {request.phoneNumber}</p>
                <p className="text-gray-300">پیام: {request.message}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full mt-4 bg-yellow-400 text-gray-900 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
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
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6" dir="rtl">
      <h2 className="text-2xl font-bold my-6 text-stone-50">مدیریت درخواست‌ها</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white/10 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white/70">
            <tr>
              <th className="px-6 py-3 text-right">عنوان</th>
              <th className="px-6 py-3 text-right">نام</th>
              <th className="px-6 py-3 text-right">شماره تماس</th>
              <th className="px-6 py-3 text-right">تاریخ</th>
              <th className="px-6 py-3 text-right">جزئیات</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <motion.tr
                key={request._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-gray-700 hover:bg-white/5"
              >
                <td className="px-6 py-4 text-white">{request.title}</td>
                <td className="px-6 py-4 text-white">{request.name}</td>
                <td className="px-6 py-4 text-white">{request.phoneNumber}</td>
                <td className="px-6 py-4 text-white">
                  {new Date(request.createdAt).toLocaleDateString('fa-IR')}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleShowRequest(request)}
                    className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    <FaEnvelope />
                    مشاهده پیام
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
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
