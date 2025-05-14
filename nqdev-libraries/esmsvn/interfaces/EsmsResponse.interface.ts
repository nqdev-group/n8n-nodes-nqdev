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

export interface EsmsListZaloOaResponse extends EsmsResponse {
  ZOAList?: Array<{
    OAID?: string;
    OAName?: string;
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

export interface EsmsTemplateInfoResponse extends EsmsResponse {
  Error?: number;
  Message?: string;

  Data?: {
    TemplateId?: string;
    TemplateName?: string;
    TemplateQuality?: string;
    TemplateTag?: 'TRANSACTION' | string;
    Timeout?: number;
    Status?: 'ENABLE' | string;
    Reason?: string;
    PreviewUrl?: string;
    ListButtons: any;

    ListParams?: Array<{
      AcceptNull?: boolean;
      MaxLength?: number;
      MinLength?: number;
      Name?: string;
      Require?: boolean;
      Type?: 'STRING' | string;
    }>;
  };
}
