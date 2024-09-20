import {
  IPagination,
  TypedResponseApi,
} from "../shared/models/typed-response-api.model";
import BaseApiDataSource from "./BaseApiDataSource";
import { IBaseDataSource } from "./interfaces/IBaseDataSource";
import { EResultCode } from "../shared/enums/EResultCode";

export abstract class BaseApiService<T> implements IBaseDataSource<T> {
  private _url = "";

  constructor(url: string) {
    this._url = url;
  }

  async list(query: Object): Promise<TypedResponseApi<IPagination<T>>> {
    const response = await BaseApiDataSource.get<
      TypedResponseApi<IPagination<T>>
    >(this._url, { ...query });
    return response;
  }

  async listWithCount<TEntity>(
    query: Object,
  ): Promise<TypedResponseApi<TEntity>> {
    const response = await BaseApiDataSource.get<TypedResponseApi<TEntity>>(
      this._url,
      { ...query },
    );
    return response;
  }

  async listOTherTypeWithCount<TEntity>(payload: {
    url: string;
    query: Object;
  }): Promise<TypedResponseApi<TEntity>> {
    const response = await BaseApiDataSource.get<TypedResponseApi<TEntity>>(
      payload.url,
      { ...payload.query },
    );
    return response;
  }

  async listOTherType<TEntity>(payload: {
    url: string;
    query: Object;
  }): Promise<TypedResponseApi<IPagination<TEntity>>> {
    const response = await BaseApiDataSource.get<
      TypedResponseApi<IPagination<TEntity>>
    >(`${payload.url}`, {
      ...payload.query,
    });
    return response;
  }

  async get(id: number | string): Promise<TypedResponseApi<T>> {
    const response = await BaseApiDataSource.get<TypedResponseApi<T>>(
      `${this._url}/${id}`,
    );
    return response;
  }

  async getOtherType<TEntity>(payload: {
    url: string;
    query: Object;
  }): Promise<TypedResponseApi<TEntity>> {
    const response = await BaseApiDataSource.get<TypedResponseApi<TEntity>>(
      `${payload.url}`,
      {
        ...payload.query,
      },
    );
    return response;
  }

  create = async (payload: Object): Promise<TypedResponseApi<T>> => {
    const response = await BaseApiDataSource.post<TypedResponseApi<T>>(
      `${this._url}`,
      payload,
    );
    return response;
  };

  async createOtherType<TEntity>(payload: {
    url: string;
    value: Object;
  }): Promise<TypedResponseApi<TEntity>> {
    const response = await BaseApiDataSource.post<TypedResponseApi<TEntity>>(
      `${payload.url}`,
      payload.value,
    );
    return response;
  }

  update = async (
    id: number | string,
    payload: Object,
  ): Promise<TypedResponseApi<T>> => {
    const response = await BaseApiDataSource.put<TypedResponseApi<T>>(
      `${this._url}/${id}`,
      payload,
    );
    return response;
  };

  async updateStatusCode204(
    id: number | string,
    payload: Object,
  ): Promise<TypedResponseApi<T>> {
    const response = await BaseApiDataSource.putStatusCode204<any>(
      `${this._url}/${id}`,
      payload,
    );
    if (response.status === EResultCode.UPDATE) {
      response.resultCode = EResultCode.UPDATE;
      response.success = true;
    }

    return response as TypedResponseApi<T>;
  }

  async updateOtherType<TEntity>(payload: {
    url: string;
    value: Object;
  }): Promise<TypedResponseApi<TEntity>> {
    const response = await BaseApiDataSource.put<TypedResponseApi<TEntity>>(
      `${payload.url}`,
      payload.value,
    );
    return response;
  }

  async updateOtherTypeStatusCode204<TEntity>(payload: {
    url: string;
    value: Object;
  }): Promise<TypedResponseApi<TEntity>> {
    const response = await BaseApiDataSource.putStatusCode204<any>(
      `${payload.url}`,
      payload.value,
    );
    if (response.status === EResultCode.UPDATE) {
      response.resultCode = EResultCode.UPDATE;
      response.success = true;
    }

    return response as TypedResponseApi<TEntity>;
  }

  remove = async (id: number | string): Promise<TypedResponseApi<T>> => {
    const response = await BaseApiDataSource.delete<TypedResponseApi<T>>(
      `${this._url}/${id}`,
    );
    return response;
  };

  async removeOtherType<TEntity>(
    url: string,
  ): Promise<TypedResponseApi<TEntity>> {
    const response = await BaseApiDataSource.delete<TypedResponseApi<TEntity>>(
      `${url}`,
    );
    return response;
  }

  patch = async (id: number, payload: Object): Promise<TypedResponseApi<T>> => {
    const response = await BaseApiDataSource.patch<TypedResponseApi<T>>(
      `${this._url}/${id}`,
      payload,
    );
    return response;
  };

  async patchStatusCode204(
    id: number,
    payload: Object,
  ): Promise<TypedResponseApi<T>> {
    const response = await BaseApiDataSource.patchStatusCode204<any>(
      `${this._url}/${id}`,
      payload,
    );
    if (response.status === EResultCode.UPDATE) {
      response.resultCode = EResultCode.UPDATE;
      response.success = true;
    }

    return response as TypedResponseApi<T>;
  }

  async patchOtherType<TEntity>(payload: {
    url: string;
    value: Object;
  }): Promise<TypedResponseApi<TEntity>> {
    const response = await BaseApiDataSource.patch<TypedResponseApi<TEntity>>(
      `${payload.url}`,
      payload.value,
    );
    return response;
  }

  async patchOtherTypeStatusCode204<TEntity>(payload: {
    url: string;
    value: Object;
  }): Promise<TypedResponseApi<TEntity>> {
    const response = await BaseApiDataSource.patchStatusCode204<any>(
      `${payload.url}`,
      payload.value,
    );
    if (response.status === EResultCode.UPDATE) {
      response.resultCode = EResultCode.UPDATE;
      response.success = true;
    }

    return response as TypedResponseApi<TEntity>;
  }
}
