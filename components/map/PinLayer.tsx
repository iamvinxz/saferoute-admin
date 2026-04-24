import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import ClickCapture from "@/components/map/ClickCapture";
import { Marker } from "react-leaflet";
import { mapPinIcon } from "@/lib/icon";
import { addPin } from "@/state/slices/pinSlice";
import { toast } from "sonner";

type Prop = {
  geoJsonData: GeoJSON.FeatureCollection;
};

const PinLayer = ({ geoJsonData }: Prop) => {
  const dispatch = useDispatch();
  const pins = useSelector((state: RootState) => state.pin.pins);
  const isPinMode = useSelector((state: RootState) => state.mode.isPinMode);
  const currentPin = pins[pins.length - 1];

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
    </>
  );
};

export default PinLayer;
