import { Fragment, useEffect } from "react";
import { Polyline, CircleMarker, Popup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import ClickCapture from "@/components/map/ClickCapture";
import CursorController from "@/components/map/CursorController";
import { addPoint, addSegment, updateCoords } from "@/state/slices/segment";
import { fetchOSRMRoute } from "@/lib/fetchOSRMRoute";
import { toast } from "sonner";
import { useGetAllSegmentQuery } from "@/Redux/Services/markService";
import { depthColors } from "@/components/notification/FloodReportCard";

interface Props {
  geoJsonData: GeoJSON.FeatureCollection;
}

export const getDepthColors = (depth: string) => {
  const match = Object.keys(depthColors).find(
    (key) => key.toLowerCase() === depth.toLowerCase(),
  );

  return (
    depthColors[match ?? ""] ?? { badge: "bg-gray-100", text: "text-gray-700" }
  );
};

const RouteLayer = ({ geoJsonData }: Props) => {
  const segments = useSelector((state: RootState) => state.segment.segments);
  const currentSegment = segments[segments.length - 1]; //initial undefin
  const isRoutingMode = useSelector((state: RootState) => state.mode.isRouting);
  const dispatch = useDispatch();

  //rtk query
  const { data: segmentLocations, isLoading: isSegmentLocationsLoading } =
    useGetAllSegmentQuery();

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
    if (currentSegment && currentSegment.points.length >= 3) {
      toast.info("Max of 3 plots allowed", {
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
                fillColor: "#ff0000",
                fillOpacity: 1,
                weight: 2,
              }}
            />
          ))}

          {/* polyline per segment */}
          {segment.coords.length > 0 && (
            <Polyline
              positions={segment.coords}
              pathOptions={{ color: "#ff0000", weight: 4, opacity: 0.8 }}
            />
          )}
        </Fragment>
      ))}

      {segmentLocations?.segments.map((segment, index) => (
        <Polyline
          key={index}
          positions={segment.coords}
          pathOptions={{ color: "#ff0000", weight: 4, opacity: 0.8 }}
        >
          <Popup>
            <div className="min-w-50 max-w-70">
              <div className="flex items-center justify-between">
                <span
                  className={`font-bold text-[#303030] leading-tight wrap-break-words ${
                    segment.floodReport.streetName.length > 10
                      ? "text-sm"
                      : segment.floodReport.streetName.length > 8
                        ? "text-base"
                        : "text-lg"
                  }`}
                >
                  {segment.floodReport.streetName}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap shrink-0
                    ${getDepthColors(segment.floodReport.floodDepth).badge}
                    ${getDepthColors(segment.floodReport.floodDepth).text}
                  `}
                >
                  {segment.floodReport.floodDepth}
                </span>
              </div>

              {segment.floodReport.description && (
                <span className="text-xs text-gray-500 leading-relaxed">
                  {segment.floodReport.description}
                </span>
              )}
            </div>
          </Popup>
        </Polyline>
      ))}
    </>
  );
};

export default RouteLayer;
