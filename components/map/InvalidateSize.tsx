import { useEffect } from "react";
import { useMap } from "react-leaflet";

const InvalidateSize = () => {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100);
  }, [map]);

  return null;
};

export default InvalidateSize;
