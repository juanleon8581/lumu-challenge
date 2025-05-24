import { GetGroup } from "@/domain/use-cases/GetGroup";
import { GroupRepositoryImpl } from "@/infrastructure/api/group.repository.impl";
import { useQuery } from "@tanstack/react-query";

const groupRepository = new GroupRepositoryImpl();
const getGroupUseCase = new GetGroup(groupRepository);

export const useGroups = (groupName: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["groups"],
    queryFn: () => getGroupUseCase.execute(groupName),
  });

  return {
    groups: data,
    isLoading,
    error,
    refetch,
  };
};
