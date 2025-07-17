import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CheckIcon } from "lucide-react";
import { Badge } from "./ui/badge";

interface FacetedInputProps {
  onChange?: (data: string[]) => void;
  value?: string[];
  placeholder?: string;
  options?: { id: string; title: string }[];
  disabled?: boolean;
}

export function FacetedInput({
  placeholder = "",
  onChange = () => {},
  value = [],
  options = [],
  disabled = false,
}: FacetedInputProps) {
  const selectedItems = new Set(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          className="h-9 border-border/70 dark:border-border/70 rounded-xs dark:bg-input md:text-sm justify-start px-3 py-1 text-muted-foreground"
        >
          {selectedItems?.size > 0 ? (
            <>
              <Badge className="rounded-xs px-1 font-normal lg:hidden">
                {selectedItems.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedItems.size > 4 ? (
                  <Badge className="rounded-xs px-1 font-normal">
                    {selectedItems.size} itens selecionados
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedItems.has(option.id))
                    .map((option) => (
                      <Badge
                        key={option.id}
                        className="rounded-xs px-1 font-normal"
                      >
                        {option.title}
                      </Badge>
                    ))
                )}
              </div>
            </>
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popper-anchor-width] p-0 rounded-xs"
        align="start"
        portal={false}
      >
        <Command>
          <CommandInput placeholder="Pesquisar" />
          <CommandList>
            <CommandEmpty>Nenhum item encontrado...</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedItems.has(option.id);

                return (
                  <CommandItem
                    key={option.id}
                    onSelect={() => {
                      if (isSelected) {
                        selectedItems.delete(option.id);
                      } else {
                        selectedItems.add(option.id);
                      }
                      const filteredValues = Array.from(selectedItems);
                      onChange(filteredValues);
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-xs border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon />
                    </div>
                    <span>{option.title}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
