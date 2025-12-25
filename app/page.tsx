"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import Forecast from "@/components/Forecast";

const API_KEY = "8de85bfa9b9d01aefd3ac71225f5cb6a";

export default function Home() {
  // chứa dữ liệu thời tiết
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("weather_history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage whenever it changes
  const updateHistory = (city: string) => {
    setHistory(prev => {
      const newHistory = [city, ...prev.filter(c => c !== city)].slice(0, 5);
      localStorage.setItem("weather_history", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch Current Weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=vi`
      );
      if (!weatherRes.ok) throw new Error("Không tìm thấy thành phố này!");
      const data = await weatherRes.json();

      // 2. Fetch 5-Day Forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=vi`
      );
      const forecastData = await forecastRes.json();

      // Update states
      setWeather({
        city: data.name,
        temp: data.main.temp,
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: getWeatherIcon(data.weather[0].main)
      });

      // Filter forecast: lấy dữ liệu vào 12:00 trưa mỗi ngày
      const dailyForecast = forecastData.list.filter((item: any) =>
        item.dt_txt.includes("12:00:00")
      ).map((item: any) => ({
        date: new Date(item.dt * 1000).toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric' }),
        temp: item.main.temp,
        icon: item.weather[0].main,
        condition: item.weather[0].description
      }));

      setForecast(dailyForecast);
      updateHistory(data.name);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const getWeatherIcon = (main: string) => {
    switch (main.toLowerCase()) {
      case 'clouds': return "☁️";
      case 'rain': return "🌧️";
      case 'clear': return "☀️";
      case 'snow': return "❄️";
      default: return "🌤️";
    }
  };

  // Tự động lấy thời tiết Hà Nội khi vừa mở trang
  useEffect(() => {
    fetchWeather("Hà Nội");// Default HaNoi
  }, []);

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-[#0f172a] overflow-hidden text-white font-sans">
      {/* Hiệu ứng nền mờ */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />

      <div className="relative z-10 w-full flex flex-col items-center">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 font-sans tracking-tight">
            Weatherly
          </h1>
          <p className="text-blue-200/60 text-lg">
            Dự báo thời tiết nhanh chóng & chính xác
          </p>
        </header>

        {/* Truyền hàm fetchWeather và history vào SearchBar */}
        <SearchBar onSearch={fetchWeather} history={history} />

        <div className="mt-4 w-full flex justify-center min-h-[400px]">
          {/* Trạng thái Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
              <p className="text-blue-300 animate-pulse">Đang kiểm tra thời tiết...</p>
            </div>
          )}

          {/* Trạng thái Lỗi */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-8 py-4 rounded-3xl backdrop-blur-md animate-fade-in max-w-md text-center">
              <span className="block text-2xl mb-2">⚠️</span>
              {error}
            </div>
          )}

          {/* Hiển thị kết quả */}
          {!loading && !error && weather && (
            <div className="flex flex-col items-center">
              <WeatherCard data={weather} />
              <Forecast forecasts={forecast} getIcon={getWeatherIcon} />
            </div>
          )}
        </div>

        <footer className="mt-16 text-white/30 text-sm">
          Built with Next.js 15 • Tailwind CSS • OpenWeather API
        </footer>
      </div>
    </main>
  );
}
