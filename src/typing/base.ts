export type BaseData = {
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
};

export type ListParams<T> = T & {
  pageNum: number;
  pageSize: number;
};
