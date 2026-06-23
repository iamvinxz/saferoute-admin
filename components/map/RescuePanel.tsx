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

  const [updateSosStatus, { isLoading: updateSosIsLoading }] =
    useUpdateSosStatusMutation();
  const { data: sosResponse } = useGetAllSosAlertQuery(
    { limit: 100, page: 1 },
    {
      pollingInterval: 10000,
      skip: !user,
    },
  );

  // read directly from backend instead of Redux
  const activeSosReportOnRescue = sosResponse?.alerts?.find(
    (alert) =>
      alert.status === "dispatched" && alert.rescuerId?._id === user?._id,
  );

  if (!activeSosReportOnRescue) return null;

  const handleResponded = async () => {
    try {
      await updateSosStatus({
        id: activeSosReportOnRescue._id,
        status: "responded",
        rescuerCoords: user?.coordinates
          ? { latitude: user.coordinates[0], longitude: user.coordinates[1] }
          : undefined,

        coords: user?.coordinates //set the user coords as coords of sos
          ? {
              latitude: user.coordinates[0],
              longitude: user.coordinates[1],
            }
          : undefined,
      }).unwrap();

      dispatch(clearSosReport());
    } catch (error) {
      console.error("resolve error:", error);
    }
  };

  return (
    <div className="absolute max-w-75 w-70 top-20 left-1/2 -translate-x-1/2 z-[400] bg-white rounded-xl shadow-lg p-3 flex items-center justify-between gap-3 border border-gray-100 lg:top-5 lg:w-70">
      <div>
        <p className="text-xs font-semibold text-[#303030]">Active Rescue</p>
        <p className="text-[11px] text-[#848484]">
          {activeSosReportOnRescue.streetName}
        </p>
      </div>
      <button
        onClick={handleResponded}
        disabled={updateSosIsLoading}
        className="flex items-center gap-1.5 px-3 py-2 bg-teal-500 text-white text-xs rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-60"
      >
        {updateSosIsLoading ? (
          <span>Resolving...</span>
        ) : (
          <>
            <CheckCircle size={14} /> Mark Reponded
          </>
        )}
      </button>
    </div>
  );
};

export default RescuePanel;
