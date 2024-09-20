import {
  IPagination,
  TypedResponseApi,
} from "../../shared/models/typed-response-api.model";

export interface IBaseDataSource<T> {
  list(query: Object): Promise<TypedResponseApi<IPagination<T>>>;
  listWithCount<TEntity>(query: Object): Promise<TypedResponseApi<TEntity>>;
  listOTherTypeWithCount<TEntity>(payload: {
    url: string;
    query: Object;
  }): Promise<TypedResponseApi<TEntity>>;
  listOTherType<TEntity>(payload: {
    url: string;
    query: Object;
  }): Promise<TypedResponseApi<IPagination<TEntity>>>;
  get(id: number | string): Promise<TypedResponseApi<T>>;
  getOtherType<TEntity>(payload: {
    url: string;
    query: Object;
  }): Promise<TypedResponseApi<TEntity>>;
  create(payload: Object): Promise<TypedResponseApi<T>>;
  createOtherType<TEntity>(payload: {
    url: string;
    value: Object;
  }): Promise<TypedResponseApi<TEntity>>;
  update(id: number | string, payload: Object): Promise<TypedResponseApi<T>>;
  updateStatusCode204(
    id: number | string,
    payload: Object,
  ): Promise<TypedResponseApi<T>>;
  updateOtherType<TEntity>(payload: {
    url: string;
    value: Object;
  }): Promise<TypedResponseApi<TEntity>>;
  updateOtherTypeStatusCode204<TEntity>(payload: {
    url: string;
    value: Object;
  }): Promise<TypedResponseApi<TEntity>>;
  remove(id: number | string): Promise<TypedResponseApi<T>>;
  removeOtherType<TEntity>(url: string): Promise<TypedResponseApi<TEntity>>;
}
