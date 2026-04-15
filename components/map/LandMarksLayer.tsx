import { Marker, Popup } from "react-leaflet";
import { landMarks } from "@/Redux/Services/landMarks";
import type L from "leaflet";

interface Location {
  name: string;
  icon: L.DivIcon;
  coordinates: { lat: number; lng: number };
}

const LandMarksLayer = () => (
  <>
    {landMarks.map((loc: Location, index: number) => (
      <Marker
        key={index}
        position={[loc.coordinates.lat, loc.coordinates.lng]}
        icon={loc.icon}
      >
        <Popup>{loc.name}</Popup>
      </Marker>
    ))}
  </>
);

export default LandMarksLayer;
