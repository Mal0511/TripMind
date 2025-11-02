import { useState, useEffect } from "react";
import ItineraryCard from "../Components/ItineraryCard";

export default function ItineraryPage() {
  const [countryFilter, setCountryFilter] = useState("Tất cả");
  const [dayFilter, setDayFilter] = useState("Tất cả");
  const [itineraries, setItineraries] = useState([]);

  
  useEffect(() => {
  fetch("http://localhost:1105/api/trip")
    .then(res => res.json())
    .then(data => {
      const mapped = data.map(trip => ({
        image: trip.image,
        days: trip.days,
        title: trip.title,
        location: `${trip.country} – ${trip.city}`,
        time:
          trip.start_date && trip.end_date
            ? `${new Date(trip.start_date).toLocaleDateString()} – ${new Date(trip.end_date).toLocaleDateString()}`
            : new Date(trip.start_date).toLocaleDateString(),
        country: trip.country === "Vietnam" ? "Việt Nam" : trip.country,
        price: trip.price
      }));
      setItineraries(mapped);
    })
    .catch(err => console.error(err));
}, []);


  // Filter logic
  const filtered = itineraries.filter((item) => {
    const matchCountry = countryFilter === "Tất cả" || item.country === countryFilter;
    const matchDay =
      dayFilter === "Tất cả" ||
      (dayFilter === "1-3" && item.days <= 3) ||
      (dayFilter === "4-7" && item.days >= 4 && item.days <= 7) ||
      (dayFilter === "8+" && item.days >= 8);
    return matchCountry && matchDay;
  });

  return (
    <div className="max-w-6xl px-6 py-12 mx-auto">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center text-gray-800 md:text-3xl">
        Lịch trình nổi bật
      </h1>

      {/* Filters */}
      <div className="flex flex-col items-center justify-between gap-4 mt-6 md:flex-row">
        {/* Country pills */}
        <div className="flex space-x-3 text-sm font-medium">
          {["Tất cả", "Việt Nam", "Malaysia", "Thụy Sĩ", "Nhật Bản"].map((c) => (
            <button
              key={c}
              onClick={() => setCountryFilter(c)}
              className={`px-4 py-2 rounded-full transition ${
                countryFilter === c
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-blue-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Dropdown + Day filter */}
        <div className="flex items-center space-x-4">
          <select
            className="px-3 py-2 text-sm border rounded-md"
            onChange={(e) => setCountryFilter(e.target.value)}
          >
            <option>Tất cả</option>
            <option>Việt Nam</option>
            <option>Malaysia</option>
            <option>Thụy Sĩ</option>
            <option>Nhật Bản</option>
          </select>

          <select
            className="px-3 py-2 text-sm border rounded-md"
            onChange={(e) => setDayFilter(e.target.value)}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="1-3">1-3 ngày</option>
            <option value="4-7">4-7 ngày</option>
            <option value="8+">8+ ngày</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
        {filtered.map((item, index) => (
          <ItineraryCard key={index} {...item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 text-center text-gray-500">Không tìm thấy lịch trình nào.</p>
      )}
    </div>
  );
}
