import { create } from 'zustand';
import type { Unit } from '@shared/types';
interface UnitStoreState {
  units: Unit[];
  selectedUnitId: string | null;
  isLoading: boolean;
  error: string | null;
  setUnits: (units: Unit[]) => void;
  setSelectedUnitId: (id: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}
export const useUnitStore = create<UnitStoreState>((set) => ({
  units: [],
  selectedUnitId: null,
  isLoading: true,
  error: null,
  setUnits: (units) => set({ units, isLoading: false, error: null }),
  setSelectedUnitId: (id) => set({ selectedUnitId: id }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
}));
// Selectors
export const selectUnits = (state: UnitStoreState) => state.units;
export const selectSelectedUnitId = (state: UnitStoreState) => state.selectedUnitId;
export const selectIsLoading = (state: UnitStoreState) => state.isLoading;
export const selectError = (state: UnitStoreState) => state.error;
export const selectSelectedUnit = (state: UnitStoreState) =>
  state.units.find((unit) => unit.id === state.selectedUnitId) || null;