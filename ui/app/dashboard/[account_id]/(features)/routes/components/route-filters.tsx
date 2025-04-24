import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/date-picker';

export function RouteFilters() {
  return (
    <div className="flex-1 flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search
          className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search routes..." className="pl-8 w-full" />
      </div>
      <div className="flex gap-2">
        <Select>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Transport Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BUS">Bus</SelectItem>
            <SelectItem value="TRAIN">Train</SelectItem>
            <SelectItem value="PLANE">Plane</SelectItem>
          </SelectContent>
        </Select>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">More filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Filter routes by various
                criteria</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Departure Date</Label>
                <DatePicker />
              </div>
              <div className="space-y-2">
                <Label>Operator</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="op1">Operator 1</SelectItem>
                    <SelectItem value="op2">Operator 2</SelectItem>
                    <SelectItem value="op3">Operator 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Origin Station</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select station" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="st1">Station 1</SelectItem>
                    <SelectItem value="st2">Station 2</SelectItem>
                    <SelectItem value="st3">Station 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Destination Station</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select station" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="st1">Station 1</SelectItem>
                    <SelectItem value="st2">Station 2</SelectItem>
                    <SelectItem value="st3">Station 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline">Reset</Button>
              <Button>Apply Filters</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
