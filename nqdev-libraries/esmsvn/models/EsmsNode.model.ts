import type { INodeProperties } from "n8n-workflow";

import { esmsNodeResourceModel } from "./EsmsNodeResource.model";
import { esmsNodeOperationModel } from "./EsmsNodeOperation.model";
import { esmsOptionModel } from "./EsmsOption.model";

export const esmsNodeModel: INodeProperties[] = [
  // resource
  ...esmsNodeResourceModel,

  // operation
  ...esmsNodeOperationModel,

  // options collection
  ...esmsOptionModel,
];
