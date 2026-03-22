"use client";
import dynamic from "next/dynamic";

const Maps = () => {
  const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  });

  return (
    <div className="h-full w-full">
      <Map />
    </div>
  );
};

export default Maps;
