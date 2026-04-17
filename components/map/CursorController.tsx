import { useEffect } from "react";
import { useMap } from "react-leaflet";

const CursorController = ({ isRoutingMode }: { isRoutingMode: boolean }) => {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    container.style.cursor = isRoutingMode ? "crosshair" : "";
  }, [isRoutingMode, map]);

  return null;
};

export default CursorController;
