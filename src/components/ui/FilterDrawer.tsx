"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { SlidersHorizontal } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterGroup {
  title: string;
  options: FilterOption[];
  selected: string[];
  onChange: (value: string[]) => void;
}

interface FilterDrawerProps {
  groups: FilterGroup[];
  additionalFilters?: {
    id: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }[];
}

export const FilterDrawer = ({
  groups,
  additionalFilters,
}: FilterDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-gray-900/95 border-gray-800">
        <ScrollArea className="h-full px-4">
          <div className="space-y-8 py-4">
            {groups.map((group, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4">{group.title}</h3>
                <div className="space-y-2">
                  {group.options.map((option) => (
                    <div key={option.id} className="flex items-center gap-2">
                      <Checkbox
                        id={option.id}
                        checked={group.selected.includes(option.id)}
                        onCheckedChange={(checked) => {
                          group.onChange(
                            checked
                              ? [...group.selected, option.id]
                              : group.selected.filter((id) => id !== option.id)
                          );
                        }}
                      />
                      <label
                        htmlFor={option.id}
                        className="text-sm text-gray-300"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {additionalFilters && (
              <div className="space-y-2">
                {additionalFilters.map((filter) => (
                  <div key={filter.id} className="flex items-center gap-2">
                    <Checkbox
                      id={filter.id}
                      checked={filter.checked}
                      onCheckedChange={(checked) =>
                        filter.onChange(checked as boolean)
                      }
                    />
                    <label
                      htmlFor={filter.id}
                      className="text-sm text-gray-300"
                    >
                      {filter.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
