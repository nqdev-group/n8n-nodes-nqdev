import type { INodeProperties } from "n8n-workflow";

export const haravanShippingFulfillmentOperationModel: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          'shipping_and_fulfillment'
        ]
      }
    },
    options: [
      {
        name: 'Get Fulfillments',
        value: 'getFulfillments',
        description: 'Retrieves a list of fulfillments for an order',
        action: 'Get all fulfillments for an order',
      },
      {
        name: 'Get Fulfillment Count',
        value: 'getFulfillmentCount',
        description: 'Retrieves the count of fulfillments for an order',
        action: 'Get count of fulfillments for an order',
      },
      {
        name: 'Get Fulfillment',
        value: 'getFulfillment',
        description: 'Retrieves a single fulfillment for an order',
        action: 'Get a specific fulfillment for an order',
      },
      {
        name: 'Create Fulfillment',
        value: 'createFulfillment',
        description: 'Create a new fulfillment',
        action: 'Create a fulfillment for an order',
      },
      {
        name: 'Update Fulfillment',
        value: 'updateFulfillment',
        description: 'Update an existing fulfillment',
        action: 'Update a fulfillment for an order',
      },
    ],
    default: 'getFulfillments',
  }
];
