"use client";
import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { landMarks } from "@/Redux/Services/landMarks";
import type { DivIcon } from "leaflet";

type LandMarkWithIcon = {
  name: string;
  icon: DivIcon;
  coordinates: { lat: number; lng: number };
};

const iconMap: Record<string, string> = {
  "Barangay Hall": "barangayHall",
  "Health Center": "healthCenter",
  "Evacuation Shelter": "shelter",
};

const LandMarksLayer = () => {
  const [marks, setMarks] = useState<LandMarkWithIcon[]>([]);

  useEffect(() => {
    import("@/lib/leafletIcon").then((icons) => {
      const withIcons = landMarks.map((loc) => ({
        ...loc,
        icon: icons[iconMap[loc.name] as keyof typeof icons] as DivIcon,
      }));
      setMarks(withIcons);
    });
  }, []);

  return (
    <>
      {marks.map((loc, index) => (
        <Marker
          key={index}
          position={[loc.coordinates.lat, loc.coordinates.lng]}
          icon={loc.icon}
        >
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </>
  );
};

export default LandMarksLayer;
