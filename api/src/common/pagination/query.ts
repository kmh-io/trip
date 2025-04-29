import { BaseQueryDTO } from './base-query.dto';

export interface Query<F> {
  page: number;
  take: number;
  skip: number;
  orderBy: { [key: string]: any };
  filters: F;
}

function validate<F>(query: F, filters: F) {
  const resultFilters: { [key: string]: any } = {};

  for (const key in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, key)) {
      const element = query[key];
      if (element) {
        resultFilters[key] = element;
      } else if (filters[key]) {
        resultFilters[key] = filters[key];
      }
    }
  }

  return resultFilters as F;
}

export function toValidQuery<F>(query: BaseQueryDTO, filters: F): Query<F> {
  const page = query.page ?? 1;
  const take = query.limit ?? 10;
  const skip = (page - 1) * take;
  const sortBy = query.sortBy ?? 'asc';
  const orderBy = { [query.orderBy]: sortBy };

  const f = validate<F>(query as F, filters);

  return { page, take, skip, orderBy, filters: f };
}
