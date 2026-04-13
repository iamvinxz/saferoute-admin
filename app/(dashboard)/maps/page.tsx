"use client";
import dynamic from "next/dynamic";

const Maps = () => {
  const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  });

  return <Map />;
};

export default Maps;
