"use client";
import "leaflet/dist/leaflet.css";
import { CircleMarker, MapContainer, TileLayer } from "react-leaflet";
import { maxBounds } from "../Map";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import FocusTrigger from "../map/FocusTrigger";
import PulsingMarker from "./PingMarker";

const defaultCenter: [number, number] = [14.673413900535, 120.9685888671883];

const MapOverview = () => {
  const report = useSelector((state: RootState) => state.report);
  const center = report.coordinates ?? defaultCenter;
  return (
    <div className="w-full h-46">
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

        {report.coordinates && (
          <>
            <PulsingMarker center={center} />
          </>
        )}

        <FocusTrigger
          target={
            report.coordinates
              ? { lat: report.coordinates[0], lng: report.coordinates[1] }
              : null
          }
        />
      </MapContainer>
    </div>
  );
};

export default MapOverview;
