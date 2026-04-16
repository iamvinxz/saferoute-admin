"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useGetGeoJsonQuery } from "@/Redux/Services/mapService";
import InvalidateSize from "@/components/map/InvalidateSize";
import LandMarksLayer from "@/components/map/LandMarksLayer";
import ZoomTracker from "@/components/map/ZoomTracker";
import ControllerTab from "@/components/map/ControllerTab";
import FocusTrigger from "@/components/map/FocusTrigger";
import { useEffect, useRef, useState } from "react";
import ToolBox from "@/components/map/ToolBox";
import RouteLayer from "./map/RouteLayer";
import { fetchOSRMRoute } from "@/lib/fetchOSRMRoute";
import InfoMessage from "./map/InfoMessage";
import L from "leaflet";
import { toast } from "sonner";
import FloodReportSheet from "@/components/map/FloodIncidentSheet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { addPoint, updateCoords, addSegment } from "@/state/slices/segment";

const center: [number, number] = [14.673413900535, 120.9685888671883];
const maxBounds: [[number, number], [number, number]] = [
  [14.616796295409431, 120.90597134427183],
  [14.718980127971527, 121.00881300073651],
];

export default function Map() {
  //states
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRoutingMode, setIsRoutingMode] = useState(false);
  const segments = useSelector((state: RootState) => state.segment.segments);

  const currentSegment = segments[segments.length - 1];

  const [focusTarget, setFocusTarget] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  //rtk query
  const { data: geoData } = useGetGeoJsonQuery();

  //side effects
  useEffect(() => {
    const points = currentSegment.points;
    if (points.length < 2) return;

    fetchOSRMRoute(points).then((coords) => {
      handleUpdateCoords(coords);
    });
  }, [currentSegment.points]);

  useEffect(() => {
    if (containerRef.current) {
      L.DomEvent.disableClickPropagation(containerRef.current);
      L.DomEvent.disableScrollPropagation(containerRef.current);
    }
  }, []);

  //handlers
  const handleAddPoint = (point: [number, number]) => dispatch(addPoint(point));
  const handleUpdateCoords = (coords: [number, number][]) =>
    dispatch(updateCoords(coords));
  const handleNewSegment = () => {
    if (currentSegment.points.length < 2) {
      toast.info("Add atleast 2 points before startng a new segment", {
        position: "top-right",
        duration: 1500,
        style: { background: "#b85545", color: "white" },
      });
      return;
    }
    dispatch(addSegment());
  };

  const handleToggleRouting = () => {
    setIsRoutingMode((prev) => !prev);
  };

  return (
    <div className="relative w-full h-full z-0">
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

        {isRoutingMode && <InfoMessage onToggleRouting={handleToggleRouting} />}

        <RouteLayer
          isRoutingMode={isRoutingMode}
          onAddPoint={handleAddPoint}
          geoJsonData={geoData}
        />

        <LandMarksLayer />
        <InvalidateSize />
        <ZoomTracker />
        <FocusTrigger target={focusTarget} />
        <FloodReportSheet isOpen={isRoutingMode} />
      </MapContainer>

      {isRoutingMode && (
        <>
          <div ref={containerRef}>
            <button
              onClick={handleNewSegment}
              className="absolute top-17 left-15 z-[1000] bg-white px-4 py-2 rounded-md shadow-md border text-sm font-medium"
            >
              + New Segment
            </button>
            <span className="absolute top-27 left-16 z-[1000]">
              No. of Segments: {segments.length}
            </span>
          </div>
        </>
      )}

      <ControllerTab onFocus={setFocusTarget} />
      <ToolBox
        isRoutingMode={isRoutingMode}
        onToggleRouting={handleToggleRouting}
      />
    </div>
  );
}
