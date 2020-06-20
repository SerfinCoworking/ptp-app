export interface PaginationResult<T> {
  docs: T[];
  total: number;
  limit: number;
  page?: number;
  pages: number;
}
