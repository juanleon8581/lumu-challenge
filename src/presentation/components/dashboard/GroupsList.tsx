import { useVictims } from "@/presentation/hooks/useVictims";
import { getOnlyGroupsNames } from "@/presentation/utils/chartDataUtils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

export const GroupsList = () => {
  const { victims } = useVictims();
  const uniqueGroups = getOnlyGroupsNames(victims!);

  return (
    <Command className="w-1/2 h-60 p-4 ">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>Sin resultados.</CommandEmpty>
        <CommandGroup heading="Atacantes">
          {uniqueGroups?.map((group) => (
            <a
              href={`https://www.ransomware.live/group/${group}`}
              target="_blank"
              key={group}
            >
              <CommandItem>{group}</CommandItem>
            </a>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
