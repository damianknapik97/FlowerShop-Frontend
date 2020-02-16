export interface RestPage<T> {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
  last: boolean;
  totalPages: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
