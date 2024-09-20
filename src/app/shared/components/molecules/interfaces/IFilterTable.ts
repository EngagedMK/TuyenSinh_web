export interface IFilterParams {
  page?: number;
  size?: number;
  sort?: string;
  order?: string;
  type?: string;
  [x: string | number | symbol]: any;
}
export interface Filter extends IFilterParams {
  status?: {
    value: string;
    label: string;
  };

  title?: {
    value: string;
    label: string;
  };

  description?: {
    value: string;
    label: string;
  };
}
