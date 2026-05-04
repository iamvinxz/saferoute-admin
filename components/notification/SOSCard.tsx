import { useGetAllSosAlertQuery } from "@/Redux/Services/sosService";
import {
  UsersIcon,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { getDepthColors, getStatusColors } from "@/lib/colorHelper";
import SOSCardSkeleton from "./SosSignalSkeleton";

const SOSCard = () => {
  //rtk query
  const { data: sosAlerts, isLoading: alertsLoading } =
    useGetAllSosAlertQuery();

  if (alertsLoading) return <SOSCardSkeleton />;
  return (
    <div>
      {sosAlerts?.alerts.map((alert, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden w-full"
        >
          <div className="bg-[#cc3434] px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-medium text-white tracking-wide">
                SOS ALERT
              </span>
            </div>
            <span className="text-xs text-white/80">Just now</span>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                  <UsersIcon className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    {alert.numberOfPersons} people
                  </p>
                  <p className="text-sm text-gray-400">requesting help</p>
                </div>
              </div>
              <span
                className={`text-xs capitalize font-medium px-2 py-0.5 rounded-full border
                  ${getStatusColors(alert.status).badge}
                  ${getStatusColors(alert.status).text}
                `}
              >
                {alert.status}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{alert.streetName}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-sm text-gray-400">Condition:</span>
                <span
                  className={`text-xs capitalize font-medium px-2 py-0.5 rounded-full border
                    ${getDepthColors(alert.condition).badge}
                    ${getDepthColors(alert.condition).text}
                    `}
                >
                  {alert.condition}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#797878]" />
                <span className="text-sm text-[#797878]">Created:</span>
                <span className="text-sm text-[#303030]">
                  {new Date(alert.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-2 rounded-lg bg-[#cc3434] text-white text-xs font-medium hover:bg-[#c75151]">
                Respond
              </button>
              <button className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 text-xs hover:bg-gray-200">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SOSCard;
