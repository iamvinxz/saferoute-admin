"use client";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import GeoJsonFetch from "@/services/api/geoJsonFetch";
import { locations } from "@/services/api/coordinates";
import ZoomTracker from "@/components/ZoomTracker";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

const maxBounds: [[number, number], [number, number]] = [
  [14.616796295409431, 120.90597134427183], // SW corner
  [14.718980127971527, 121.00881300073651], // NE corner
];

const center: [number, number] = [14.673413900535, 120.9685888671883];

export default function Map() {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    GeoJsonFetch().then((data) => setGeoData(data));
  }, []);

  function InvalidateSize() {
    const map = useMap();

    useEffect(() => {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }, [map]);

    return null;
  }

  return (
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
      <InvalidateSize />
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

      {/**pinned locations in map */}
      {locations &&
        locations.map((loc, index) => (
          <Marker
            key={index}
            position={[loc.coordinates?.lat, loc.coordinates?.lng]}
            icon={loc.icon}
          >
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}

      <ZoomTracker />
    </MapContainer>
  );
}
