import { useQuery } from "@tanstack/react-query";
import { VictimsRepositoryImpl } from "@/infrastructure/api/victims.repository.impl";
import { GetVictims } from "@/domain/use-cases/GetVictims";

const victimsRepository = new VictimsRepositoryImpl();
const getVictimsUseCase = new GetVictims(victimsRepository);

export const useVictims = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["victims"],
    queryFn: () => getVictimsUseCase.execute(),
    staleTime: 5 * 60 * 1000,
  });

  return {
    victims: data,
    isLoading: isLoading,
    error: error,
    refetch: refetch,
  };
};
