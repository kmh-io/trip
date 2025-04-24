'use server';

import {
  ICity,
  IOperator,
  IResponse, IRoute,
  IRouteList,
  IStation,
} from '@/app/dashboard/[account_id]/(features)/routes/lib/types';

const getRequest = async (endpoint: string, query: string) => {
  return fetch(`${process.env.API}/${endpoint}?${query}`);
};

const postRequest = async (endpoint: string, body: object) => {
  return fetch(`${process.env.API}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

const extractData = async <T>(response: Promise<Response>) => {
  const json = await (await response).json() as IResponse<T>;
  if (json.success) {
    return json.data;
  } else {
    console.error(json.message);
  }

  return [];
};

export async function createRoute(data: object) {
  const response = await postRequest('routes', data);
  return response.json();
}

export async function getRoutes(query: {
  departure: string
}): Promise<IRouteList[]> {
  const response = await fetch(
    `${process.env.API}/routes?departure=${query.departure}`,
  );
  const json = await response.json() as IResponse<IRouteList[]>;
  if (json.success) {
    return json.data;
  } else {
    console.error(json.message);
  }

  return [];
}

export async function getRouteById(id: string) {
  return extractData<IRoute>(getRequest(`routes/${id}`, ''));
}

export async function deleteRouteById(id: string) {
}

export async function getCities() {
  return extractData<ICity[]>(getRequest('cities', ''));
}

export async function getStations(cityId: string) {
  return extractData<IStation[]>(getRequest('stations', `cityId=${cityId}`));
}

export async function getOperators() {
  return extractData<IOperator[]>(getRequest('operators', ''));
}