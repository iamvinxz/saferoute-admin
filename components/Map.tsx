"use client";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import GeoJsonFetch from "@/Redux/Services/geoJsonFetch";
import { landMarks } from "@/Redux/Services/landMarks";
import ZoomTracker from "@/components/ZoomTracker";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  useMap,
  Polyline,
  useMapEvents,
} from "react-leaflet";

interface Location {
  name: string;
  icon: L.DivIcon;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const center: [number, number] = [14.673413900535, 120.9685888671883];
const maxBounds: [[number, number], [number, number]] = [
  [14.616796295409431, 120.90597134427183],
  [14.718980127971527, 121.00881300073651],
];

function InvalidateSize() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);

  return null;
}

export default function Map() {
  const [geoData, setGeoData] = useState<any>(null);

  const [points, setPoints] = useState<any[]>([]);
  const [route, setRoute] = useState<any[]>([]);

  const fetchRoute = async (p1: any, p2: any) => {
    const url = `http://localhost:5000/route/v1/foot/${p1.lng},${p1.lat};${p2.lng},${p2.lat}?overview=full&geometries=geojson`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.routes && data.routes.length > 0) {
      const coords = data.routes[0].geometry.coordinates.map((c: number[]) => [
        c[1],
        c[0],
      ]);
      setRoute(coords);
    }
  };

  function ClickHandler({ setPoints }: any) {
    useMapEvents({
      click(e) {
        setPoints((prev: any[]) => {
          if (prev.length >= 2) return [e.latlng]; // reset after 2 clicks
          return [...prev, e.latlng];
        });
      },
    });
    return null;
  }

  useEffect(() => {
    if (points.length === 2) {
      fetchRoute(points[0], points[1]);
    }
  }, [points]);

  useEffect(() => {
    GeoJsonFetch().then((data) => setGeoData(data));
  }, []);

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

      <ClickHandler setPoints={setPoints} />

      {points.map((p, i) => (
        <Marker key={`point-${i}`} position={[p.lat, p.lng]} />
      ))}

      {route.length > 0 && <Polyline positions={route} />}

      {/**pinned locations in map */}
      {landMarks &&
        landMarks.map((loc: Location, index) => (
          <Marker
            key={index}
            position={[loc.coordinates.lat, loc.coordinates.lng]}
            icon={loc.icon}
          >
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}

      <ZoomTracker />
    </MapContainer>
  );
}
