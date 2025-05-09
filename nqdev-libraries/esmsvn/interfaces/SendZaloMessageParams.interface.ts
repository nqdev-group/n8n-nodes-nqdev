import type { IDataObject, JsonObject } from "n8n-workflow";
import { IApiAuthorize } from "./ApiAuthorize.interface";

interface ISendZaloMessageParams extends IApiAuthorize {
  OAID: string;
  RequestId?: string;
  CallbackUrl?: string;
  Sandbox?: string; // "0" hoặc "1"
}

export interface ISendZnsMessageParams extends ISendZaloMessageParams {
  OAID: string;
  TempID: string;
  Phone: string;
  TempData: JsonObject | IDataObject;
  /**
   * Thời gian hẹn gửi của tin. Không truyền khi tin muốn tin nhắn gửi đi liền.
   * Định dạng: yyyy-mm-dd hh:MM:ss.
   */
  SendDate?: string;
  campaignid?: string;
  RequestId?: string;
  CallbackUrl?: string;
  Sandbox?: string; // "0" hoặc "1"
  IsUnicode?: string; // "0" hoặc "1"
  PartnerSource?: string;
}

export interface ISendUidMessageParams extends ISendZaloMessageParams {
  OAID: string;
  RequestId?: string;
  CallbackUrl?: string;
  Sandbox?: string; // "0" hoặc "1"
}
