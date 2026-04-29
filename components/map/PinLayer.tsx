import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import ClickCapture from "@/components/map/ClickCapture";
import { Marker, Popup } from "react-leaflet";
import { mapPinIcon } from "@/lib/leafletIcon";
import { addPin } from "@/state/slices/pinSlice";
import { toast } from "sonner";
import { useGetAllPinQuery } from "@/Redux/Services/markService";

type Prop = {
  geoJsonData: GeoJSON.FeatureCollection;
};

const PinLayer = ({ geoJsonData }: Prop) => {
  const dispatch = useDispatch();
  const pins = useSelector((state: RootState) => state.pin.pins);
  const isPinMode = useSelector((state: RootState) => state.mode.isPinMode);
  const currentPin = pins[pins.length - 1];

  //rtk query
  const { data, isLoading } = useGetAllPinQuery();
  const allPins = data?.pins ?? [];

  //handlers
  const handleAddCoords = (coord: [number, number]) => {
    if (currentPin) {
      const hasInvalid =
        !currentPin.pinName.trim() || !currentPin.description.trim();
      if (hasInvalid) {
        toast.info("Provide the details of the pin.", {
          style: { background: "#b85545", color: "white" },
        });
        return;
      }
    }
    dispatch(addPin(coord));
  };

  return (
    <>
      <ClickCapture
        onClickMode={isPinMode}
        geoJsonData={geoJsonData}
        onMapClick={handleAddCoords}
      />
      {pins.map((pin, index) => (
        <Marker key={index} position={pin.coords} icon={mapPinIcon} />
      ))}

      {allPins.map((pin, index) => (
        <Marker key={index} position={pin.coords} icon={mapPinIcon}>
          <Popup>
            <div className="min-w-45 max-w-70">
              <h3
                className={`font-semibold text-[#303030] leading-tight warap-break-words ${
                  pin.pinName.length > 20
                    ? "text-sm"
                    : pin.pinName.length > 12
                      ? "text-base"
                      : "text-lg"
                }`}
              >
                {pin.pinName}
              </h3>

              {pin.description && (
                <div className="mt-1">
                  <span className="text-xs text-[#303030] leading-relaxed wrap-break-words">
                    {pin.description}
                  </span>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default PinLayer;
