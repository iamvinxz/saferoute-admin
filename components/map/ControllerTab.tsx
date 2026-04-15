import { shelterIcon, barangay, center } from "@/lib/icon";

interface FocusTarget {
  lat: number;
  lng: number;
}

interface Props {
  onFocus: (target: FocusTarget) => void;
}

const ControllerTab = ({ onFocus }: Props) => {
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
  return (
    <div className="flex gap-4 absolute top-3 left-15 z-1000">
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
  );
};

export default ControllerTab;
