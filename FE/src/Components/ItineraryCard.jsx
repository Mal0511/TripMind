export default function ItineraryCard({ image, days, title, location, time, price }) {
  return (
    <div className="overflow-hidden transition duration-300 bg-white shadow-md rounded-xl hover:shadow-xl">
      {/* Image */}
      <div className="relative">
        <img src={image} alt={title} className="object-cover w-full h-40" />
        <span className="absolute px-2 py-1 text-xs font-semibold text-white bg-black rounded-md top-2 right-2 bg-opacity-70">
          {days} Ngày
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2 text-sm">
        <h3 className="font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600">📍 {location}</p>
        <p className="text-gray-600">🗓 {time}</p>
        <p className="text-gray-600">💰 Price: {price}$</p>
      </div>
    </div>
  );
}
