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

export interface EsmsListTemplateResponse extends EsmsResponse {
  BrandnameTemplates?: Array<{
    NetworkID?: number;
    TempId?: number;
    TempContent?: string;
  }>;

  ZNSTemplates?: Array<{
    TempId?: number;
    TempName?: string;
    TempContent?: string;
    ZNSTempDetail?: Array<{
      Limit?: number;
      Param?: string;
      ParamLevel?: number;
      RequireType?: string;
    }>;
  }>;
}
