import { Fragment, useEffect } from "react";
import { Polyline, CircleMarker } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import ClickCapture from "@/components/map/ClickCapture";
import CursorController from "@/components/map/CursorController";
import { addPoint, addSegment, updateCoords } from "@/state/slices/segment";
import { fetchOSRMRoute } from "@/lib/fetchOSRMRoute";
import { toast } from "sonner";

interface Props {
  geoJsonData: GeoJSON.FeatureCollection;
}

const RouteLayer = ({ geoJsonData }: Props) => {
  const segments = useSelector((state: RootState) => state.segment.segments);
  const currentSegment = segments[segments.length - 1]; //initial undefin
  const isRoutingMode = useSelector((state: RootState) => state.mode.isRouting);
  const dispatch = useDispatch();

  //side effects
  useEffect(() => {
    if (!currentSegment) return;
    const points = currentSegment.points;
    if (points.length < 2) return;

    fetchOSRMRoute(points).then((coords) => {
      handleUpdateCoords(coords);
    });
  }, [currentSegment?.points]);

  const handleAddPoint = (point: [number, number]) => {
    if (segments.length === 0) {
      dispatch(addSegment());
    }

    // Check if current segment already has 2 points
    if (currentSegment && currentSegment.points.length >= 2) {
      toast.info("Max of 2 plots allowed", {
        style: { background: "#b85545", color: "white" },
      });
      return;
    }

    dispatch(addPoint(point));
  };

  const handleUpdateCoords = (coords: [number, number][]) =>
    dispatch(updateCoords(coords));

  return (
    <>
      <CursorController
        isRoutingMode={isRoutingMode}
        geoJsonData={geoJsonData}
      />

      <ClickCapture
        onClickMode={isRoutingMode}
        geoJsonData={geoJsonData}
        onMapClick={handleAddPoint}
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
