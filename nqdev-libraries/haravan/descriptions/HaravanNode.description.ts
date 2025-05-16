import type { INodeProperties } from "n8n-workflow";
import { haravanNodeResourceModel } from "./HaravanNodeResource.description";
import { haravanNodeOperationModel } from "./HaravanNodeOperation.description";
import { haravanOptionModel } from "./HaravanOption.description";

export const haravanNodeModel: INodeProperties[] = [
  // resource
  ...haravanNodeResourceModel,

  // operation
  ...haravanNodeOperationModel,

  // options collection
  ...haravanOptionModel,
];
