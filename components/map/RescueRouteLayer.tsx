// components/map/RescueRouteLayer.tsx
"use client";
import { useEffect, useState } from "react";
import { Polyline, Marker } from "react-leaflet";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { fetchOSRMRoute } from "@/lib/fetchOSRMRoute";
import L from "leaflet";

const RescueRouteLayer = () => {
  const [polyline, setPolyline] = useState<[number, number][]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const sosReport = useSelector((state: RootState) => state.sosReport);

  const rescuerCoords = user?.coordinates;
  const sosCoords = sosReport.coordinates;
  const hasActiveRescue =
    sosReport._id !== "" && sosReport.status === "dispatched";

  useEffect(() => {
    if (!rescuerCoords || !sosCoords || !hasActiveRescue) return;

    const getRoute = async () => {
      const route = await fetchOSRMRoute([rescuerCoords, sosCoords]);
      setPolyline(route);
    };

    getRoute();
  }, [rescuerCoords, sosCoords]); // updates as rescuer moves

  if (!hasActiveRescue || polyline.length === 0) return null;

  return (
    <>
      <Polyline
        positions={polyline}
        pathOptions={{ color: "#1A5EFD", weight: 4, dashArray: "8" }}
      />

      {/* rescuer marker */}
      {rescuerCoords && (
        <Marker
          position={rescuerCoords}
          icon={L.divIcon({
            className: "",
            html: `<div style="background:#1A5EFD;width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 6px rgba(0,0,0,0.3)"></div>`,
          })}
        />
      )}

      {/* sos location marker */}
      {sosCoords && (
        <Marker
          position={sosCoords}
          icon={L.divIcon({
            className: "",
            html: `<div style="background:red;width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 6px rgba(0,0,0,0.3)"></div>`,
          })}
        />
      )}
    </>
  );
};

export default RescueRouteLayer;
