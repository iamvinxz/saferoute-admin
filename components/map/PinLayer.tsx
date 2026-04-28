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

  console.log("pin data here", allPins);

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
            <h3 className="font-bold text-[#303030]">{pin.pinName}</h3>
            <hr />
            <span className="text-sm text-[#303030]">{pin.description}</span>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default PinLayer;
