import type { INodeProperties } from "n8n-workflow";
import {
  haravanCustomerOperationModel,
  haravanInventoryOperationModel,
  haravanLocationOperationModel,
  haravanOrderOperationModel,
  haravanProductsOperationModel,
  haravanShippingFulfillmentOperationModel
} from "./operations";

export const haravanNodeOperationModel: INodeProperties[] = [
  // customer
  ...haravanCustomerOperationModel,

  // inventory
  ...haravanInventoryOperationModel,

  // order
  ...haravanOrderOperationModel,

  // products
  ...haravanProductsOperationModel,

  // shipping_and_fulfillment
  ...haravanShippingFulfillmentOperationModel,

  // location
  ...haravanLocationOperationModel,
];
