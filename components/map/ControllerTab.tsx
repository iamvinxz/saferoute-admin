import { shelterIcon, barangay, center, floodedStreet } from "@/lib/icon";
import { useState } from "react";

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
      lat: 14.671713871663536,
      lng: 120.97042400298534,
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
  return (
    <>
      <div className="absolute top-3 left-15 z-400 flex items-center w-436 justify-between">
        <div className="flex gap-4">
          {controllers.map((ctrl, index) => (
            <button
              key={index}
              onClick={() => onFocus(ctrl.coordinates)} // go to specific marker
              className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-md hover:bg-blue-50 hover:shadow-lg transition-all cursor-pointer"
            >
              <span dangerouslySetInnerHTML={{ __html: ctrl.icon }} />
              <span className="text-sm font-medium">{ctrl.name}</span>
            </button>
          ))}
        </div>
        <button
          className="bg-white px-3 py-2 rounded-md shadow-md relative right-5 flex items-center gap-2 hover:bg-blue-50 hover:shadow-lg cursor-pointer w-60"
          onClick={() => onToggle()}
        >
          <span dangerouslySetInnerHTML={{ __html: floodedStreet }} />
          <span className="text-sm font-medium">View Flooded Streets</span>
        </button>
      </div>
    </>
  );
};

export default ControllerTab;
