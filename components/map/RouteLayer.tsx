import { useEffect } from "react";
import { toast } from "sonner";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers";
import {
  useMap,
  useMapEvents,
  Polyline,
  Marker,
  CircleMarker,
} from "react-leaflet";

interface Props {
  isRoutingMode: boolean;
  routePoints: [number, number][];
  routeCoords: [number, number][];
  onAddPoint: (point: [number, number]) => void;
  geoJsonData: GeoJSON.FeatureCollection;
}

const CursorController = ({ isRoutingMode }: { isRoutingMode: boolean }) => {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    container.style.cursor = isRoutingMode ? "crosshair" : "";
  }, [isRoutingMode, map]);

  return null;
};

const ClickCapture = ({
  isRoutingMode,
  onAddPoint,
  geoJsonData,
}: {
  isRoutingMode: boolean;
  onAddPoint: (point: [number, number]) => void;
  geoJsonData: GeoJSON.FeatureCollection;
}) => {
  useMapEvents({
    click(e) {
      if (!isRoutingMode) return;
      const clicked = point([e.latlng.lng, e.latlng.lat]);

      const isInside = geoJsonData.features.some((feature) =>
        booleanPointInPolygon(
          clicked,
          feature as GeoJSON.Feature<GeoJSON.Polygon>,
        ),
      );

      if (!isInside) {
        toast.info("Plot within Barangay only", {
          position: "top-right",
          duration: 1500,
          style: { background: "#b85545", color: "white" },
        });
        return;
      }
      onAddPoint([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const RouteLayer = ({
  isRoutingMode,
  routePoints,
  routeCoords,
  onAddPoint,
  geoJsonData,
}: Props) => {
  console.log(routePoints);
  return (
    <>
      <CursorController isRoutingMode={isRoutingMode} />
      <ClickCapture
        isRoutingMode={isRoutingMode}
        onAddPoint={onAddPoint}
        geoJsonData={geoJsonData}
      />

      {/* Waypoint markers */}
      {routePoints.map((point, index) => (
        <CircleMarker
          key={index}
          center={point}
          radius={6}
          pathOptions={{
            color: "white",
            fillColor: "#3b82f6",
            fillOpacity: 1,
            weight: 2,
          }}
        />
      ))}

      {/* OSRM route polyline */}
      {routeCoords.length > 0 && (
        <Polyline
          positions={routeCoords}
          pathOptions={{ color: "#e4795f", weight: 4, opacity: 0.8 }}
        />
      )}
    </>
  );
};

export default RouteLayer;
