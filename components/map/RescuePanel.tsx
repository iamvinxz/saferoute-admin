"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { clearWatchId } from "@/state/slices/authSlice";
import { clearSosReport } from "@/state/slices/sosSignalReportSlice";
import { useUpdateSosStatusMutation } from "@/Redux/Services/sosService";
import { CheckCircle } from "lucide-react";

const RescuePanel = () => {
  const dispatch = useDispatch();
  const sosReport = useSelector((state: RootState) => state.sosReport);
  const watchId = useSelector((state: RootState) => state.auth.watchId);
  const [updateSosStatus] = useUpdateSosStatusMutation();

  const hasActiveRescue =
    sosReport._id !== "" && sosReport.status === "dispatched";

  if (!hasActiveRescue) return null;

  const handleResolve = async () => {
    try {
      await updateSosStatus({
        id: sosReport._id,
        status: "resolved",
        rescuerId: "",
      }).unwrap();

      // stop location tracking
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        dispatch(clearWatchId());
      }

      // clear sos report from Redux
      dispatch(clearSosReport());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute max-lg:top-20 top-5 left-1/2 -translate-x-1/2 z-[400] bg-white rounded-xl shadow-lg p-3 flex items-center gap-3 border border-gray-100">
      <div>
        <p className="text-xs font-semibold text-[#303030]">Active Rescue</p>
        <p className="text-[10px] text-[#848484]">{sosReport.streetName}</p>
      </div>
      <button
        onClick={handleResolve}
        className="flex items-center gap-1.5 px-3 py-2 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors"
      >
        <CheckCircle size={14} /> Mark Resolved
      </button>
    </div>
  );
};

export default RescuePanel;
