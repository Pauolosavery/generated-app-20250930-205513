
import type { Unit, UnitStatus } from '@shared/types';
const MOCK_UNIT_COUNT = 20;
const createMockUnits = (): Unit[] => {
  const units: Unit[] = [];
  const statuses: UnitStatus[] = ['ONLINE', 'IDLE', 'OFFLINE', 'ALERT'];
  const drivers = [
    { name: 'John Doe', contact: '555-0101' },
    { name: 'Jane Smith', contact: '555-0102' },
    { name: 'Alex Johnson', contact: '555-0103' },
    { name: 'Emily White', contact: '555-0104' },
  ];
  const locations = [
    { city: 'San Francisco', lat: 37.77, lon: -122.41 },
    { city: 'New York', lat: 40.71, lon: -74.00 },
    { city: 'Austin', lat: 30.26, lon: -97.74 },
    { city: 'Chicago', lat: 41.87, lon: -87.62 },
  ];
  for (let i = 1; i <= MOCK_UNIT_COUNT; i++) {
    const baseLocation = locations[i % locations.length];
    units.push({
      id: `unit-${i.toString().padStart(3, '0')}`,
      name: `Alpha-${i.toString().padStart(3, '0')}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      latitude: baseLocation.lat + (Math.random() - 0.5) * 0.1,
      longitude: baseLocation.lon + (Math.random() - 0.5) * 0.1,
      speed: Math.random() > 0.2 ? Math.floor(Math.random() * 90) + 10 : 0,
      fuel: Math.floor(Math.random() * 80) + 20,
      temperature: Math.floor(Math.random() * 15) + 10,
      signalStrength: -Math.floor(Math.random() * 40) - 50,
      lastUpdate: new Date().toISOString(),
      driver: drivers[i % drivers.length],
      route: {
        origin: `${baseLocation.city} Depot`,
        destination: 'Central Warehouse',
        progress: Math.floor(Math.random() * 100),
      },
    });
  }
  return units;
};
export class GlobalDurableObject extends DurableObject {
    constructor(state: DurableObjectState, env: any) {
        super(state, env);
    }
    async getUnits(): Promise<Unit[]> {
        let units: Unit[] | undefined = await this.state.storage.get("units");
        if (!units) {
            units = createMockUnits();
            await this.state.storage.put("units", units);
        }
        // Simulate real-time data fluctuations
        const updatedUnits = units.map(unit => {
            const shouldUpdate = Math.random() > 0.5;
            if (!shouldUpdate) return { ...unit, lastUpdate: new Date().toISOString() };
            const newStatus = unit.status;
            if (Math.random() < 0.1) {
                const statuses: UnitStatus[] = ['ONLINE', 'IDLE', 'OFFLINE', 'ALERT'];
                unit.status = statuses[Math.floor(Math.random() * statuses.length)];
            }
            return {
                ...unit,
                status: newStatus,
                latitude: unit.latitude + (Math.random() - 0.5) * 0.001,
                longitude: unit.longitude + (Math.random() - 0.5) * 0.001,
                speed: unit.status === 'ONLINE' ? Math.max(0, unit.speed + (Math.random() - 0.5) * 5) : 0,
                fuel: Math.max(0, unit.fuel - Math.random() * 0.1),
                temperature: unit.temperature + (Math.random() - 0.5) * 0.5,
                signalStrength: Math.min(-50, unit.signalStrength + (Math.random() - 0.5) * 2),
                lastUpdate: new Date().toISOString(),
            };
        });
        await this.state.storage.put("units", updatedUnits);
        return updatedUnits;
    }
}