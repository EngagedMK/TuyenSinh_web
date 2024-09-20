import { IColumnHeader } from "../components/molecules/interfaces/IThTableCellStyle";
import { EResultCode } from "../enums/EResultCode";

export interface TypedResponseApi<T> {
  success: boolean;
  resultCode: EResultCode;
  message: any;
  validationErrors: string[];
  data: T;
  error?: string;
}

export interface IPagination<T> {
  page: number;
  size: number;
  total: number;
  count: number;
  results: T[];
  headers?: IColumnHeader[];
}
