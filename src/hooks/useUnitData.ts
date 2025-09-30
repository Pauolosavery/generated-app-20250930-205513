import { useEffect } from 'react';
import { useUnitStore } from '@/stores/useUnitStore';
import type { ApiResponse, Unit } from '@shared/types';
const POLLING_INTERVAL = 3000; // 3 seconds
export function useUnitData() {
  const { setUnits, setError, setLoading } = useUnitStore();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/units');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: ApiResponse<Unit[]> = await response.json();
        if (result.success && result.data) {
          setUnits(result.data);
        } else {
          throw new Error(result.error || 'Failed to fetch unit data');
        }
      } catch (error) {
        console.error('Error fetching unit data:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    };
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, POLLING_INTERVAL);
    return () => {
      clearInterval(intervalId);
    };
  }, [setUnits, setError, setLoading]);
}