import { type IDataObject } from "n8n-workflow";

export interface EsmsResponse extends IDataObject {
  CodeResult?: string | number;
  CodeResponse?: string | number;
  ErrorMessage?: string;
}

export interface EsmsListBrandnameResponse extends EsmsResponse {
  ListBrandName?: Array<{
    Type?: number;
    Brandname?: string;
    ServiceId?: string;
  }>;
}
