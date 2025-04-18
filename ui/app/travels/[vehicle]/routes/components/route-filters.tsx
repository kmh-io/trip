"use client";

import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export function RouteFilters() {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [openSections, setOpenSections] = useState({
    transportType: true,
    price: true,
    departureTime: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Collapsible
          open={openSections.transportType}
          onOpenChange={() => toggleSection("transportType")}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full justify-between p-0 font-medium"
            >
              Transport Type
              <ChevronsUpDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="flight" />
                <Label htmlFor="flight">Flight</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="train" />
                <Label htmlFor="train">Train</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="bus" />
                <Label htmlFor="bus">Bus</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="ferry" />
                <Label htmlFor="ferry">Ferry</Label>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={openSections.price}
          onOpenChange={() => toggleSection("price")}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full justify-between p-0 font-medium"
            >
              Price Range
              <ChevronsUpDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-6">
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 500]}
                max={500}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">${priceRange[0]}</span>
                <span className="text-sm">${priceRange[1]}</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={openSections.departureTime}
          onOpenChange={() => toggleSection("departureTime")}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full justify-between p-0 font-medium"
            >
              Departure Time
              <ChevronsUpDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="morning" />
                <Label htmlFor="morning">Morning (6:00 - 12:00)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="afternoon" />
                <Label htmlFor="afternoon">Afternoon (12:00 - 18:00)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="evening" />
                <Label htmlFor="evening">Evening (18:00 - 24:00)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="night" />
                <Label htmlFor="night">Night (00:00 - 6:00)</Label>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Button className="w-full">Apply Filters</Button>
        <Button variant="outline" className="w-full">
          Reset
        </Button>
      </CardContent>
    </Card>
  );
}
