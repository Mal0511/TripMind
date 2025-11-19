import { useEffect, useState } from "react";
import WeatherCard from "../Components/WeatherCard";

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const API_KEY = "a74c7492efdb28c120eb8d9149fe87ff";

  // ====== Load 3 thành phố mặc định ======
  useEffect(() => {
    const fetchWeather = async () => {
      const cities = [
        { name: "Da Lat", lat: 11.9416, lon: 108.4384 },
        { name: "Ha Noi", lat: 21.0285, lon: 105.8542 },
        { name: "Ho Chi Minh", lat: 10.762622, lon: 106.660172 },
      ];

      const results = [];

      for (let city of cities) {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=vi`
        );
        const data = await res.json();

        if (data?.main) {
          results.push({
            city: city.name,
            temp: Math.round(data.main.temp),
            desc: data.weather[0].description,
            humidity: data.main.humidity,
            date: new Date().toLocaleDateString(),
          });
        }
      }

      setWeatherData(results);
    };

    fetchWeather();
  }, []);

  // ====== SEARCH TOÀN THẾ GIỚI ======
  const handleSearch = async () => {
    if (!search.trim()) {
      setSearchResult(null);
      return;
    }

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric&lang=vi`
    );
    const data = await res.json();

    if (data?.main) {
      setSearchResult({
        city: data.name,
        temp: Math.round(data.main.temp),
        desc: data.weather[0].description,
        humidity: data.main.humidity,
        date: new Date().toLocaleDateString(),
      });
    } else {
      setSearchResult("NOT_FOUND");
    }
  };

  return (
    <div className="max-w-6xl px-6 py-12 mx-auto">
      <h1 className="text-2xl font-bold text-center">The weather today</h1>

      {/* Ô tìm kiếm */}
      <div className="flex justify-center gap-2 mt-6">
        <input
          type="text"
          placeholder="Nhập tên thành phố..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Tìm
        </button>
      </div>

      {/* Nếu có kết quả search thì chỉ hiện kết quả đó */}
      {searchResult && searchResult !== "NOT_FOUND" && (
        <div className="flex justify-center mt-10">
          <WeatherCard {...searchResult} />
        </div>
      )}

      {/* Nếu search lỗi */}
      {searchResult === "NOT_FOUND" && (
        <p className="text-center text-red-500 mt-8">Không tìm thấy thành phố.</p>
      )}

      {/* Nếu chưa search → hiện 3 thành phố mặc định */}
      {!searchResult && (
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {weatherData.map((item, index) => (
            <WeatherCard key={index} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}
