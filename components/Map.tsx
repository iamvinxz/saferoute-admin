"use client";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { createPortal } from "react-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useGetGeoJsonQuery } from "@/Redux/Services/mapService";
import { useEnableSosSignalMutation } from "@/Redux/Services/sosService";
import InvalidateSize from "@/components/map/InvalidateSize";
import LandMarksLayer from "@/components/map/LandMarksLayer";
import ZoomTracker from "@/components/map/ZoomTracker";
import ControllerTab from "@/components/map/ControllerTab";
import FocusTrigger from "@/components/map/FocusTrigger";
import { useEffect, useRef, useState } from "react";
import ToolBox from "@/components/map/ToolBox";
import RouteLayer from "./map/RouteLayer";
import InfoMessage from "./map/InfoMessage";
import L from "leaflet";
import { toast } from "sonner";
import FloodReportSheet from "@/components/map/FloodIncidentSheet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { addSegment } from "@/state/slices/segment";
import PinLayer from "./map/PinLayer";
import {
  triggerConfirmation,
  triggerSOSsignal,
} from "@/state/slices/sosSignal";
import { LayoutDashboard, Bell, Users } from "lucide-react";
import ViewMarkedLocations from "./notification/ViewMarkedLocations";

export const center: [number, number] = [14.673413900535, 120.9685888671883];
export const maxBounds: [[number, number], [number, number]] = [
  [14.616796295409431, 120.90597134427183],
  [14.718980127971527, 121.00881300073651],
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Bell, label: "Notification", href: "/notification" },
  { icon: Users, label: "Users", href: "/users" },
];

export default function Map() {
  //states
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewFloodedStreets, setViewFloodedStreets] = useState<boolean>(false);
  const isPinMode = useSelector((state: RootState) => state.mode.isPinMode);
  const isRoutingMode = useSelector((state: RootState) => state.mode.isRouting);
  const segments = useSelector((state: RootState) => state.segment.segments); //empty segment
  const currentSegment = segments[segments.length - 1]; //initial undefine
  const sosConfirmation = useSelector(
    (state: RootState) => state.sos.triggerConfirmation,
  );
  const sosSignal = useSelector(
    (state: RootState) => state.sos.triggerSosSignal,
  );

  const [focusTarget, setFocusTarget] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const hasInvalid = currentSegment
    ? Object.values(currentSegment.floodReport).some(
        ([, value]) => value == null || value.trim() === "",
      )
    : false;

  //rtk query
  const { data: geoData } = useGetGeoJsonQuery();
  const [enableSOS] = useEnableSosSignalMutation();

  //prevents penetrations of click on panels
  useEffect(() => {
    if (containerRef.current) {
      L.DomEvent.disableClickPropagation(containerRef.current);
      L.DomEvent.disableScrollPropagation(containerRef.current);
    }
  }, []);

  //handlers
  const handleNewSegment = () => {
    if (!currentSegment) return;
    if (currentSegment.points.length < 2) {
      toast.info("Add atleast 2 points before startng a new segment.", {
        style: { background: "#b85545", color: "white" },
      });
      return;
    } else if (hasInvalid) {
      toast.info("Provide the street and the depth of the flood.", {
        style: { background: "#b85545", color: "white" },
      });
      return;
    }
    dispatch(addSegment());
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
        zoomControl={false}
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

        {(isRoutingMode || isPinMode) && <InfoMessage />}

        <RouteLayer geoJsonData={geoData} />
        <PinLayer geoJsonData={geoData} />

        <LandMarksLayer />
        <InvalidateSize />
        <ZoomTracker />
        <FocusTrigger target={focusTarget} />
        <FloodReportSheet />
      </MapContainer>

      {isRoutingMode && (
        <>
          <div ref={containerRef}>
            <button
              onClick={handleNewSegment}
              className="absolute top-17 left-5 z-1000 bg-white px-4 py-2 rounded-md shadow-md border text-sm font-medium"
            >
              + New Segment
            </button>
            <span className="absolute top-27 left-5 z-1000">
              No. of Segments: {segments.length}
            </span>
          </div>
        </>
      )}

      <ControllerTab
        onFocus={setFocusTarget}
        onToggle={() => setViewFloodedStreets((prev) => !prev)}
      />
      <ToolBox />

      {/**nav bar for maps */}
      <div className="bg-white absolute bottom-10 left-1/2 -translate-x-1/2 z-[400] p-4 space-x-6 rounded-md hover:opacity-100 flex flex-row drop-shadow-lg">
        {navItems.map((nav, index) => (
          <Link href={nav.href} key={index}>
            <div className="flex items-center gap-2 hover:text-[#1A5EFD]">
              <nav.icon size={14} />
              <span className="hidden lg:inline text-xs">{nav.label}</span>
            </div>
          </Link>
        ))}
      </div>

      {/**view modal */}
      {viewFloodedStreets && <ViewMarkedLocations onFocus={setFocusTarget} />}

      {sosConfirmation &&
        createPortal(
          <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl p-6 w-80 flex flex-col gap-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                      stroke="#dc2626"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-base font-semibold text-gray-900">
                  Enable SOS Signal?
                </h2>
                <p className="text-sm text-gray-500">
                  This will alert nearby responders of your emergency. Only use
                  in a real emergency.
                </p>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => dispatch(triggerConfirmation())}
                  className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    dispatch(triggerSOSsignal());
                    dispatch(triggerConfirmation());
                    await enableSOS().unwrap();
                  }}
                  className="flex-1 py-2 rounded-lg bg-red-600 text-sm text-white font-medium hover:bg-red-700"
                >
                  Enable
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/**disable sos signal */}
      {sosConfirmation &&
        sosSignal &&
        createPortal(
          <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl p-8.5 w-80 flex flex-col gap-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                      stroke="#dc2626"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-base font-semibold text-gray-900">
                  Stop SOS Signal?
                </h2>
                <p className="text-sm text-gray-500">
                  Disabling the SOS signal will stop all active emergency
                  alerts.
                </p>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => dispatch(triggerConfirmation())}
                  className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    dispatch(triggerSOSsignal());
                    dispatch(triggerConfirmation());
                    await enableSOS().unwrap();
                  }}
                  className="flex-1 py-2 rounded-lg bg-red-600 text-sm text-white font-medium hover:bg-red-700"
                >
                  Disable SOS
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
