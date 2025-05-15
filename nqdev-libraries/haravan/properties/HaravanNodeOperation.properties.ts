import type { INodeProperties } from "n8n-workflow";
import { haravanCustomerOperationModel } from "./operations/HaravanCustomer.operation.properties";

export const haravanNodeOperationModel: INodeProperties[] = [
  // customer
  ...haravanCustomerOperationModel,

  // inventory

  // order

  // products

  // shipping_and_fulfillment

  // location
];
