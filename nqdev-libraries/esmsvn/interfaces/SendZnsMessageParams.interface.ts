import type { JsonObject } from "n8n-workflow";
import { IApiAuthorize } from "./ApiAuthorize.interface";

export interface ISendZnsMessageParams extends IApiAuthorize {
  OAID: string;
  TempID: string;
  Phone: string;
  TempData: JsonObject;
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
