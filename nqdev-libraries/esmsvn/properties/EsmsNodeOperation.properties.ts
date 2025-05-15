import type { INodeProperties } from "n8n-workflow";
import {
  esmsOttOperationModel,
  esmsSmsOperationModel,
  esmsUserOperationModel
} from "./operations";

export const esmsNodeOperationModel: INodeProperties[] = [
  // user
  ...esmsUserOperationModel,

  // sms message
  ...esmsSmsOperationModel,

  // ott message
  ...esmsOttOperationModel,
];
