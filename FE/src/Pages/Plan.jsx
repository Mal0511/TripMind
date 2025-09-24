import { useState } from "react";
import ItineraryCard from "../Components/ItineraryCard";

export default function ItineraryPage() {
  const [countryFilter, setCountryFilter] = useState("Tất cả");
  const [dayFilter, setDayFilter] = useState("Tất cả");

 const itineraries = [
  {
    image: "/assets/P1.jpg",
    days: 3,
    title: "Bà Rịa Vũng Tàu 3 ngày 2 đêm",
    location: "Việt Nam – Vũng Tàu",
    time: "01/08/2025 – 03/08/2025",
    author: "Quang Vinh",
    avatar: "/assets/avatar1.jpg",
    country: "Việt Nam",
  },
  {
    image: "/assets/P1.jpg",
    days: 2,
    title: "Sa Pa 2 ngày 1 đêm",
    location: "Việt Nam – Sa Pa",
    time: "02/09/2025 – 03/09/2025",
    author: "Loan Loan",
    avatar: "/assets/avatar2.jpg",
    country: "Việt Nam",
  },
  {
    image: "/assets/P1.jpg",
    days: 4,
    title: "Kuala Lumpur 4 ngày 3 đêm",
    location: "Malaysia – Kuala Lumpur",
    time: "04/08/2025 – 07/08/2025",
    author: "Minh Hà",
    avatar: "/assets/avatar3.jpg",
    country: "Malaysia",
  },
  {
    image: "/assets/P1.jpg",
    days: 5,
    title: "Đà Lạt 5 ngày 4 đêm",
    location: "Việt Nam – Đà Lạt",
    time: "10/07/2025 – 14/07/2025",
    author: "Duy Tân",
    avatar: "/assets/avatar4.jpg",
    country: "Việt Nam",
  },
  {
    image: "/assets/P1.jpg",
    days: 1,
    title: "Khám phá Hà Nội",
    location: "Việt Nam – Hà Nội",
    time: "15/08/2025",
    author: "Thu Phương",
    avatar: "/assets/avatar5.jpg",
    country: "Việt Nam",
  },
  {
    image: "/assets/P1.jpg",
    days: 7,
    title: "Switzerland Alps Tour",
    location: "Thụy Sĩ – Bern",
    time: "20/08/2025 – 26/08/2025",
    author: "Ngọc Anh",
    avatar: "/assets/avatar6.jpg",
    country: "Thụy Sĩ",
  },
  {
    image: "/assets/P1.jpg",
    days: 8,
    title: "Tokyo & Kyoto Adventure",
    location: "Nhật Bản – Tokyo",
    time: "01/09/2025 – 08/09/2025",
    author: "Kenji",
    avatar: "/assets/avatar7.jpg",
    country: "Nhật Bản",
  },
];


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
