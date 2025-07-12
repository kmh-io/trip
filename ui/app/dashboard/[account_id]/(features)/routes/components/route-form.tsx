"use client";

import {
  ICity,
  ICreateRoute,
  IOperator,
  IStation,
} from "@/app/dashboard/[account_id]/(features)/routes/lib/types";
import { DateTimePicker } from "@/components/date-time-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ComboBox } from "@/components/ui/combo-box";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createRoute, getStations, updateRoute } from "../lib/mock-api";

const routeFormSchema = z.object({
  origin: z.string().min(2, "Origin must be at least 2 characters"),
  destination: z.string().min(2, "Destination must be at least 2 characters"),
  departure: z.date(),
  arrival: z.date(),
  transportType: z.enum(["BUS", "TRAIN", "FLIGHT"]),
  operatorId: z.string().uuid(),
  departureStationId: z.string().uuid(),
  arrivalStationId: z.string().uuid(),
});

type RouteFormValues = z.infer<typeof routeFormSchema>;

interface RouteFormProps {
  routeId?: string;
  cities: ICity[];
  operators: IOperator[];
  initialRoute?: ICreateRoute;
}

const defaultRoute: ICreateRoute = {
  origin: "",
  destination: "",
  departure: new Date(),
  arrival: new Date(Date.now() + 3600000 * 24),
  transportType: "BUS",
  operatorId: "",
  departureStationId: "",
  arrivalStationId: "",
};

export function RouteForm({
  routeId,
  initialRoute,
  cities,
  operators,
}: RouteFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [departureStations, setDepartureStations] = useState<IStation[]>([]);
  const [arrivalStations, setArrivalStations] = useState<IStation[]>([]);

  const form = useForm<RouteFormValues>({
    resolver: zodResolver(routeFormSchema),
    defaultValues: initialRoute ?? defaultRoute,
  });
  const origin = form.watch("origin");
  const destination = form.watch("destination");

  useEffect(() => {
    if (origin) {
      (async () => {
        const stations = await getStations(origin);
        setDepartureStations(stations);
      })();
    }

    if (destination) {
      (async () => {
        const stations = await getStations(destination);
        setArrivalStations(stations);
      })();
    }
  }, [origin, destination, form]);

  async function onSubmit(values: RouteFormValues) {
    setIsSubmitting(true);
    try {
      let data: { success: boolean; message: string };
      if (initialRoute && routeId) {
        data = await updateRoute(routeId, values);
      } else {
        data = await createRoute(values);
      }

      if (data.success) {
        toast.success("Route created", {
          description: data.message,
        });
        form.reset(defaultRoute);
      } else {
        toast.error("Error", {
          description: data.message,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin</FormLabel>
                    <FormControl>
                      <ComboBox
                        placeholder={"Select origin"}
                        values={cities}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <ComboBox
                        placeholder={"Select destination"}
                        values={cities}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="departure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departure Time</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        date={field.value}
                        setDate={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="arrival"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Arrival Time</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        date={field.value}
                        setDate={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transportType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transport Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transport type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="BUS">Bus</SelectItem>
                        <SelectItem value="TRAIN">Train</SelectItem>
                        <SelectItem value="FLIGHT">FLIGHT</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="operatorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operator</FormLabel>
                    <ComboBox
                      placeholder={"Select operator"}
                      defaultValue={field.value}
                      values={operators}
                      onValueChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="departureStationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departure Station</FormLabel>
                    <FormControl>
                      <ComboBox
                        placeholder={"Select destination station..."}
                        values={departureStations}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="arrivalStationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Arrival Station</FormLabel>
                    <FormControl>
                      <ComboBox
                        placeholder={"Select arrival station..."}
                        values={arrivalStations}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : initialRoute
              ? "Update Route"
              : "Create Route"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
