import { useState } from "react";
import { useMapEvents } from "react-leaflet";
const ZoomTracker = () => {
  const [zoom, setZoom] = useState<number>(16);

  const MIN_ZOOM = 0;
  const MAX_ZOOM = 19;

  const zoomPercentage = Math.round(
    ((zoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)) * 100,
  );

  useMapEvents({
    zoomend: (e) => {
      setZoom(e.target.getZoom());
    },
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        zIndex: 1000,
        background: "white",
        padding: "6px 12px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        fontSize: "14px",
        fontWeight: "bold",
      }}
    >
      Zoom: {zoomPercentage}%
    </div>
  );
};

export default ZoomTracker;
