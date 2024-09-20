import axios, { AxiosError, AxiosResponse } from "axios";
import { _dialog } from "../shared/config/dialog";
import { TypedResponseApi } from "../shared/models/typed-response-api.model";

const processError = <T>(error: AxiosError): T => {
  const { code, message, response } = error;
  console.error(`StatusCode: ${code} - ${message}`);
  const data = (response?.data ?? {}) as TypedResponseApi<T>;

  let validationMessage = data?.message ?? "Error system";
  if (data.validationErrors && data.validationErrors.length > 0) {
    const error = data.validationErrors[0];
    const errorMessage = error.split("@")[1];
    validationMessage = errorMessage ?? "Error system";
  }
  _dialog.messageFromAxios(`${data?.error ?? code}`, `${validationMessage}`);
  return (response?.data ?? {}) as T;
};

const responseBody = <T>(res: AxiosResponse<any>): T => res.data as T;

const BaseApiDataSource = {
  get: <T>(url: string, params?: Object) => {
    return axios
      .get(url, { params })
      .then((response) => responseBody<T>(response))
      .catch((error: AxiosError) => processError<T>(error));
  },

  post: <T>(url: string, data: any) =>
    axios
      .post(url, data)
      .then((response) => responseBody<T>(response))
      .catch((error: AxiosError) => processError<T>(error)),

  put: <T>(url: string, data: any) =>
    axios
      .put(url, data)
      .then((response) => responseBody<T>(response))
      .catch((error: AxiosError) => processError<T>(error)),

  putStatusCode204: <T>(url: string, data: any) =>
    axios
      .put(url, data)
      .then((response) => response)
      .catch((error: AxiosError) => processError<T>(error)),

  patch: <T>(url: string, data: any) =>
    axios
      .patch(url, data)
      .then((response) => responseBody<T>(response))
      .catch((error: AxiosError) => processError<T>(error)),

  patchStatusCode204: <T>(url: string, data: any) =>
    axios
      .patch(url, data)
      .then((response) => response)
      .catch((error: AxiosError) => processError<T>(error)),

  delete: <T>(url: string) =>
    axios
      .delete(url)
      .then((response) => responseBody<T>(response))
      .catch((error: AxiosError) => processError<T>(error)),

  postWithFile: <T>(url: string, data: any) =>
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => responseBody<T>(response))
      .catch((error: AxiosError) => processError<T>(error)),
};
export default BaseApiDataSource;
