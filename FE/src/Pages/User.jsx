import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

// --- DỮ LIỆU GIẢ: LỊCH SỬ ĐẶT VÉ ---
const MOCK_BOOKINGS = [
  {
    id: 101,
    tourName: "Kỳ nghỉ lãng mạn tại Santorini",
    date: "12/12/2025",
    status: "Upcoming", 
    price: 3200,
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 102,
    tourName: "Khám phá Thiên đường nhiệt đới Bali",
    date: "15/08/2025",
    status: "Completed", 
    price: 1200,
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 103,
    tourName: "Hành trình văn hóa Hội An",
    date: "02/05/2025",
    status: "Cancelled", 
    price: 800,
    image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=200&auto=format&fit=crop",
  },
];

export default function User() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl px-6 mx-auto">
        
        
        <div className="relative mb-8 bg-white shadow-lg rounded-2xl overflow-hidden">
          
          <div className="h-48 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
          
          <div className="px-8 pb-8">
            <div className="relative flex items-end -mt-12">
             
              <img 
                src="https://via.placeholder.com/150" 
                alt="Profile" 
                className="w-32 h-32 border-4 border-white rounded-full shadow-md bg-white"
              />
              
              <div className="flex-1 ml-6 mb-2 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{currentUser.name}</h1>
                  <p className="text-gray-500">{currentUser.email}</p>
                  <p className="text-sm text-blue-600 mt-1">
                    <i className="fas fa-gem mr-1"></i> Platinum Member
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <Link 
                    to="/setting" 
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border rounded-lg hover:bg-gray-200 transition"
                  >
                    Edit Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          <div className="space-y-6 lg:col-span-1">
            <div className="p-6 bg-white shadow-md rounded-xl">
              <h3 className="mb-4 text-lg font-bold text-gray-800">My Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                  <div className="flex items-center text-blue-600">
                    <i className="text-xl fas fa-plane-departure w-8"></i>
                    <span className="font-medium">Total Trips</span>
                  </div>
                  <span className="font-bold text-gray-800">12</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50">
                  <div className="flex items-center text-yellow-600">
                    <i className="text-xl fas fa-star w-8"></i>
                    <span className="font-medium">Reviews</span>
                  </div>
                  <span className="font-bold text-gray-800">8</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                  <div className="flex items-center text-green-600">
                    <i className="text-xl fas fa-coins w-8"></i>
                    <span className="font-medium">Points</span>
                  </div>
                  <span className="font-bold text-gray-800">2,450</span>
                </div>
              </div>
            </div>

            <div className="p-6 text-white bg-gradient-to-br from-indigo-600 to-purple-600 shadow-md rounded-xl">
              <h3 className="mb-2 text-lg font-bold">Invite Friends</h3>
              <p className="mb-4 text-sm opacity-90">Earn 500 points for every friend you invite to TripMind!</p>
              <button className="w-full py-2 text-sm font-bold text-indigo-600 bg-white rounded-lg hover:bg-gray-100">
                Copy Invite Link
              </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white shadow-md rounded-xl">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">My Bookings</h2>
              </div>
              
              <div className="divide-y">
                {MOCK_BOOKINGS.map((booking) => (
                  <div key={booking.id} className="flex flex-col p-6 md:flex-row md:items-center gap-4 hover:bg-gray-50 transition">
                    {/* Hình ảnh */}
                    <img 
                      src={booking.image} 
                      alt={booking.tourName} 
                      className="object-cover w-full h-32 rounded-lg md:w-32 md:h-24"
                    />
                    
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-bold text-gray-800">{booking.tourName}</h3>
                        <span className="font-bold text-blue-600">${booking.price}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        <i className="far fa-calendar-alt mr-2"></i> {booking.date}
                      </p>
                      
                      {/* Trạng thái (Badge màu sắc) */}
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                          booking.status === "Upcoming" ? "bg-blue-100 text-blue-700" :
                          booking.status === "Completed" ? "bg-green-100 text-green-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {booking.status}
                        </span>
                        
                        {booking.status === "Upcoming" && (
                           <span className="text-xs text-gray-400">Check-in soon</span>
                        )}
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-2">
                        <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 border rounded-lg hover:bg-gray-100">
                          Details
                        </button>
                        {booking.status === "Completed" && (
                          <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            Review
                          </button>
                        )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 text-center border-t">
                <Link to="/booking" className="text-sm font-medium text-blue-600 hover:underline">
                  View all bookings &rarr;
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}