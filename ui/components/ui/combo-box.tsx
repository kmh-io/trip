'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';
import * as React from 'react';

interface DataType {
  id: string;
  name: string;
}

export interface ComboBoxProps {
  className?: string;
  placeholder: string;
  defaultValue: string;
  values: DataType[];
  onValueChange: (value: string) => void;
}

export function ComboBox({
                           values,
                           defaultValue,
                           placeholder,
                           onValueChange,
                         }: ComboBoxProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[200px] justify-between"
        >
          {defaultValue
            ? values.find((v) => v.id === defaultValue)?.name
            : `${placeholder}...`}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder}...`} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {values.map((value) => (
                <CommandItem
                  key={value.id}
                  value={value.id}
                  onSelect={(value) => {
                    onValueChange(value);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      defaultValue === value.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {value.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
