import { IStyle } from "../../atoms/text/interfaces/IStyle";

export interface IThTableCellStyle extends IStyle {
  textAlign?: string;
}

export interface IColumnHeader {
  text: string;
  value: string;
  iconPre?: string;
  style?: IThTableCellStyle;
  colorIcon?: string;
  isDelete?: boolean;
}
