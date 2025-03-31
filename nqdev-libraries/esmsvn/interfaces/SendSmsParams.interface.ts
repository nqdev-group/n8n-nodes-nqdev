import { IApiAuthorize } from "./ApiAuthorize.interface";

export interface ISendSmsParams extends IApiAuthorize {
  Phone: string;
  Content: string;
  SmsType?: string; // e.g. "2" - Brandname CSKH
  Brandname?: string; // Tên thương hiệu nếu dùng Brandname
  Sandbox?: string; // "0" hoặc "1"
  IsUnicode?: string; // "0" hoặc "1"
  PartnerSource?: string; // "0" hoặc "1"
}
