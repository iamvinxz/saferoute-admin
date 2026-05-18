"use client";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) return prev;
        return prev + Math.random() * 30; // bigger jumps
      });
    }, 100); // faster interval
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full bg-[#F5F6F9] flex flex-col items-center justify-center gap-4">
      <MapPin className="animate-bounce" color="#1A5EFD" size={30} />

      {/* Bar track */}
      <div className="w-72 h-3 bg-white rounded-full overflow-hidden">
        {/* Fill */}
        <div
          className="h-full bg-[#1A5EFD] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingScreen;
