import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import ClickCapture from "./ClickCapture";
import { Marker } from "react-leaflet";
import { mapPinIcon } from "@/lib/mapIcons";
import { addPin } from "@/state/slices/pinSlice";

type Prop = {
  isPinMode: boolean;
  geoJsonData: GeoJSON.FeatureCollection;
};

const PinLayer = ({ isPinMode, geoJsonData }: Prop) => {
  const dispatch = useDispatch();
  const pins = useSelector((state: RootState) => state.pin.pins);
  const handleAddCoords = (coord: [number, number]) => dispatch(addPin(coord));

  console.log("Pins here: ", pins);

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
