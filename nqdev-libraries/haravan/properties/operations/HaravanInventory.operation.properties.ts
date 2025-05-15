import type { INodeProperties } from "n8n-workflow";

export const haravanInventoryOperationModel: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          'inventory'
        ]
      }
    },
    options: [
      {
        name: 'Get All',
        value: 'getAll',
        description: 'Retrieve a list of inventory adjustments',
        action: 'Get all inventory adjustments',
      },
      {
        name: 'Get Count',
        value: 'getCount',
        description: 'Retrieve a count of the inventory adjustments',
        action: 'Get inventory adjustment count',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a single inventory adjustment',
        action: 'Get a specific inventory adjustment',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create an inventory adjustment',
        action: 'Create new inventory adjustment',
      },
    ],
    default: 'getAll',
  }
];
