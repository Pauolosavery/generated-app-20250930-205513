import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useUnitStore } from '@/stores/useUnitStore';
export function useMapFlyTo() {
  const map = useMap();
  const selectedUnit = useUnitStore((state) => state.selectedUnit);
  useEffect(() => {
    if (selectedUnit) {
      map.flyTo([selectedUnit.latitude, selectedUnit.longitude], 14, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [selectedUnit, map]);
  return null;
}