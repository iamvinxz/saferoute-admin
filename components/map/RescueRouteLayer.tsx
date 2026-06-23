"use client";
import { useEffect, useState } from "react";
import { Polyline, Marker } from "react-leaflet";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { fetchOSRMRoute } from "@/lib/fetchOSRMRoute";
import L from "leaflet";
import { useGetAllSosAlertQuery } from "@/Redux/Services/sosService";
import { useGetAllSegmentQuery } from "@/Redux/Services/markService";
import { getDetourWaypoints } from "@/lib/avoidFlood";
import { isMobileDevice } from "@/lib/deviceHelper";

const RescueRouteLayer = () => {
  const [polyline, setPolyline] = useState<[number, number][]>([]);
  const [localRescuerCoords, setLocalRescuerCoords] = useState<
    [number, number] | undefined
  >();
  const user = useSelector((state: RootState) => state.auth.user);

  //rtk
  const { data: sosResponse } = useGetAllSosAlertQuery({ limit: 100, page: 1 },, {
    pollingInterval: 10000, // refetch every 10s
    skip: !user,
  });
  const { data: segmentResponse } = useGetAllSegmentQuery();

  const activeSosReportOnRescue = sosResponse?.alerts?.find(
    (alert) =>
      alert.status === "dispatched" && alert.rescuerId?._id === user?._id,
  );
  const rescuerCoords: [number, number] | undefined = user?.coordinates;
  const isResponded = activeSosReportOnRescue?.status === "responded";
  const sosCoords: [number, number] | undefined = activeSosReportOnRescue
    ? [
        activeSosReportOnRescue.coords.latitude,
        activeSosReportOnRescue.coords.longitude,
      ]
    : undefined;

  useEffect(() => {
    if (user?.coordinates) {
      setLocalRescuerCoords(user.coordinates);
      return;
    }
    // fallback: get position directly if Redux coords not ready yet
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocalRescuerCoords([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => console.error(err),
      { enableHighAccuracy: isMobileDevice(), maximumAge: 0 },
    );
  }, []);

  useEffect(() => {
    if (user?.coordinates) {
      setLocalRescuerCoords(user.coordinates);
    }
  }, [user?.coordinates]);

  // fetch polyline when coords are ready
  useEffect(() => {
    if (!rescuerCoords || !sosCoords) return;

    const getRoute = async () => {
      const waypoints = getDetourWaypoints(
        rescuerCoords,
        sosCoords,
        segmentResponse?.segments ?? [],
      );
      const route = await fetchOSRMRoute(waypoints);
      setPolyline(route);
    };

    getRoute();
  }, [rescuerCoords, sosCoords, segmentResponse]);

  if (!activeSosReportOnRescue || polyline.length === 0) return null;

  return (
    <>
      {!isResponded && (
        <Polyline
          positions={polyline}
          pathOptions={{ color: "#1A5EFD", weight: 4 }}
        />
      )}
      {rescuerCoords && (
        <Marker
          position={rescuerCoords}
          icon={L.divIcon({
            className: "",
            html: `<div style="background:#1A5EFD;width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 6px rgba(0,0,0,0.3)"></div>`,
          })}
        />
      )}
      {sosCoords && (
        <Marker
          position={sosCoords}
          icon={L.divIcon({
            className: "",
            html: `<div style="background:red;width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 6px rgba(0,0,0,0.3)"></div>`,
          })}
        />
      )}
    </>
  );
};

export default RescueRouteLayer;
