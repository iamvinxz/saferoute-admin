"use client";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { LandmarkIcon } from "lucide-react";
import GeoJsonFetch from "@/services/api/geoJsonFetch";
import { renderToStaticMarkup } from "react-dom/server";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
  Marker,
  useMapEvents,
} from "react-leaflet";

const landmarkIcon = L.divIcon({
  html: renderToStaticMarkup(<LandmarkIcon color="blue" size={25} />),
  className: "",
  iconAnchor: [12, 12],
});

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

      <Marker position={[14.6717, 120.9705]} icon={landmarkIcon}></Marker>
      <ZoomTracker />
    </MapContainer>
  );
}
