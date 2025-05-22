import { create } from "zustand";
import { VictimsRepositoryImpl } from "@/infrastructure/api/ransomwareApi";
import { GetVictims } from "@/domain/use-cases/GetVictims";
import type { IVictim } from "@/domain/interfaces/IVictim";

interface VictimsState {
  victims: IVictim[];
  isLoading: boolean;
  error: Error | null;
  fetchVictims: () => Promise<void>;
}

const victimsRepository = new VictimsRepositoryImpl();
const getVictimsUseCase = new GetVictims(victimsRepository);

export const useVictimsStore = create<VictimsState>((set) => ({
  victims: [],
  isLoading: false,
  error: null,
  fetchVictims: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await getVictimsUseCase.execute();
      set({ victims: data, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },
}));
