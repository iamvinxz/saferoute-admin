import { PenLine, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";

interface InfoMessageProps {
  onToggleRouting: () => void;
}

const InfoMessage = ({ onToggleRouting }: InfoMessageProps) => {
  //hooks
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      L.DomEvent.disableClickPropagation(containerRef.current);
      L.DomEvent.disableScrollPropagation(containerRef.current);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onToggleRouting();
    }, 500);
  };

  return (
    <div ref={containerRef} className="flex justify-center relative min-h-10">
      <div
        className={`flex items-center gap-2 absolute top-20 z-1000 bg-white text-[#303030] p-5 rounded-lg shadow-md border animate-flip ${isClosing ? "animate-flip-out" : "animate-flip"}`}
      >
        <PenLine size={17} />
        <span className="text-[1rem] font-semibold tracking-wider">
          PLOT THE FLOODED STREET
        </span>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="absolute top-200 z-1000 h-15 w-15 ml-2 rounded-[50%] bg-white text-black hover:cursor-pointer hover:bg-red-200 hover:text-red-800"
              onClick={() => handleClose()}
            >
              <X size={24} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Close</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default InfoMessage;
