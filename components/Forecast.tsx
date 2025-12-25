"use client";

interface ForecastData {
    date: string;
    temp: number;
    icon: string;
    condition: string;
}

interface ForecastProps {
    forecasts: ForecastData[];
    getIcon: (main: string) => string;
}

export default function Forecast({ forecasts, getIcon }: ForecastProps) {
    if (!forecasts || forecasts.length === 0) return null;

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-blue-200">Dự báo 5 ngày tới</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {forecasts.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col items-center hover:bg-white/10 transition-all cursor-default"
                    >
                        <p className="text-white/60 text-sm mb-2">{item.date}</p>
                        <span className="text-3xl mb-2">{getIcon(item.icon)}</span>
                        <p className="font-bold text-xl">{Math.round(item.temp)}°</p>
                        <p className="text-xs text-blue-300 capitalize text-center mt-1">{item.condition}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
