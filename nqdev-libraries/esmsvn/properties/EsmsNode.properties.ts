import type { INodeProperties } from "n8n-workflow";

import { esmsNodeResourceModel } from "./EsmsNodeResource.properties";
import { esmsNodeOperationModel } from "./EsmsNodeOperation.properties";
import { esmsOptionModel, esmsSmsModel } from "./EsmsOption.properties";

export const esmsNodeModel: INodeProperties[] = [
  // resource
  ...esmsNodeResourceModel,

  // operation
  ...esmsNodeOperationModel,

  // options collection
  ...esmsSmsModel,
  ...esmsOptionModel,
];
