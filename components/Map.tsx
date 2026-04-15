"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useGetGeoJsonQuery } from "@/Redux/Services/mapService";
import InvalidateSize from "@/components/map/InvalidateSize";
import LandMarksLayer from "@/components/map/LandMarksLayer";
import ZoomTracker from "@/components/map/ZoomTracker";
import ControllerTab from "@/components/map/ControllerTab";
import FocusTrigger from "@/components/map/FocusTrigger";
import { useState } from "react";
import ToolBox from "@/components/map/ToolBox";
import RouteLayer from "./map/RouteLayer";
import { fetchOSRMRoute } from "@/lib/fetchOSRMRoute";
import InfoMessage from "./map/InfoMessage";

const center: [number, number] = [14.673413900535, 120.9685888671883];
const maxBounds: [[number, number], [number, number]] = [
  [14.616796295409431, 120.90597134427183],
  [14.718980127971527, 121.00881300073651],
];

export default function Map() {
  //states
  const [isRoutingMode, setIsRoutingMode] = useState(false);
  const [routePoints, setRoutePoints] = useState<[number, number][]>([]);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [focusTarget, setFocusTarget] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  //rtk query
  const { data: geoData } = useGetGeoJsonQuery();

  //handlers
  const handleAddPoint = async (point: [number, number]) => {
    const updated = [...routePoints, point];
    setRoutePoints(updated);

    // Fetch route whenever there are 2+ points
    if (updated.length >= 2) {
      const coords = await fetchOSRMRoute(updated);
      setRouteCoords(coords);
    }
  };

  const handleToggleRouting = () => {
    setIsRoutingMode((prev) => !prev);
    // if (isRoutingMode) handleClearRoute();
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={center}
        zoom={17}
        maxZoom={19}
        minZoom={15}
        maxBounds={maxBounds}
        maxBoundsViscosity={1.0}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="OpenStreetMap"
          maxZoom={19}
          minZoom={15}
        />

        {geoData && (
          <GeoJSON
            data={geoData}
            style={{
              color: "blue",
              weight: 2,
              fillColor: "lightblue",
              fillOpacity: 0.2,
            }}
          />
        )}

        {isRoutingMode && <InfoMessage onToggleRouting={handleToggleRouting} />}

        <RouteLayer
          isRoutingMode={isRoutingMode}
          routePoints={routePoints}
          routeCoords={routeCoords}
          onAddPoint={handleAddPoint}
          geoJsonData={geoData}
        />

        <LandMarksLayer />
        <InvalidateSize />
        <ZoomTracker />
        <FocusTrigger target={focusTarget} />
      </MapContainer>
      <ControllerTab onFocus={setFocusTarget} />
      <ToolBox
        isRoutingMode={isRoutingMode}
        onToggleRouting={handleToggleRouting}
      />
    </div>
  );
}
