export type ListResponse<T> = {
  results: T[];
  count: number;
  //   pages: number;
  //   offset: number;
  //   limit: number;
};

export type SingleItemResponse<T> = {
  [K in keyof T as `${string & K}`]: T[K];
};

export type ResourceResponse<T> = SingleItemResponse<T>;
export type ResourceListResponse<T> = ListResponse<T>;
export type DeleteResponse = {
  message: string;
  deletedAt: string;
};
