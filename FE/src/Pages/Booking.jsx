import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import BookingCard from "../Components/BookingCard";
import BookingModal from "../Components/BookingModal";

const MOCK_TOURS = [
  { id: 1, type: 'tour', image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500", title: "Bali Paradise Retreat", location: "Indonesia", price: 1200, duration: "5 Ngày", rating: 4.8 },
  { id: 2, type: 'tour', image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=500", title: "Kyoto Cherry Blossom", location: "Japan", price: 2500, duration: "6 Ngày", rating: 4.9 },
  { id: 3, type: 'tour', image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=500", title: "Hoi An Ancient Town", location: "Vietnam", price: 800, duration: "3 Ngày", rating: 4.7 },
];
const MOCK_HOTELS = [
  { id: 101, type: 'hotel', image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500", title: "InterContinental Danang", location: "Da Nang, VN", price: 450, duration: "/ đêm", rating: 5.0 },
  { id: 102, type: 'hotel', image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500", title: "Marina Bay Sands", location: "Singapore", price: 800, duration: "/ đêm", rating: 4.9 },
];
const MOCK_FLIGHTS = [
  { id: 201, type: 'flight', logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Vietnam_Airlines_Logo.svg/2560px-Vietnam_Airlines_Logo.svg.png", airline: "Vietnam Airlines", from: "SGN", to: "HAN", time: "08:00 - 10:00", duration: "2h 00m", price: 150 },
  { id: 202, type: 'flight', logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/1200px-Qatar_Airways_Logo.svg.png", airline: "Qatar Airways", from: "HAN", to: "LHR", time: "23:00 - 06:30", duration: "13h 30m", price: 1200 },
];

export default function Booking() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("tours");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const getData = () => {
    const term = searchTerm.toLowerCase();
    if (activeTab === "tours") return MOCK_TOURS.filter(i => i.title.toLowerCase().includes(term));
    if (activeTab === "hotels") return MOCK_HOTELS.filter(i => i.title.toLowerCase().includes(term));
    if (activeTab === "flights") return MOCK_FLIGHTS.filter(i => i.airline.toLowerCase().includes(term) || i.to.toLowerCase().includes(term));
    return [];
  };

  const handleBookClick = (item) => {
    if (!currentUser) {
      alert("Please login to book!");
      navigate("/login");
      return;
    }
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* --- SEARCH SECTION (Có thể tách nốt phần này nếu muốn) --- */}
      <div className="relative bg-blue-600 pt-10 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-8">Explore the World with TripMind</h1>
          
          <div className="inline-flex bg-blue-800 p-1 rounded-xl mb-6">
            {['tours', 'hotels', 'flights'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-medium transition capitalize ${
                  activeTab === tab ? "bg-white text-blue-600 shadow" : "text-blue-200 hover:text-white"
                }`}
              >
                <i className={`fas mr-2 ${tab === 'tours' ? 'fa-map' : tab === 'hotels' ? 'fa-hotel' : 'fa-plane'}`}></i>
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white p-2 rounded-xl shadow-xl flex max-w-2xl mx-auto">
            <i className="fas fa-search text-gray-400 p-4"></i>
            <input
              type="text"
              placeholder={`Search for ${activeTab}...`}
              className="flex-1 outline-none text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-yellow-500 text-white px-8 rounded-lg font-bold hover:bg-yellow-600 transition">Search</button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl px-6 py-12 mx-auto -mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 capitalize">Top {activeTab} for you</h2>
        
        <div className={activeTab === 'flights' ? "space-y-4" : "grid grid-cols-1 md:grid-cols-3 gap-8"}>
          {getData().map((item) => (
            <BookingCard 
              key={item.id} 
              item={item} 
              onBook={handleBookClick} 
            />
          ))}
        </div>
      </div>

      {isModalOpen && selectedItem && (
        <BookingModal 
          item={selectedItem} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}