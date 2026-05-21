"use client";
import { useEffect, useState } from "react";
import { Polyline, Marker } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { fetchOSRMRoute } from "@/lib/fetchOSRMRoute";
import L from "leaflet";
import { useGetAllSosAlertQuery } from "@/Redux/Services/sosService";
import { setSosReport } from "@/state/slices/sosSignalReportSlice";

const RescueRouteLayer = () => {
  const [polyline, setPolyline] = useState<[number, number][]>([]);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const sosReport = useSelector((state: RootState) => state.sosReport);
  const { data: sosResponse, isSuccess } = useGetAllSosAlertQuery();

  // restore sosReport on refresh
  useEffect(() => {
    if (!isSuccess || !user || !sosResponse) return;

    const activeRescue = sosResponse?.alerts?.find(
      (alert) =>
        alert.status === "dispatched" && alert.rescuerId?._id === user?._id,
    );

    if (activeRescue && sosReport._id === "") {
      dispatch(
        setSosReport({
          _id: activeRescue._id,
          phone: activeRescue._id,
          streetName: activeRescue.streetName,
          condition: activeRescue.condition,
          numberOfPerson: activeRescue.numberOfPersons,
          status: activeRescue.status,
          requestedDate: activeRescue.createdAt,
          coordinates: [
            activeRescue.coords.latitude,
            activeRescue.coords.longitude,
          ],
          rescuerId: activeRescue.rescuerId?._id ?? null,
        }),
      );
    }
  }, [sosResponse, user, isSuccess]);

  const rescuerCoords = user?.coordinates;
  const sosCoords = sosReport.coordinates;
  const hasActiveRescue =
    sosReport._id !== "" && sosReport.status === "dispatched";

  useEffect(() => {
    if (!rescuerCoords || !sosCoords || !hasActiveRescue) return;

    const getRoute = async () => {
      const route = await fetchOSRMRoute([rescuerCoords, sosCoords]);
      setPolyline(route);
    };

    getRoute();
  }, [rescuerCoords, sosCoords]);

  if (!hasActiveRescue || polyline.length === 0) return null;

  return (
    <>
      <Polyline
        positions={polyline}
        pathOptions={{ color: "#1A5EFD", weight: 4 }}
      />
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
