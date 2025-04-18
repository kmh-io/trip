"use client";

import { useState, useEffect } from "react";
import { format, addDays, isSameDay, startOfDay } from "date-fns";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateSelectorProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

export function DateSelector({
  onDateSelect,
  selectedDate,
}: DateSelectorProps) {
  const [startDate, setStartDate] = useState(startOfDay(new Date()));
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Generate 7 days from the start date (one week)
  const dates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  // Navigate to previous week
  const handlePrevious = () => {
    setStartDate(addDays(startDate, -7));
  };

  // Navigate to next week
  const handleNext = () => {
    setStartDate(addDays(startDate, 7));
  };

  // When selectedDate changes from outside, update the week view to include it
  useEffect(() => {
    // Check if the selected date is within the current week view
    const isDateInCurrentWeek = dates.some((date) =>
      isSameDay(date, selectedDate)
    );

    // If not, update the startDate to show a week that includes the selected date
    if (!isDateInCurrentWeek) {
      // Calculate the day difference to maintain the same day of week pattern
      const dayOfWeek = startDate.getDay();
      const selectedDayOfWeek = selectedDate.getDay();
      const diff = selectedDayOfWeek - dayOfWeek;

      // Calculate the new start date
      const newStartDate = addDays(selectedDate, -diff);

      // Only update if it's actually different to avoid infinite loops
      if (!isSameDay(newStartDate, startDate)) {
        setStartDate(newStartDate);
      }
    }
    // Only depend on selectedDate and startDate, not on derived values
  }, [selectedDate, startDate]);

  // Handle date selection from the calendar popup
  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      onDateSelect(date);
      setCalendarOpen(false);
    }
  };

  return (
    <div className="w-full bg-card rounded-lg border shadow-sm">
      <div className="flex items-center justify-between p-2 border-b">
        <Button variant="ghost" size="icon" onClick={handlePrevious}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous week</span>
        </Button>

        <div className="flex items-center gap-2">
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1 px-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {format(startDate, "MMM d")} -{" "}
                  {format(addDays(startDate, 6), "MMM d, yyyy")}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleCalendarSelect}
                initialFocus
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button variant="ghost" size="icon" onClick={handleNext}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next week</span>
        </Button>
      </div>

      <div className="grid grid-cols-7 p-2">
        {dates.map((date) => {
          const isToday = isSameDay(date, new Date());
          const isSelected = isSameDay(date, selectedDate);

          return (
            <Button
              key={date.toISOString()}
              variant="ghost"
              className={cn(
                "flex flex-col h-auto py-2 px-1 rounded-md gap-1",
                isSelected && "bg-primary/10 text-primary",
                !isSelected && isToday && "border-primary border"
              )}
              onClick={() => onDateSelect(date)}
            >
              <span className="text-xs font-normal">{format(date, "EEE")}</span>
              <span className={cn("text-lg", isSelected && "font-bold")}>
                {format(date, "d")}
              </span>
              <span className="text-xs font-normal text-muted-foreground">
                {format(date, "MMM")}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
