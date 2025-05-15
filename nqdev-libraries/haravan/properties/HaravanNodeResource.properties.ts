import type { INodeProperties } from "n8n-workflow";

export const haravanNodeResourceModel: INodeProperties[] = [
  {
    displayName: 'Resource',
    name: 'resource',
    type: 'options',
    noDataExpression: true,
    options: [
      {
        name: 'Customer',
        value: 'customer',
      },
      {
        name: 'Inventory',
        value: 'inventory',
      },
      {
        name: 'Order',
        value: 'order',
      },
      {
        name: 'Products',
        value: 'products',
      },
      {
        name: 'Shipping and fulfillment',
        value: 'shipping_and_fulfillment',
      },
      {
        name: 'Location',
        value: 'location',
      }
    ],
    default: 'customer',
  }
];
