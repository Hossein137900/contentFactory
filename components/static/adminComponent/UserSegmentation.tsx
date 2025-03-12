// 'use client';

// import { useState, useEffect } from 'react';
// import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// const UserSegmentation = () => {
//   const [segmentData, setSegmentData] = useState([]);
  
//   useEffect(() => {
//     fetchSegmentData();
//   }, []);

//   const fetchSegmentData = async () => {
//     const response = await fetch('/api/analytics/segments');
//     const data = await response.json();
//     setSegmentData(data);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold mb-4">تحلیل گروه‌های کاربری</h2>
//       <div className="flex justify-between">
//         <div className="w-1/2">
//           <PieChart width={400} height={400}>
//             <Pie data={segmentData} dataKey="value" nameKey="name" />
//             <Tooltip />
//           </PieChart>
//         </div>
//         <div className="w-1/2">
//           {/* Segment details */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserSegmentation;
