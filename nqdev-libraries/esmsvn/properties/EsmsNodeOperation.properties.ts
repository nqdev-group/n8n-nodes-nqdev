import type { INodeProperties } from "n8n-workflow";

import { esmsUserOperationModel } from "./EsmsUserOperation.properties";
import { esmsSmsOperationModel } from "./EsmsSmsOperation.properties";
import { esmsOttOperationModel } from "./EsmsOttOperation.properties";

export const esmsNodeOperationModel: INodeProperties[] = [
  // user
  ...esmsUserOperationModel,

  // sms message
  ...esmsSmsOperationModel,

  // ott message
  ...esmsOttOperationModel,
];
