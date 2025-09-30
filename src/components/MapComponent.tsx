import { MapContainer, TileLayer } from 'react-leaflet';
import { MapMarkers } from './MapMarkers';
import { useMapFlyTo } from '@/hooks/useMapFlyTo';
// A wrapper component is needed to use the useMapFlyTo hook
// because useMap must be a child of MapContainer
function MapEvents() {
  useMapFlyTo();
  return null;
}
export function MapComponent() {
  return (
    <MapContainer
      center={[37.7749, -122.4194]} // Default center (San Francisco)
      zoom={10}
      scrollWheelZoom={true}
      className="w-full h-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <MapMarkers />
      <MapEvents />
    </MapContainer>
  );
}