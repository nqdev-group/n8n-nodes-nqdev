import type { IDataObject } from "n8n-workflow";

export interface IApiAuthorize extends IDataObject {
  ApiKey?: string;
  SecretKey?: string;
}
