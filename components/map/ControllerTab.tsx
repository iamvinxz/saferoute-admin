import { shelterIcon, barangay, center, floodedStreet } from "@/lib/icon";
import { RootState } from "@/state/store";
import { OctagonAlert } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "@/Redux/Services/authService";
import { useGetSosAvailabilityQuery } from "@/Redux/Services/sosService";

interface FocusTarget {
  lat: number;
  lng: number;
}

interface Props {
  onFocus: (target: FocusTarget) => void;
  onToggle: () => void;
}

const controllers = [
  {
    icon: shelterIcon,
    name: "Evacuation Center",
    coordinates: {
      lat: 14.671372083129416,
      lng: 120.97004644282855,
    },
  },
  {
    icon: barangay,
    name: "Barangay Hall",
    coordinates: {
      lat: 14.67020445507815,
      lng: 120.96488547174975,
    },
  },
  {
    icon: center,
    name: "Health Center",
    coordinates: {
      lat: 14.671671704218502,
      lng: 120.97030390962857,
    },
  },
];

const ControllerTab = ({ onFocus, onToggle }: Props) => {
  const sosSignal = useSelector(
    (state: RootState) => state.sos.triggerSosSignal,
  );

  const { data: sos } = useGetSosAvailabilityQuery();

  console.log(sos?.isSosEnabled);
  return (
    <div className="absolute top-3 z-400 flex items-center justify-between w-full px-5">
      <div className="flex gap-4">
        {controllers.map((ctrl, index) => (
          <button
            key={index}
            onClick={() => onFocus(ctrl.coordinates)} // go to specific marker
            className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-md hover:bg-blue-50 hover:shadow-lg transition-all cursor-pointer"
          >
            <span dangerouslySetInnerHTML={{ __html: ctrl.icon }} />
            <span className="hidden lg:inline text-sm font-medium">
              {ctrl.name}
            </span>
          </button>
        ))}
        {/**sos indictor */}
        {(sos?.isSosEnabled || sosSignal) && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative z-1000 w-12 h-12 rounded-md bg-[#9d70707a] flex items-center justify-center hover:cursor-pointer">
                  <OctagonAlert color="red" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <span>SOS Signal Enabled</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <button
        className="bg-white px-3 py-2 rounded-md shadow-md relative flex items-center gap-2 hover:bg-blue-50 hover:shadow-lg cursor-pointer"
        onClick={() => onToggle()}
      >
        <span dangerouslySetInnerHTML={{ __html: floodedStreet }} />
        <span className="hidden lg:inline text-sm font-medium">
          View Marked Locations
        </span>
      </button>
    </div>
  );
};

export default ControllerTab;
