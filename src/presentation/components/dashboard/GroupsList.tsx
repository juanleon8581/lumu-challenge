import { useVictims } from "@/presentation/hooks/useVictims";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { getOnlyGroupsNames } from "@/presentation/utils/chartDataUtils";

export const GroupsList = () => {
  const { victims } = useVictims();
  const uniqueGroups = getOnlyGroupsNames(victims!);

  return (
    <Accordion type="single" collapsible className="w-2/3">
      <AccordionItem value="item-1">
        <AccordionTrigger>Lista de Grupos</AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="h-[200px]  rounded-md border p-4">
            {uniqueGroups?.map((group) => (
              <a
                href={`https://www.ransomware.live/group/${group}`}
                target="_blank"
                key={group}
              >
                <Button variant={"link"} className="block">
                  {group}
                </Button>
              </a>
            ))}
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
