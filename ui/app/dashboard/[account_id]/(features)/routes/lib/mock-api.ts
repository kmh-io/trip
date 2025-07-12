"use server";

import { ApiResponse, Query } from "@/lib/type";
import { faker } from "@faker-js/faker";
import { IOperator, IRoute, IRouteList, IStation } from "./types";

faker.seed(123);

const transportTypes = ["BUS", "TRAIN", "FLIGHT"] as const;

const cities = [
  faker.location.city(),
  faker.location.city(),
  faker.location.city(),
  faker.location.city(),
  faker.location.city(),
];

function randomCity(exclude?: string) {
  let city: string;
  do {
    city = faker.helpers.arrayElement(cities);
  } while (city === exclude);
  return city;
}

function randomStation(city: string): IStation {
  return {
    id: faker.string.uuid(),
    name: `${city} ${faker.word.words({ count: { min: 1, max: 2 } })} Station`,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
}

function randomOperator(): IOperator {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
}

const routes: IRoute[] = Array.from({ length: 100 }).map(() => {
  const origin = faker.helpers.arrayElement(cities);
  const destination = randomCity(origin);
  const departure = faker.date.soon({ days: 1 });
  const duration = faker.number.int({ min: 30, max: 600 });
  const arrival = new Date(departure.getTime() + duration * 60000);
  const transportType = faker.helpers.arrayElement(transportTypes);

  return {
    id: faker.string.uuid(),
    departure: departure.toISOString(),
    arrival: arrival.toISOString(),
    origin,
    destination,
    duration,
    transportType,
    images: [
      faker.image.urlPicsumPhotos({ width: 640, height: 480 }),
      faker.image.urlPicsumPhotos({ width: 640, height: 480 }),
    ],
    operator: randomOperator(),
    departureStation: randomStation(origin),
    arrivalStation: randomStation(destination),
  };
});

export async function searchRoutes(
  query: Query
): Promise<ApiResponse<IRoute[]>> {
  const filteredRoutes = routes.filter(
    (route) =>
      route.origin.toLowerCase().includes(query.search?.toLowerCase() || "") ||
      route.destination
        .toLowerCase()
        .includes(query.search?.toLowerCase() || "")
  );

  return {
    message: "Routes are successfully fetched.",
    success: true,
    data: filteredRoutes.slice(
      query.page * query.limit,
      query.page * query.limit + query.limit
    ),
    metaData: {
      limit: query.limit,
      page: query.page + 1,
      totalCounts: filteredRoutes.length,
      totalPages: Math.ceil(filteredRoutes.length / query.limit),
    },
  };
}

export async function fetchRouteList(
  query: Query
): Promise<ApiResponse<IRouteList[]>> {
  if (query.search) {
    return searchRoutes(query);
  }

  const start = query.page * 10;
  const routeList: IRouteList[] = routes
    .slice(start, start + query.limit)
    .map((route) => ({
      id: route.id,
      departure: route.departure,
      arrival: route.arrival,
      origin: route.origin,
      destination: route.destination,
      duration: route.duration,
      transportType: route.transportType,
    }));

  return {
    message: "Rotue list is successfully fetched.",
    success: true,
    data: routeList,
    metaData: {
      limit: query.limit,
      page: query.page + 1,
      totalCounts: routes.length,
      totalPages: routes.length / query.limit,
    },
  };
}

export async function fetchRoutes(
  query: Query
): Promise<ApiResponse<IRoute[]>> {
  const start = query.page * 10;
  const data: IRoute[] = routes.slice(start, start + query.limit);

  return {
    message: "Routes are successfully fetched.",
    success: true,
    data: data,
    metaData: {
      limit: query.limit,
      page: query.page + 1,
      totalCounts: routes.length,
      totalPages: routes.length / query.limit,
    },
  };
}

export async function deleteRouteById(id: string): Promise<ApiResponse<null>> {
  return {
    message: `Route id ${id} is successfully deleted.`,
    success: true,
  };
}
