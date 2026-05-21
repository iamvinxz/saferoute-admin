"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { clearWatchId } from "@/state/slices/authSlice";
import { clearSosReport } from "@/state/slices/sosSignalReportSlice";
import {
  useUpdateSosStatusMutation,
  useGetAllSosAlertQuery,
} from "@/Redux/Services/sosService";
import { CheckCircle } from "lucide-react";

const RescuePanel = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const watchId = useSelector((state: RootState) => state.auth.watchId);
  const [updateSosStatus, { isLoading: updateSosIsLoading }] =
    useUpdateSosStatusMutation();
  const { data: sosResponse } = useGetAllSosAlertQuery(undefined, {
    pollingInterval: 10000,
    skip: !user,
  });

  // read directly from backend instead of Redux
  const activeSosReportOnRescue = sosResponse?.alerts?.find(
    (alert) =>
      alert.status === "dispatched" && alert.rescuerId?._id === user?._id,
  );

  if (!activeSosReportOnRescue) return null;

  console.log("watchId:", watchId);

  const handleResolve = async () => {
    try {
      console.log("resolving:", {
        id: activeSosReportOnRescue._id,
        status: "resolved",
        rescuerId: user?._id ?? "",
        rescuerCoords: user?.coordinates
          ? { latitude: user.coordinates[0], longitude: user.coordinates[1] }
          : undefined,
      });

      await updateSosStatus({
        id: activeSosReportOnRescue._id,
        status: "resolved",
        rescuerCoords: user?.coordinates
          ? { latitude: user.coordinates[0], longitude: user.coordinates[1] }
          : undefined,
      }).unwrap();

      console.log("resolved successfully");

      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        dispatch(clearWatchId());
      }

      dispatch(clearSosReport());
    } catch (error) {
      console.error("resolve error:", error);
    }
  };

  return (
    <div className="absolute top-5 left-1/2 -translate-x-1/2 z-[400] bg-white rounded-xl shadow-lg p-3 flex items-center gap-3 border border-gray-100">
      <div>
        <p className="text-xs font-semibold text-[#303030]">Active Rescue</p>
        <p className="text-[10px] text-[#848484]">
          {activeSosReportOnRescue.streetName}
        </p>
      </div>
      <button
        onClick={handleResolve}
        disabled={updateSosIsLoading}
        className="flex items-center gap-1.5 px-3 py-2 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors disabled:opacity-60"
      >
        {updateSosIsLoading ? (
          <span>Resolving...</span>
        ) : (
          <>
            <CheckCircle size={14} /> Mark Resolved
          </>
        )}
      </button>
    </div>
  );
};

export default RescuePanel;
