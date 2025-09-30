export type UnitStatus = 'ONLINE' | 'IDLE' | 'OFFLINE' | 'ALERT';
export interface Unit {
  id: string;
  name: string;
  status: UnitStatus;
  latitude: number;
  longitude: number;
  speed: number; // in km/h
  fuel: number; // percentage
  temperature: number; // in Celsius
  signalStrength: number; // in dBm
  lastUpdate: string; // ISO 8601 timestamp
  driver: {
    name: string;
    contact: string;
  };
  route: {
    origin: string;
    destination: string;
    progress: number; // percentage
  };
}
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}