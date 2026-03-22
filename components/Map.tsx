"use client";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
  return (
    <MapContainer
      center={[14.673275, 120.968989]}
      zoom={16}
      style={{ height: "100%    ", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Circle
        center={[14.673275, 120.968989]}
        radius={900} // in meters
        pathOptions={{
          //   color: "blue",
          fillColor: "lightblue",
          fillOpacity: 0.3,
        }}
      >
        <Popup>500m radius circle</Popup>
      </Circle>
    </MapContainer>
  );
}
