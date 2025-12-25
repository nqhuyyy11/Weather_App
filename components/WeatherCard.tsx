interface WeatherData {
    city: string;
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    icon: string;
}

interface WeatherCardProps {
    data: WeatherData | null;
}

export default function WeatherCard({ data }: WeatherCardProps) {
    if (!data) return null;

    return (
        <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-white shadow-2xl animate-fade-in">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-1">{data.city}</h2>
                    <p className="text-white/70">{new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                </div>
                <div className="text-6xl">{data.icon}</div>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div className="text-7xl font-bold tracking-tighter">
                    {Math.round(data.temp)}°
                </div>
                <div className="text-right">
                    <p className="text-xl font-medium text-blue-300 capitalize">{data.condition}</p>
                    <p className="text-white/60">Cảm giác như {Math.round(data.temp - 2)}°</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/10">
                <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl">
                    <span className="text-2xl mb-1">💧</span>
                    <span className="text-sm text-white/50 mb-1">Độ ẩm</span>
                    <span className="font-semibold">{data.humidity}%</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl">
                    <span className="text-2xl mb-1">💨</span>
                    <span className="text-sm text-white/50 mb-1">Tốc độ gió</span>
                    <span className="font-semibold">{data.windSpeed} km/h</span>
                </div>
            </div>
        </div>
    );
}
