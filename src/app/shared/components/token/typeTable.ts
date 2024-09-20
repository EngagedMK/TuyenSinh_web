interface IconHeader {
  value: string;
  color?: string | null;
}
type typeSearch = "text" | "number" | "date" | "select" | "daterange";
interface ValueSeach {
  text: string;
  value: any;
}
interface SearchHeader {
  type: typeSearch;
  value?: Array<ValueSeach> | any | null;
  placeholder: string;
  multiple?: boolean;
  onChange?: (any: any) => any | null;
}
export interface TypeTableHeaderDefault {
  id: number;
  iconPre?: string;
  iconAppend?: string;
  value: string;
  sort?: (a: any, b: any) => number;
  icon?: IconHeader | null;
  search?: SearchHeader | null;
}
