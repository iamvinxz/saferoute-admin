import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface Props {
  target: { lat: number; lng: number } | null;
}

const FocusTrigger = ({ target }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], 19, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [target, map]);

  return null;
};

export default FocusTrigger;
