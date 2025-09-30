import { useUnitStore, selectSelectedUnit } from '@/stores/useUnitStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { UnitStatus } from '@shared/types';
import { Thermometer, Gauge, Signal, Battery, User, Route, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
const statusStyles: Record<UnitStatus, string> = {
  ONLINE: 'bg-green-500/20 text-green-400 border-green-500/30',
  IDLE: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  OFFLINE: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  ALERT: 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse',
};
// Generate some random historical data for the sparkline
const generateSparklineData = (currentValue: number, points = 10) => {
  return Array.from({ length: points }, (_, i) => ({
    name: `p${i}`,
    value: currentValue + (Math.random() - 0.5) * (currentValue * 0.2),
  }));
};
const Sparkline = ({ data, color }: { data: { name: string; value: number }[], color: string }) => (
  <div className="w-20 h-8">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
const DetailItem = ({ icon: Icon, label, value, unit, sparklineData }: { icon: React.ElementType, label: string, value: string | number, unit?: string, sparklineData?: { name: string; value: number }[] }) => (
  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-primary" />
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
    <div className="flex items-center gap-4">
      {sparklineData && <Sparkline data={sparklineData} color="hsl(var(--primary))" />}
      <span className="font-semibold w-20 text-right">{value} {unit}</span>
    </div>
  </div>
);
export function UnitDetailModal() {
  const selectedUnit = useUnitStore(selectSelectedUnit);
  const { setSelectedUnitId } = useUnitStore.getState();
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedUnitId(null);
    }
  };
  if (!selectedUnit) {
    return null;
  }
  const speedData = generateSparklineData(selectedUnit.speed);
  const fuelData = generateSparklineData(selectedUnit.fuel);
  const tempData = generateSparklineData(selectedUnit.temperature);
  const signalData = generateSparklineData(selectedUnit.signalStrength);
  return (
    <Dialog open={!!selectedUnit} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-3xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <span className="text-2xl font-bold font-display">{selectedUnit.name}</span>
            <Badge variant="outline" className={cn('text-sm', statusStyles[selectedUnit.status])}>
              {selectedUnit.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Real-time telemetry and details for unit {selectedUnit.id}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 md:grid-cols-2">
          <DetailItem icon={Gauge} label="Speed" value={selectedUnit.speed.toFixed(1)} unit="km/h" sparklineData={speedData} />
          <DetailItem icon={Battery} label="Fuel Level" value={selectedUnit.fuel.toFixed(1)} unit="%" sparklineData={fuelData} />
          <DetailItem icon={Thermometer} label="Engine Temp" value={selectedUnit.temperature.toFixed(1)} unit="°C" sparklineData={tempData} />
          <DetailItem icon={Signal} label="Signal" value={selectedUnit.signalStrength.toFixed(0)} unit="dBm" sparklineData={signalData} />
          <DetailItem icon={User} label="Driver" value={selectedUnit.driver.name} />
          <DetailItem icon={Route} label="Progress" value={selectedUnit.route.progress.toFixed(0)} unit="%" />
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-2">
            <Clock size={12} />
            <span>Last updated: {format(new Date(selectedUnit.lastUpdate), "PPpp")}</span>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setSelectedUnitId(null)}>Close</Button>
          <Button>Dispatch</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}