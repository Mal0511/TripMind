import { useEffect, useState } from "react";
import WeatherCard from "../Components/WeatherCard";

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "a74c7492efdb28c120eb8d9149fe87ff"; 

  const fetchWeatherByCoords = async (lat, lon, cityNameOverride) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=vi`
      );
      const data = await res.json();

      if (data.cod === 200) { 
        return {
          city: cityNameOverride || data.name, 
          date: new Date().toLocaleDateString(),
          temp: Math.round(data.main.temp),
          desc: data.weather[0].description,
          humidity: data.main.humidity,
          icon: data.weather[0].icon, 
        };
      } else {
        console.error("Lỗi API:", data);
        return null;
      }
    } catch (err) {
      console.error("Lỗi mạng:", err);
      return null;
    }
  };

  useEffect(() => {
    const loadDefaultCities = async () => {
      setLoading(true);
      const defaultCities = [
        { name: "Da Lat", lat: 11.9416, lon: 108.4384 },
        { name: "Ha Noi", lat: 21.0285, lon: 105.8542 },
        { name: "Ho Chi Minh", lat: 10.762622, lon: 106.660172 },
      ];

      const promises = defaultCities.map((city) =>
        fetchWeatherByCoords(city.lat, city.lon, city.name)
      );

      const results = await Promise.all(promises);
      // Lọc bỏ những kết quả null (nếu có lỗi)
      setWeatherData(results.filter((item) => item !== null));
      setLoading(false);
    };

    loadDefaultCities();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault(); 
    if (!searchQuery.trim()) return;

    setError("");
    setLoading(true);

    try {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoRes.json();

      if (geoData.length === 0) {
        setError("Không tìm thấy thành phố này!");
        setLoading(false);
        return;
      }

      const { lat, lon, name, country } = geoData[0]; 

      const newWeatherItem = await fetchWeatherByCoords(lat, lon, `${name}, ${country}`);

      if (newWeatherItem) {
        setWeatherData((prevData) => [newWeatherItem, ...prevData]);
        setSearchQuery(""); 
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi tìm kiếm.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl px-6 py-12 mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 md:text-4xl">
        The Weather Today
      </h1>

      {/* --- THANH TÌM KIẾM --- */}
      <form onSubmit={handleSearch} className="flex justify-center max-w-lg mx-auto mt-8 mb-8">
        <input
          type="text"
            placeholder="Nhập tên thành phố (VD: Da Nang, London...)"
          className="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-3 font-semibold text-white transition bg-blue-600 rounded-r-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "..." : "Tìm"}
        </button>
      </form>

      {/* Hiển thị lỗi nếu có */}
      {error && <p className="mb-4 text-center text-red-500">{error}</p>}

      {/* Danh sách thẻ thời tiết */}
      <div className="flex flex-wrap justify-center gap-8">
        {weatherData.length > 0 ? (
          weatherData.map((item, index) => (
            <WeatherCard key={index} {...item} />
          ))
        ) : (
          !loading && <p className="text-gray-500">Chưa có dữ liệu...</p>
        )}
      </div>
    </div>  
  );
}