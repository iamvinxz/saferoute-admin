import { useEffect, Fragment } from "react";
import { toast } from "sonner";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers";
import { useMap, useMapEvents, Polyline, CircleMarker } from "react-leaflet";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

interface Props {
  isRoutingMode: boolean;
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

const RouteLayer = ({ isRoutingMode, onAddPoint, geoJsonData }: Props) => {
  const segments = useSelector((state: RootState) => state.segment.segments);
  return (
    <>
      <CursorController isRoutingMode={isRoutingMode} />
      <ClickCapture
        isRoutingMode={isRoutingMode}
        onAddPoint={onAddPoint}
        geoJsonData={geoJsonData}
      />

      {segments.map((segment, segIndex) => (
        <Fragment key={segIndex}>
          {/* waypoint markers per segment */}
          {segment.points.map((point, index) => (
            <CircleMarker
              key={index}
              center={point}
              radius={6}
              pathOptions={{
                color: "white",
                fillColor: "#e4795f",
                fillOpacity: 1,
                weight: 2,
              }}
            />
          ))}

          {/* polyline per segment */}
          {segment.coords.length > 0 && (
            <Polyline
              positions={segment.coords}
              pathOptions={{ color: "#e4795f", weight: 4, opacity: 0.8 }}
            />
          )}
        </Fragment>
      ))}
    </>
  );
};

export default RouteLayer;
