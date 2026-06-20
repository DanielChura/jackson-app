export interface Pageable {
  page: number;
  size: number;
  sort?: string[];
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  validationErrors?: Record<string, string>;
}

export type LoadState<T> =
  | { loading: true; data: null; error: null }
  | { loading: false; data: T; error: null }
  | { loading: false; data: null; error: string };
