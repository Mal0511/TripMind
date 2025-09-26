import { useEffect, useState } from "react";
import WeatherCard from "../Components/WeatherCard";
import { apiFetch } from "../config/api";
export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const API_KEY = "a74c7492efdb28c120eb8d9149fe87ff"; // thay bằng key thật

      const cities = [
        { name: "Da Lat", lat: 11.9416, lon: 108.4384 },
        { name: "Ha Noi", lat: 21.0285, lon: 105.8542 },
        { name: "Ho Chi Minh", lat: 10.762622, lon: 106.660172 },
      ];

      const fetched = [];

      for (let city of cities) {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=vi`
          );
          const data = await res.json();

          if (data?.main) {
            fetched.push({
              city: city.name,
              date: new Date().toLocaleDateString(),
              temp: Math.round(data.main.temp),
              desc: data.weather[0].description,
              humidity: data.main.humidity,
            });
          } else {
            console.error("API error:", data);
          }
        } catch (err) {
          console.error("Fetch failed:", err);
        }
      }
      setWeatherData(fetched);
    };

    fetchWeather();
  }, []);

  return (
    <div className="max-w-6xl px-6 py-12 mx-auto">
      <h1 className="text-2xl font-bold text-center text-gray-800 md:text-3xl">
        The weather today
      </h1>

      <div className="flex flex-wrap justify-center gap-8 mt-10">
        {weatherData.length > 0 ? (
          weatherData.map((item, index) => (
            <WeatherCard key={index} {...item} />
          ))
        ) : (
          <p className="text-gray-500">Đang tải dữ liệu thời tiết...</p>
        )}
      </div>
    </div>  
  );
}
