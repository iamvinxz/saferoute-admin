import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { useRef, useState, useEffect } from "react";
import L from "leaflet";
import FormSheet from "@/components/map/FormSheet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";

type Props = {
  isOpen: boolean;
};

const FloodReportSheet = ({ isOpen }: Props) => {
  const segments = useSelector((state: RootState) => state.segment.segments);
  const [visible, setVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (divRef.current) {
      L.DomEvent.disableClickPropagation(divRef.current);
      L.DomEvent.disableScrollPropagation(divRef.current);
    }
  }, [visible]);

  if (!visible) return null;

  const handleAnimationEnd = () => {
    if (!isOpen) setVisible(false);
  };

  console.log("segments here", segments);

  return (
    <div
      ref={divRef}
      onAnimationEnd={handleAnimationEnd}
      className={`absolute bottom-0 left-340 z-1000 flex h-full w-1/4 flex-col gap-5 border-r border-gray-200 bg-white p-6 ${
        isOpen ? "drawer-slide-in" : "drawer-slide-out"
      }`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">
            Flood street report
          </h2>
        </div>
        <p className="mt-1 text-xs text-gray-400">
          Document flood conditions for emergency routing
        </p>
      </div>

      <hr className="border-gray-100" />

      {/* Upload zone */}
      <div className="flex flex-col gap-3 overflow-y-auto">
        {segments.map((segment, index) => (
          <div key={index} className="rounded-xl border border-gray-100 p-4">
            <p className="mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Segment {index + 1}
            </p>
            <FormSheet index={index} floodReport={segment.floodReport} />
          </div>
        ))}
      </div>

      <Button className="mt-auto w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white hover:bg-gray-700">
        Submit report
      </Button>
    </div>
  );
};

export default FloodReportSheet;
