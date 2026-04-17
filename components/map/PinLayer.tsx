import { Fragment } from "react";
import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import ClickCapture from "./ClickCapture";
import { Marker } from "react-leaflet";
import { addCoordToLastPin } from "@/state/slices/pinSlice";
import { mapPinIcon } from "@/lib/mapIcons";

type Prop = {
  isPinMode: boolean;
  geoJsonData: GeoJSON.FeatureCollection;
};

const PinLayer = ({ isPinMode, geoJsonData }: Prop) => {
  const dispatch = useDispatch();
  const pins = useSelector((state: RootState) => state.pin.pins);
  const handleAddCoords = (coord: [number, number]) =>
    dispatch(addCoordToLastPin(coord));

  return (
    <>
      <ClickCapture
        onClickMode={isPinMode}
        geoJsonData={geoJsonData}
        onMapClick={handleAddCoords}
      />
      {pins.map((pin, pinIndex) => (
        <Fragment key={pinIndex}>
          {pin.coords.map((coord, index) => (
            <Marker
              key={index}
              position={[coord[0], coord[1]]}
              icon={mapPinIcon}
            />
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default PinLayer;
