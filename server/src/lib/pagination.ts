export interface PaginationParams {
  page?: string | number;
  limit?: string | number;
}

export function getPagination({ page = 1, limit = 10 }: PaginationParams) {
  const pageNumber = Math.max(1, parseInt(page as any, 10) || 1);
  const pageSize = Math.max(1, parseInt(limit as any, 10) || 10);

  const start = (pageNumber - 1) * pageSize;
  const end = start + pageSize;

  return {
    pageNumber,
    pageSize,
    start,
    end,
  };
}