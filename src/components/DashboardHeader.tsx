import { useMemo } from 'react';
import { useUnitStore, selectUnits } from '@/stores/useUnitStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
export function DashboardHeader() {
  const units = useUnitStore(selectUnits);
  const stats = useMemo(() => {
    const total = units.length;
    const online = units.filter(u => u.status === 'ONLINE').length;
    const idle = units.filter(u => u.status === 'IDLE').length;
    const alert = units.filter(u => u.status === 'ALERT').length;
    return { total, online, idle, alert };
  }, [units]);
  return (
    <header className="absolute top-0 left-0 right-0 p-4 z-10">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All assets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display text-green-500">{stats.online}</div>
            <p className="text-xs text-muted-foreground">Active units</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Idle</CardTitle>
            <XCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display text-yellow-500">{stats.idle}</div>
            <p className="text-xs text-muted-foreground">On standby</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display text-red-500">{stats.alert}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>
    </header>
  );
}