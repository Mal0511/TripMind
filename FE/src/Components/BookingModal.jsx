export default function BookingModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-4 border-b pb-4">
          <h3 className="text-xl font-bold text-gray-800">Confirm Booking</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        
        {/* Nội dung tóm tắt */}
        <div className="flex items-center gap-4 mb-6">
          {item.image ? (
             <img src={item.image} className="w-16 h-16 rounded-lg object-cover" alt="thumbnail" />
          ) : (
             <img src={item.logo} className="w-16 h-16 object-contain border rounded-lg p-1" alt="logo" />
          )}
          <div>
            <h4 className="font-bold text-gray-800">{item.title || item.airline}</h4>
            <p className="text-sm text-gray-500">{item.type === 'flight' ? `${item.from} ➝ ${item.to}` : item.location}</p>
            <p className="font-bold text-blue-600">${item.price}</p>
          </div>
        </div>

        {/* Nút thanh toán */}
        <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30">
          Pay Now
        </button>
      </div>
    </div>
  );
}