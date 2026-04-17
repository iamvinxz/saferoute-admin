"use client";
import { useState } from "react";
import { X, LayoutGrid, MapPin, Ruler, Route } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tool {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface Props {
  isRoutingMode: boolean;
  isPinMode: boolean;
  onToggleRouting: () => void;
  onTogglePin: () => void;
}

const ToolBox = ({
  isRoutingMode,
  isPinMode,
  onToggleRouting,
  onTogglePin,
}: Props) => {
  //states
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const defaultTools: Tool[] = [
    {
      icon: <MapPin size={22} />,
      label: isPinMode ? "Stop Pinning" : "Drop Pin",
      onClick: () => {
        if (isRoutingMode) {
          onToggleRouting();
        }
        onTogglePin();
        setIsOpen(false);
      },
    },
    { icon: <Ruler size={22} />, label: "Measure distance", onClick: () => {} },
    {
      icon: <Route size={22} />,
      label: isRoutingMode ? "Stop Plotting" : "Plot Route",
      onClick: () => {
        if (isPinMode) {
          onTogglePin();
        }
        onToggleRouting();
        setIsOpen(false);
      },
    },
  ];

  //handlers

  return (
    <div className="absolute bottom-10 right-10 z-1000 flex flex-col items-end gap-3">
      {/* Tool items — pop up when open */}
      {defaultTools.map((tool, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center gap-2 transition-all duration-200",
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-2 pointer-events-none",
          )}
          style={{
            transitionDelay: isOpen
              ? `${index * 80}ms`
              : `${(defaultTools.length - index) * 60}ms`,
          }}
        >
          <span className="bg-white text-sm px-3 py-1 rounded-lg shadow-md border border-gray-100 whitespace-nowrap">
            {tool.label}
          </span>
          <button
            onClick={tool.onClick}
            className="w-15 h-15 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-blue-50 transition-colors"
          >
            {tool.icon}
          </button>
        </div>
      ))}

      {/* Main toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-15 h-15 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center hover:bg-blue-50 transition-colors"
      >
        <div
          className={cn(
            "transition-all duration-200",
            isOpen ? "rotate-90 opacity-0 absolute" : "rotate-0 opacity-100",
          )}
        >
          <LayoutGrid size={28} />
        </div>
        <div
          className={cn(
            "transition-all duration-200",
            isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0 absolute",
          )}
        >
          <X size={20} />
        </div>
      </button>
    </div>
  );
};

export default ToolBox;
