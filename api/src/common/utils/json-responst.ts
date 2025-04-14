export function successJsonResponse<T>({
  data,
  message,
  page,
  limit,
  total,
}: {
  data: T;
  message: string;
  page?: number;
  limit?: number;
  total?: number;
}) {
  const totalPage = total && limit && Math.ceil(total / limit);

  return {
    success: true,
    message,
    data,
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
  };
}
