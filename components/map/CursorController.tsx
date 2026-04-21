import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers";

type Props = {
  isRoutingMode: boolean;
  geoJsonData: GeoJSON.FeatureCollection;
};

const CursorController = ({ isRoutingMode, geoJsonData }: Props) => {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();

    const updateCursor = (e: MouseEvent) => {
      if (!isRoutingMode) {
        container.classList.remove("cursor-crosshair");
        return;
      }

      //converts mouse pixel to lat lng
      const latlng = map.mouseEventToLatLng(e);

      //converts coordinate to turf helper
      const mousePosition = point([latlng.lng, latlng.lat]);
      const isInside = geoJsonData?.features.some((feature) =>
        booleanPointInPolygon(
          mousePosition,
          feature as GeoJSON.Feature<GeoJSON.Polygon>,
        ),
      );

      if (isInside) {
        container.classList.add("cursor-crosshair");
      } else {
        container.classList.remove("cursor-crosshair");
      }
    };

    container.addEventListener("mousemove", updateCursor);
    return () => container.removeEventListener("mousemove", updateCursor);
  }, [isRoutingMode, map, geoJsonData]);
  return null;
};

export default CursorController;
