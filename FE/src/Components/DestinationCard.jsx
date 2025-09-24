export default function DestinationCard({ image, title, price, days }) {
  return (
    <div className="overflow-hidden transition duration-300 transform bg-white shadow-lg rounded-2xl w-72 hover:shadow-2xl hover:scale-105">
      <img src={image} alt={title} className="object-cover w-full h-44" />

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{price}</p>

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <i className="text-blue-500 fas fa-map-marker-alt"></i>
          <span>{days}</span>
        </div>
      </div>
    </div>
  );
}
