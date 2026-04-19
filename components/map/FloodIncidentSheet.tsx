import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import L from "leaflet";
import FormSheet from "@/components/map/FormSheet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { updateFloodReport } from "@/state/slices/segment";
import { setDescription, setPinName } from "@/state/slices/pinSlice";
import { FloodReport } from "@/state/slices/segment";

type Props = {
  isRoutingMode: boolean;
  isPinMode: boolean;
};

const FloodReportSheet = ({ isRoutingMode, isPinMode }: Props) => {
  const dispatch = useDispatch();
  const segments = useSelector((state: RootState) => state.segment.segments);
  const pins = useSelector((state: RootState) => state.pin.pins);
  const [visible, setVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRoutingMode || isPinMode) {
      setVisible(true);
    }
  }, [isRoutingMode, isPinMode]);

  useEffect(() => {
    if (divRef.current) {
      L.DomEvent.disableClickPropagation(divRef.current);
      L.DomEvent.disableScrollPropagation(divRef.current);
    }
  }, [visible]);

  const handleAnimationEnd = () => {
    if (!isRoutingMode && !isPinMode) setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      ref={divRef}
      onAnimationEnd={handleAnimationEnd}
      className={`absolute bottom-0 left-340 z-1000 flex h-full w-1/4 flex-col gap-5 border-r border-gray-200 bg-white p-6 ${
        isRoutingMode || isPinMode ? "drawer-slide-in" : "drawer-slide-out"
      }`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">
            {isRoutingMode
              ? "FLOOD STREET REPORT"
              : isPinMode
                ? "PIN REPORT"
                : null}
          </h2>
        </div>
        <p className="mt-1 text-xs text-gray-400">
          {isRoutingMode
            ? "Please provide the details for flood report."
            : isPinMode
              ? "Please provide the details for pinned locations."
              : null}
        </p>
      </div>

      <hr className="border-gray-100" />

      {/* Upload zone */}
      <div className="flex flex-col gap-3 overflow-y-auto">
        {isRoutingMode ? (
          segments.map((segment, index) => (
            <div key={index} className="rounded-xl border border-gray-100 p-4">
              <p className="mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Segment {index + 1}
              </p>
              <FormSheet
                values={segment.floodReport}
                onChange={(field, value) =>
                  dispatch(
                    updateFloodReport({
                      index,
                      field: field as keyof FloodReport,
                      value,
                    }),
                  )
                }
                visibleFields={[
                  "imageUrl",
                  "streetName",
                  "depth",
                  "description",
                ]}
              />
            </div>
          ))
        ) : pins.length === 0 ? (
          <p className="text-xs text-gray-400 text-center mt-4">
            Click on the map to add a pin.
          </p>
        ) : (
          pins.map((pin, index) => (
            <div key={index} className="rounded-xl border border-gray-100 p-4">
              <p className="mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Pinned Location {index + 1}
              </p>
              <FormSheet
                values={{ pinName: pin.pinName, description: pin.description }}
                onChange={(field, value) =>
                  dispatch(
                    field == "pinName"
                      ? setPinName({ index, name: value })
                      : setDescription({ index, description: value }),
                  )
                }
                visibleFields={["imageUrl", "pinName", "description"]}
              />
            </div>
          ))
        )}
      </div>

      <Button className="mt-auto w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white hover:bg-gray-700">
        Submit report
      </Button>
    </div>
  );
};

export default FloodReportSheet;
