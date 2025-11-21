import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import PlanTimelineItem from "../Components/PlanTimelineItem";
import PlanAddModal from "../Components/PlanAddModal";

// Dữ liệu giả: Danh sách chuyến đi
const MY_TRIPS = [
  { id: 1, name: "Hè Đà Nẵng Rực Rỡ 🇻🇳", date: "21/08 - 23/08/2025", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400", days: 3 },
  { id: 2, name: "Mùa Thu Nhật Bản 🇯🇵", date: "10/11 - 15/11/2025", image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=400", days: 5 },
];

// Dữ liệu timeline 
const INITIAL_ITINERARY = {
  1: {
    1: [
      { id: 101, time: "08:00", endTime: "10:00", title: "Bay đến Đà Nẵng", type: "flight", note: "VN123 - Gate 4" },
      { id: 102, time: "10:30", endTime: "11:00", title: "Về khách sạn cất đồ", type: "transport", note: "Book Grab trước" },
      { id: 104, time: "14:00", endTime: "16:00", title: "Check-in InterContinental", type: "hotel", note: "Đưa mã booking: #REF999" },
    ],
    2: [], 3: []
  }
};

// Dữ liệu Checklist mẫu
const DEFAULT_CHECKLIST = [
  { id: 1, text: "Hộ chiếu / CCCD", checked: false },
  { id: 2, text: "Vé máy bay (In hoặc Lưu ảnh)", checked: false },
  { id: 3, text: "Kem chống nắng & Kính râm", checked: true },
  { id: 4, text: "Sạc dự phòng", checked: false },
];
export default function Plan() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  
  const [currentView, setCurrentView] = useState("list");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [itinerary, setItinerary] = useState(INITIAL_ITINERARY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  const [checklist, setChecklist] = useState(DEFAULT_CHECKLIST);
  const [newChecklistItem, setNewChecklistItem] = useState("");

  useEffect(() => { if (!currentUser) navigate("/login"); }, [currentUser, navigate]);

  const handleSelectTrip = (trip) => { setSelectedTrip(trip); setSelectedDay(1); setCurrentView("detail"); };
  
  const handleAddActivity = (newActivityData) => {
    const activity = { id: Date.now(), ...newActivityData };
    setItinerary(prev => ({
      ...prev,
      [selectedTrip.id]: {
        ...prev[selectedTrip.id],
        [selectedDay]: [...(prev[selectedTrip.id]?.[selectedDay] || []), activity].sort((a, b) => a.time.localeCompare(b.time))
      }
    }));
    setIsModalOpen(false); 
  };

  const toggleChecklist = (id) => { setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)); };
  const addChecklistItem = (e) => {
    e.preventDefault(); if (!newChecklistItem.trim()) return;
    setChecklist([...checklist, { id: Date.now(), text: newChecklistItem, checked: false }]); setNewChecklistItem("");
  };

  if (!currentUser) return null;

  // === VIEW LIST ===
  if (currentView === "list") {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Travel Plans 🗺️</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MY_TRIPS.map((trip) => (
              <div key={trip.id} onClick={() => handleSelectTrip(trip)} className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
                <div className="h-48 overflow-hidden relative">
                  <img src={trip.image} alt={trip.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-lg text-xs font-bold shadow">{trip.days} Days</div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800">{trip.name}</h3>
                  <p className="text-sm text-gray-500 mt-1"><i className="far fa-calendar-alt mr-2"></i>{trip.date}</p>
                </div>
              </div>
            ))}
             <div className="border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-8 text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 cursor-pointer transition h-full min-h-[250px]">
              <i className="fas fa-plus-circle text-4xl mb-2"></i><span className="font-bold">Create New Trip</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === VIEW DETAIL ===
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white border-b px-6 py-3 flex justify-between items-center shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentView("list")} className="p-2 hover:bg-gray-100 rounded-full text-gray-600"><i className="fas fa-arrow-left"></i></button>
          <div>
            <h1 className="text-lg font-bold text-gray-800">{selectedTrip.name}</h1>
            <p className="text-xs text-gray-500">{selectedTrip.date}</p>
          </div>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700"><i className="fas fa-share-alt mr-2"></i>Share</button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        
        <div className="flex-1 overflow-y-auto p-6 border-r bg-gray-50">
          <div className="max-w-2xl mx-auto">
            {/* Day Tabs */}
            <div className="flex space-x-2 overflow-x-auto mb-6 pb-2 scrollbar-hide">
              {Array.from({ length: selectedTrip.days }, (_, i) => i + 1).map((day) => (
                <button key={day} onClick={() => setSelectedDay(day)} className={`px-5 py-2 rounded-full font-bold text-sm transition whitespace-nowrap ${selectedDay === day ? "bg-black text-white shadow-md" : "bg-white text-gray-500 border border-gray-200"}`}>
                  Day {day}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Itinerary</h2>
              <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md">
                + Add Activity
              </button>
            </div>

            <div className="space-y-4 relative pl-4">
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-300"></div>
              {(itinerary[selectedTrip.id]?.[selectedDay] || []).length > 0 ? (
                itinerary[selectedTrip.id][selectedDay].map((item) => (
                  <PlanTimelineItem key={item.id} item={item} />
                ))
              ) : (
                <p className="pl-8 text-gray-400 italic">Trống. Hãy thêm hoạt động mới!</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-[400px] bg-white flex flex-col border-l">
           <div className="h-1/2 bg-blue-50 relative border-b flex items-center justify-center group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://mt.google.com/vt/lyrs=m&x=1325&y=3143&z=13')] bg-cover opacity-50 grayscale group-hover:grayscale-0 transition duration-500"></div>
              <div className="z-10 text-center">
                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-2 text-blue-600"><i className="fas fa-map-marked-alt text-xl"></i></div>
                 <p className="font-bold text-gray-700">View Route Map</p>
              </div>
           </div>

           <div className="h-1/2 flex flex-col">
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                 <h3 className="font-bold text-gray-800"><i className="fas fa-clipboard-check mr-2 text-green-600"></i>Packing List</h3>
                 <span className="text-xs bg-white px-2 py-1 rounded border">{checklist.filter(i => i.checked).length}/{checklist.length} Done</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                 {checklist.map(item => (
                    <div key={item.id} onClick={() => toggleChecklist(item.id)} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition">
                       <div className={`w-5 h-5 rounded border flex items-center justify-center transition ${item.checked ? 'bg-green-500 border-green-500' : 'border-gray-300 group-hover:border-green-400'}`}>
                          {item.checked && <i className="fas fa-check text-white text-xs"></i>}
                       </div>
                       <span className={`text-sm ${item.checked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item.text}</span>
                    </div>
                 ))}
              </div>
              <form onSubmit={addChecklistItem} className="p-3 border-t flex gap-2">
                 <input type="text" placeholder="Add item..." className="flex-1 text-sm border rounded-lg px-3 py-2 outline-none focus:border-blue-500" value={newChecklistItem} onChange={e => setNewChecklistItem(e.target.value)} />
                 <button type="submit" className="bg-gray-800 text-white w-8 h-8 rounded-lg hover:bg-black"><i className="fas fa-plus"></i></button>
              </form>
           </div>
        </div>
      </div>

      {isModalOpen && (
        <PlanAddModal 
          onClose={() => setIsModalOpen(false)} 
          onAdd={handleAddActivity} 
        />
      )}
    </div>
  );
}