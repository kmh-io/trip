'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DateTimePicker } from '@/components/date-time-picker';
import { Card, CardContent } from '@/components/ui/card';
import { createRoute, updateRoute } from '../lib/actions';
import { useRouter } from 'next/navigation';
import type { RouteType } from '../lib/types';
import { useState } from 'react';

const routeFormSchema = z.object({
  origin: z.string().min(2, "Origin must be at least 2 characters"),
  destination: z.string().min(2, "Destination must be at least 2 characters"),
  departure: z.date(),
  arrival: z.date(),
  transportType: z.enum(["BUS", "TRAIN", "PLANE", "FERRY"]),
  operatorId: z.string().uuid(),
  departureStationId: z.string().uuid(),
  arrivalStationId: z.string().uuid(),
})

type RouteFormValues = z.infer<typeof routeFormSchema>

interface RouteFormProps {
  initialData?: RouteType
}

export function RouteForm({ initialData }: RouteFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<RouteFormValues>({
    resolver: zodResolver(routeFormSchema),
    defaultValues: initialData
      ? {
          origin: initialData.origin,
          destination: initialData.destination,
          departure: new Date(initialData.departure),
          arrival: new Date(initialData.arrival),
          transportType: initialData.transportType,
          operatorId: initialData.operatorId,
          departureStationId: initialData.departureStationId,
          arrivalStationId: initialData.arrivalStationId,
        }
      : {
          origin: "",
          destination: "",
          departure: new Date(),
          arrival: new Date(Date.now() + 3600000), // 1 hour from now
          transportType: "BUS",
          operatorId: "",
          departureStationId: "",
          arrivalStationId: "",
        },
  })

  async function onSubmit(values: RouteFormValues) {
    setIsSubmitting(true)
    try {
      if (initialData) {
        await updateRoute(initialData.id, values)
        router.push(`/routes/${initialData.id}`)
      } else {
        const newRouteId = await createRoute(values)
        router.push(`/routes/${newRouteId}`)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
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
                      <Input placeholder="Enter origin" {...field} />
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
                      <Input placeholder="Enter destination" {...field} />
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
                      <DateTimePicker date={field.value} setDate={field.onChange} />
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
                      <DateTimePicker date={field.value} setDate={field.onChange} />
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transport type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="BUS">Bus</SelectItem>
                        <SelectItem value="TRAIN">Train</SelectItem>
                        <SelectItem value="PLANE">Plane</SelectItem>
                        <SelectItem value="FERRY">Ferry</SelectItem>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select operator" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="123e4567-e89b-12d3-a456-426614174000">Operator 1</SelectItem>
                        <SelectItem value="223e4567-e89b-12d3-a456-426614174000">Operator 2</SelectItem>
                        <SelectItem value="323e4567-e89b-12d3-a456-426614174000">Operator 3</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select departure station" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="123e4567-e89b-12d3-a456-426614174001">Station 1</SelectItem>
                        <SelectItem value="223e4567-e89b-12d3-a456-426614174001">Station 2</SelectItem>
                        <SelectItem value="323e4567-e89b-12d3-a456-426614174001">Station 3</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select arrival station" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="123e4567-e89b-12d3-a456-426614174001">Station 1</SelectItem>
                        <SelectItem value="223e4567-e89b-12d3-a456-426614174001">Station 2</SelectItem>
                        <SelectItem value="323e4567-e89b-12d3-a456-426614174001">Station 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : initialData ? "Update Route" : "Create Route"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
