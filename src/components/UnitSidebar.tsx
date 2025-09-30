import { useState, useMemo } from 'react';
import { useUnitStore, selectUnits, selectSelectedUnitId, selectIsLoading, selectError } from '@/stores/useUnitStore';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Search, Bot, ServerCrash, Inbox } from 'lucide-react';
import type { UnitStatus } from '@shared/types';
const statusStyles: Record<UnitStatus, string> = {
  ONLINE: 'bg-green-500/20 text-green-400 border-green-500/30',
  IDLE: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  OFFLINE: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  ALERT: 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse',
};
const UnitListContent = () => {
  const units = useUnitStore(selectUnits);
  const selectedUnitId = useUnitStore(selectSelectedUnitId);
  const isLoading = useUnitStore(selectIsLoading);
  const error = useUnitStore(selectError);
  const { setSelectedUnitId } = useUnitStore.getState();
  const [searchTerm, setSearchTerm] = useState('');
  const filteredUnits = useMemo(() => {
    return units.filter(unit =>
      unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [units, searchTerm]);
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="p-2 space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
          <ServerCrash className="h-10 w-10 mb-4 text-red-500" />
          <h3 className="font-semibold">Failed to load data</h3>
          <p className="text-sm">{error}</p>
        </div>
      );
    }
    if (filteredUnits.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
          <Inbox className="h-10 w-10 mb-4" />
          <h3 className="font-semibold">No units found</h3>
          <p className="text-sm">
            {searchTerm ? "Try adjusting your search." : "There are no units to display."}
          </p>
        </div>
      );
    }
    return (
      <div className="p-2 space-y-1">
        {filteredUnits.map(unit => (
          <button
            key={unit.id}
            onClick={() => setSelectedUnitId(unit.id)}
            className={cn(
              'w-full text-left p-3 rounded-md transition-colors duration-200 flex items-center justify-between',
              selectedUnitId === unit.id
                ? 'bg-primary/10'
                : 'hover:bg-muted/50'
            )}
          >
            <div>
              <p className="font-semibold">{unit.name}</p>
              <p className="text-xs text-muted-foreground">{unit.driver.name}</p>
            </div>
            <Badge variant="outline" className={cn('text-xs', statusStyles[unit.status])}>
              {unit.status}
            </Badge>
          </button>
        ))}
      </div>
    );
  };
  return (
    <>
      <div className="p-4 border-b border-border">
        <h2 className="text-2xl font-bold font-display">Aegis Units</h2>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search units..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={isLoading || !!error}
          />
        </div>
      </div>
      <ScrollArea className="flex-grow">{renderContent()}</ScrollArea>
    </>
  );
};
export function UnitSidebar() {
  const units = useUnitStore(selectUnits);
  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <UnitListContent />
      <footer className="p-4 border-t border-border text-xs text-muted-foreground flex items-center gap-2">
        <Bot size={14} />
        <span>{units.length} units loaded. Built with ❤�� at Cloudflare.</span>
      </footer>
    </div>
  );
}