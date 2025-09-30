import { useEffect } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { DashboardHeader } from '@/components/DashboardHeader';
import { UnitSidebar } from '@/components/UnitSidebar';
import { MapComponent } from '@/components/MapComponent';
import { UnitDetailModal } from '@/components/UnitDetailModal';
import { useUnitData } from '@/hooks/useUnitData';
import { useTheme } from '@/hooks/use-theme';
import { useIsMobile } from '@/hooks/use-mobile';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  // Ensure dark theme is set by default for the 'command center' aesthetic
  const { isDark, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  useEffect(() => {
    if (!isDark) {
      toggleTheme();
    }
  }, [isDark, toggleTheme]);
  // Initialize data polling
  useUnitData();
  return (
    <main className="w-full h-screen max-w-full bg-background text-foreground overflow-hidden">
      <ResizablePanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        className="h-full w-full"
      >
        <ResizablePanel defaultSize={isMobile ? 40 : 25} minSize={isMobile ? 30 : 20} maxSize={isMobile ? 50 : 35}>
          <UnitSidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={isMobile ? 60 : 75}>
          <div className="relative w-full h-full">
            <DashboardHeader />
            <MapComponent />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <UnitDetailModal />
      <Toaster richColors closeButton theme={isDark ? 'dark' : 'light'} />
    </main>
  );
}