export default function WeatherCard({ city, date, temp, desc, humidity }) {
  return (
    <div className="w-64 p-6 space-y-3 text-center bg-white shadow-md rounded-xl">
      <h3 className="font-semibold text-gray-800">{city}</h3>
      <p className="text-gray-500">{date}</p>
      <p className="text-xl font-bold">{temp}°C</p>
      <p>{desc}</p>
      <p>💧 {humidity}%</p>
    </div>
  );
}
