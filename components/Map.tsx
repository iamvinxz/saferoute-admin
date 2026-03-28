"use client";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import GeoJsonFetch from "@/services/api/geoJsonFetch";
import { locations } from "@/services/api/coordinates";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";

function ZoomTracker() {
  const [zoom, setZoom] = useState<number>(16);

  const MIN_ZOOM = 0;
  const MAX_ZOOM = 19;

  const zoomPercentage = Math.round(
    ((zoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)) * 100,
  );

  useMapEvents({
    zoomend: (e) => {
      setZoom(e.target.getZoom());
    },
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        zIndex: 1000,
        background: "white",
        padding: "6px 12px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        fontSize: "14px",
        fontWeight: "bold",
      }}
    >
      Zoom: {zoomPercentage}%
    </div>
  );
}

export default function Map() {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    GeoJsonFetch().then((data) => setGeoData(data));
  }, []);

  return (
    <MapContainer
      center={[14.673275, 120.968989]}
      zoom={16}
      maxZoom={19}
      maxBoundsViscosity={1.0}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="OpenStreetMap"
        maxZoom={19}
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

      {locations &&
        locations.map((loc, index) => (
          <Marker
            key={index}
            position={[loc.coordinates?.lat, loc.coordinates?.lng]}
            icon={loc.icon}
          >
            <Popup className="max-w-[200px]">
              <div style={{ maxWidth: "150px" }} className="max-w-[150px]">
                <p className="color-[#303030]">{loc.name}</p>
              </div>
            </Popup>
          </Marker>
        ))}

      <ZoomTracker />
    </MapContainer>
  );
}
