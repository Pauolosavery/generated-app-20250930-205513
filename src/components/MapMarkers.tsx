import { Marker, Tooltip } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { useUnitStore, selectUnits, selectSelectedUnitId } from '@/stores/useUnitStore';
import { cn } from '@/lib/utils';
export function MapMarkers() {
  const units = useUnitStore(selectUnits);
  const selectedUnitId = useUnitStore(selectSelectedUnitId);
  const { setSelectedUnitId } = useUnitStore.getState();
  return (
    <>
      {units.map((unit) => {
        const icon = divIcon({
          className: 'leaflet-marker-icon',
          html: `<div class="${cn(
            'unit-marker',
            `leaflet-marker-${unit.status.toLowerCase()}`,
            { 'unit-marker-selected': unit.id === selectedUnitId }
          )}"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });
        return (
          <Marker
            key={unit.id}
            position={[unit.latitude, unit.longitude]}
            icon={icon}
            eventHandlers={{
              click: () => {
                setSelectedUnitId(unit.id);
              },
            }}
          >
            <Tooltip>
              <span className="font-bold">{unit.name}</span> - {unit.status}
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
}