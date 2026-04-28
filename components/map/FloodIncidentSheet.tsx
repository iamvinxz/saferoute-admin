import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import L from "leaflet";
import FormSheet from "@/components/map/FormSheet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { removeSegment, updateFloodReport } from "@/state/slices/segment";
import {
  setDescription,
  setPinName,
  removePin,
  clearPins,
} from "@/state/slices/pinSlice";
import { FloodReport } from "@/state/slices/segment";
import { x } from "@/lib/icon";
import { useCreatePinMutation } from "@/Redux/Services/markService";
import { toast } from "sonner";
import { toggleIsPinMode } from "@/state/slices/modeSlice";

const FloodReportSheet = () => {
  const dispatch = useDispatch();
  const segments = useSelector((state: RootState) => state.segment.segments);
  const isRoutingMode = useSelector((state: RootState) => state.mode.isRouting);
  const isPinMode = useSelector((state: RootState) => state.mode.isPinMode);
  const pins = useSelector((state: RootState) => state.pin.pins);
  const [visible, setVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  //rtk query
  const [createPin, { isLoading }] = useCreatePinMutation();

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

  const handleRemovePin = (index: number) => dispatch(removePin(index));
  const handleRemoveSegment = (index: number) => dispatch(removeSegment(index));

  const handleAnimationEnd = () => {
    if (!isRoutingMode && !isPinMode) setVisible(false);
  };

  if (!visible) return null;

  const handleSubmit = async () => {
    try {
      if (pins.length === 0) {
        toast.error("Drop a pin first.", {
          style: { background: "#b85545", color: "white" },
        });
        return;
      }

      const unnamedPin = pins.find((pin) => !pin.pinName?.trim());
      if (unnamedPin) {
        toast.error("Please fill up all pin names before submitting.", {
          style: { background: "#b85545", color: "white" },
        });
        return;
      }

      for (const pin of pins) {
        await createPin({
          latitude: pin.coords[0],
          longitude: pin.coords[1],
          pinName: pin.pinName,
          description: pin.description,
        }).unwrap();
      }

      toast.success("Pinned location created!", {
        style: { background: "#61b728", color: "white" },
      });

      dispatch(toggleIsPinMode());
      dispatch(clearPins());
    } catch (error) {
      console.error(error);
    }
  };

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
          segments.length === 0 ? (
            <p className="text-xs text-gray-400 text-center mt-4">
              Click on the map to create a segment.
            </p>
          ) : (
            segments.map((segment, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Segment {index + 1}
                  </p>
                  <span
                    dangerouslySetInnerHTML={{ __html: x }}
                    onClick={() => handleRemoveSegment(index)}
                  />
                </div>
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
                  visibleFields={["streetName", "depth", "description"]}
                />
              </div>
            ))
          )
        ) : pins.length === 0 ? (
          <p className="text-xs text-gray-400 text-center mt-4">
            Click on the map to drop a pin.
          </p>
        ) : (
          pins.map((pin, index) => (
            <div key={index} className="rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <p className="mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Pinned Location {index + 1}
                </p>
                <span
                  dangerouslySetInnerHTML={{ __html: x }}
                  className="hover:cursor-pointer"
                  onClick={() => handleRemovePin(index)}
                />
              </div>
              <FormSheet
                values={{
                  pinName: pin.pinName,
                  description: pin.description,
                }}
                onChange={(field, value) =>
                  dispatch(
                    field === "pinName"
                      ? setPinName({ index, name: value })
                      : setDescription({ index, description: value }),
                  )
                }
                visibleFields={["pinName", "description"]}
              />
            </div>
          ))
        )}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        className="mt-auto w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
      >
        {isLoading ? "Submitting" : "Submit report"}
      </Button>
    </div>
  );
};

export default FloodReportSheet;
