import { useState } from "react";
import { useMapEvents } from "react-leaflet";
const ZoomTracker = () => {
  const [zoom, setZoom] = useState<number>(16);

  const MIN_ZOOM = 15;
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
    <div className="hidden lg:block absolute bottom-5 left-5 lg:z-[999] bg-white px-3 py-1.5 rounded-lg shadow-md text-sm font-bold">
      Zoom: {zoomPercentage}%
    </div>
  );
};

export default ZoomTracker;
