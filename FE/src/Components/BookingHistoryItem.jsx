export default function BookingHistoryItem({ booking }) {
  // Hàm xác định màu sắc dựa trên trạng thái
  const getStatusColor = (status) => {
    if (status === "Upcoming") return "bg-blue-100 text-blue-700";
    if (status === "Completed") return "bg-green-100 text-green-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="flex flex-col p-6 md:flex-row md:items-center gap-4 hover:bg-gray-50 transition">
      {/* Hình ảnh */}
      <img 
        src={booking.image} 
        alt={booking.tourName} 
        className="object-cover w-full h-32 rounded-lg md:w-32 md:h-24"
      />
      
      {/* Thông tin chi tiết */}
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <h3 className="font-bold text-gray-800">{booking.tourName}</h3>
          <span className="font-bold text-blue-600">${booking.price}</span>
        </div>
        <p className="text-sm text-gray-500 mb-2">
          <i className="far fa-calendar-alt mr-2"></i> {booking.date}
        </p>
        
        {/* Badge trạng thái */}
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(booking.status)}`}>
            {booking.status}
          </span>
          
          {booking.status === "Upcoming" && (
             <span className="text-xs text-gray-400">Check-in soon</span>
          )}
        </div>
      </div>

      {/* Các nút hành động */}
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
  );
}