import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const PulsingMarker = ({ center }: { center: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    const pulseIcon = L.divIcon({
      className: "",
      html: `
        <div style="position:relative; width:20px; height:20px;">
          <div class="ping-ring"></div>
          <div class="ping-dot"></div>
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    const marker = L.marker(center, { icon: pulseIcon }).addTo(map);
    return () => {
      map.removeLayer(marker);
    };
  }, [map, center]);

  return null;
};

export default PulsingMarker;
