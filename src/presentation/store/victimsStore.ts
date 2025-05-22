import { create } from "zustand";
import type { IVictim } from "@/domain/interfaces/IVictim";

interface VictimsState {
  victims: IVictim[];
  isLoading: boolean;
  error: Error | null;
  setVictims: (victims: IVictim[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
}

export const useVictimsStore = create<VictimsState>((set) => ({
  victims: [],
  isLoading: false,
  error: null,
  setVictims: (victims) =>
    set((state) => {
      if (JSON.stringify(state.victims) !== JSON.stringify(victims)) {
        return { victims };
      }
      return state;
    }),
  setLoading: (isLoading) =>
    set((state) => {
      if (state.isLoading !== isLoading) {
        return { isLoading };
      }
      return state;
    }),
  setError: (error) =>
    set((state) => {
      if (state.error !== error) {
        return { error };
      }
      return state;
    }),
}));
