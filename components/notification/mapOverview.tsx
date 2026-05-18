"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { maxBounds } from "../Map";
import FocusTrigger from "../map/FocusTrigger";
import PulsingMarker from "./PingMarker";

type MapOVerviewProps = {
  coordinates: [number, number] | undefined;
};

const MapOverview = ({ coordinates }: MapOVerviewProps) => {
  return (
    <div className="w-full h-46">
      <MapContainer
        center={coordinates}
        zoom={17}
        zoomControl={false}
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

        {coordinates && (
          <>
            <PulsingMarker center={coordinates} />
          </>
        )}

        <FocusTrigger
          target={
            coordinates ? { lat: coordinates[0], lng: coordinates[1] } : null
          }
        />
      </MapContainer>
    </div>
  );
};

export default MapOverview;
