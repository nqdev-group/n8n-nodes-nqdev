import type { INodeProperties } from "n8n-workflow";

import { esmsUserOperationModel } from "./EsmsUserOperation.model";
import { esmsSmsOperationModel } from "./EsmsSmsOperation.model";
import { esmsOttOperationModel } from "./EsmsOttOperation.model";

export const esmsNodeOperationModel: INodeProperties[] = [
  // user
  ...esmsUserOperationModel,

  // sms message
  ...esmsSmsOperationModel,

  // ott message
  ...esmsOttOperationModel,
];
