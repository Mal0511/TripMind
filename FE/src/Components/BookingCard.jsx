export default function BookingCard({ item, onBook }) {
  // 1. GIAO DIỆN CHO VÉ MÁY BAY 
  if (item.type === 'flight') {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between hover:shadow-lg transition border border-transparent hover:border-blue-200">
        {/* Hãng bay */}
        <div className="flex items-center gap-4 w-full md:w-1/4 mb-4 md:mb-0">
          <img src={item.logo} alt="logo" className="w-16 h-16 object-contain" />
          <span className="font-bold text-gray-700">{item.airline}</span>
        </div>

        {/* Lộ trình */}
        <div className="flex-1 flex items-center justify-center gap-8 text-center w-full mb-4 md:mb-0">
          <div>
            <p className="text-2xl font-bold text-gray-800">{item.from}</p>
            <p className="text-xs text-gray-400">Departure</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500 mb-1">{item.duration}</p>
            <div className="w-24 h-[1px] bg-gray-300 relative">
              <i className="fas fa-plane absolute -top-2 left-1/2 -translate-x-1/2 text-blue-500"></i>
            </div>
            <p className="text-xs text-blue-600 mt-1">Direct</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{item.to}</p>
            <p className="text-xs text-gray-400">Arrival</p>
          </div>
        </div>

        {/* Giá & Nút bấm */}
        <div className="text-center md:text-right w-full md:w-1/4 pl-4 border-l-0 md:border-l">
          <p className="text-2xl font-bold text-blue-600">${item.price}</p>
          <p className="text-xs text-gray-400 mb-2">per person</p>
          <button 
            onClick={() => onBook(item)}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
          >
            Select
          </button>
        </div>
      </div>
    );
  }

  // 2. GIAO DIỆN CHO TOUR & HOTEL 
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group">
      <div className="h-56 overflow-hidden relative">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
        <span className="absolute top-3 left-3 bg-black bg-opacity-60 text-white text-xs font-bold px-2 py-1 rounded">
          {item.location}
        </span>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
          <div className="flex items-center text-yellow-500 text-sm">
            <i className="fas fa-star mr-1"></i>{item.rating}
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          {item.type === 'hotel' ? <><i className="fas fa-bed mr-2"></i>Luxury Room</> : <><i className="far fa-clock mr-2"></i>{item.duration}</>}
        </p>
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <span className="text-xs text-gray-400">Start from</span>
            <p className="text-xl font-bold text-blue-600">${item.price} <span className="text-sm font-normal text-gray-500">{item.type === 'hotel' ? '/ night' : ''}</span></p>
          </div>
          <button 
            onClick={() => onBook(item)}
            className="px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}