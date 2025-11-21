import { useState } from "react";

export default function PlanAddModal({ onClose, onAdd }) {
  
  const [activity, setActivity] = useState({ 
    time: "", endTime: "", title: "", type: "sightseeing", note: "" 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(activity); // Gửi dữ liệu ra ngoài cho file cha
  };

  // Helper style cho nút chọn loại
  const getIcon = (type) => {
      const map = { sightseeing: "fas fa-camera", food: "fas fa-utensils", transport: "fas fa-taxi", hotel: "fas fa-bed", flight: "fas fa-plane" };
      return map[type];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4 animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Add Activity</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Chọn loại hoạt động */}
          <div className="grid grid-cols-5 gap-2">
            {['sightseeing', 'food', 'transport', 'hotel', 'flight'].map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setActivity({...activity, type})}
                className={`flex flex-col items-center justify-center p-2 rounded-lg border transition ${activity.type === type ? "bg-blue-50 border-blue-500 text-blue-600 ring-1 ring-blue-500" : "bg-gray-50 border-gray-200 hover:bg-gray-100"}`}
              >
                <i className={`${getIcon(type)} mb-1`}></i>
                <span className="text-[10px] font-bold capitalize">{type}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input type="time" required className="border rounded-lg p-2.5 outline-none focus:border-blue-500" value={activity.time} onChange={e => setActivity({...activity, time: e.target.value})} />
            <input type="time" className="border rounded-lg p-2.5 outline-none focus:border-blue-500" value={activity.endTime} onChange={e => setActivity({...activity, endTime: e.target.value})} />
          </div>
          <input type="text" required placeholder="Activity Name" className="w-full border rounded-lg p-2.5 outline-none focus:border-blue-500" value={activity.title} onChange={e => setActivity({...activity, title: e.target.value})} />
          <textarea placeholder="Notes..." rows="2" className="w-full border rounded-lg p-2.5 outline-none focus:border-blue-500" value={activity.note} onChange={e => setActivity({...activity, note: e.target.value})}></textarea>
          
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition">Save Activity</button>
        </form>
      </div>
    </div>
  );
}