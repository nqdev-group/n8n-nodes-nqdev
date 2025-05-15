import type { INodeProperties } from "n8n-workflow";
import { haravanNodeResourceModel } from "./HaravanNodeResource.properties";
import { haravanNodeOperationModel } from "./HaravanNodeOperation.properties";
import { haravanOptionModel } from "./HaravanOption.properties";

export const haravanNodeModel: INodeProperties[] = [
  // resource
  ...haravanNodeResourceModel,

  // operation
  ...haravanNodeOperationModel,

  // options collection
  ...haravanOptionModel,
];
