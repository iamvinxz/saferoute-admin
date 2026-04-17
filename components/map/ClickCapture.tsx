import { useMapEvents } from "react-leaflet";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers";
import { toast } from "sonner";

type Prop = {
  onClickMode: boolean;
  geoJsonData: GeoJSON.FeatureCollection;
  onMapClick: (coord: [number, number]) => void;
};

const ClickCapture = ({ onClickMode, geoJsonData, onMapClick }: Prop) => {
  useMapEvents({
    click(e) {
      if (!onClickMode) return;
      const clicked = point([e.latlng.lng, e.latlng.lat]);

      const isInside = geoJsonData.features.some((feature) =>
        booleanPointInPolygon(
          clicked,
          feature as GeoJSON.Feature<GeoJSON.Polygon>,
        ),
      );

      if (!isInside) {
        toast.info("Plot within Barangay only", {
          position: "top-right",
          duration: 1500,
          style: { background: "#b85545", color: "white" },
        });
        return;
      }
      onMapClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

export default ClickCapture;
