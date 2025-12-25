"use client";

import { useState } from "react";

interface SearchBarProps {
    onSearch: (city: string) => void;
    history: string[];
}

export default function SearchBar({ onSearch, history }: SearchBarProps) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mb-8">
            <form onSubmit={handleSubmit} className="relative group mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Nhập tên thành phố (vd: Hanoi, London...)"
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200 active:scale-95"
                >
                    🔍
                </button>
            </form>

            {/* Lịch sử tìm kiếm */}
            {history.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center">
                    {history.map((city) => (
                        <button
                            key={city}
                            onClick={() => onSearch(city)}
                            className="px-3 py-1 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full text-xs text-blue-200 transition-colors"
                        >
                            {city}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
