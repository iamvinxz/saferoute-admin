import { Fragment } from "react";
import { Polyline, CircleMarker } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import ClickCapture from "@/components/map/ClickCapture";
import CursorController from "@/components/map/CursorController";
import { addPoint, addSegment } from "@/state/slices/segment";

interface Props {
  geoJsonData: GeoJSON.FeatureCollection;
}

const RouteLayer = ({ geoJsonData }: Props) => {
  const segments = useSelector((state: RootState) => state.segment.segments);
  const isRoutingMode = useSelector((state: RootState) => state.mode.isRouting);
  const dispatch = useDispatch();
  const handleAddPoint = (point: [number, number]) => {
    if (segments.length === 0) {
      dispatch(addSegment());
    }
    dispatch(addPoint(point));
  };

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
