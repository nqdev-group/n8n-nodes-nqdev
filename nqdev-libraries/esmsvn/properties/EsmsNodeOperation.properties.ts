import type { INodeProperties } from "n8n-workflow";

import { esmsUserOperationModel } from "./operations/EsmsUser.operation.properties";
import { esmsSmsOperationModel } from "./operations/EsmsSms.operation.properties";
import { esmsOttOperationModel } from "./operations/EsmsOtt.operation.properties";

export const esmsNodeOperationModel: INodeProperties[] = [
  // user
  ...esmsUserOperationModel,

  // sms message
  ...esmsSmsOperationModel,

  // ott message
  ...esmsOttOperationModel,
];
