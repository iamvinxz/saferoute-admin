import { useMap } from "react-leaflet";

export const useMapFocus = () => {
  const map = useMap();

  const focusOn = (lat: number, lng: number, zoom = 19) => {
    map.flyTo([lat, lng], zoom, {
      animate: true,
      duration: 1.5,
    });
  };

  return { focusOn };
};
