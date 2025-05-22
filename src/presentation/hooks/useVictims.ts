import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { VictimsRepositoryImpl } from "@/infrastructure/api/ransomwareApi";
import { GetVictims } from "@/domain/use-cases/GetVictims";
import { useVictimsStore } from "../store/victimsStore";

const victimsRepository = new VictimsRepositoryImpl();
const getVictimsUseCase = new GetVictims(victimsRepository);

export const useVictims = () => {
  const victims = useVictimsStore((state) => state.victims);
  const setVictims = useVictimsStore((state) => state.setVictims);

  const query = useQuery({
    queryKey: ["victims"],
    queryFn: () => getVictimsUseCase.execute(),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data && JSON.stringify(victims) !== JSON.stringify(query.data)) {
      setVictims(query.data);
    }
  }, [query.data, setVictims, victims]);

  return {
    victims,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};
