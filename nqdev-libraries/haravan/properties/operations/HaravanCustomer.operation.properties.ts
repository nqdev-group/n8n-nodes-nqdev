import type { INodeProperties } from "n8n-workflow";

export const haravanCustomerOperationModel: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          'customer'
        ]
      }
    },
    options: [
      {
        name: 'Get All',
        value: 'getAll',
        description: 'Retrieve a list of customers',
        action: 'Get a list of customers',
      },
      {
        name: 'Search',
        value: 'search',
        description: 'Search for customers that match a supplied query',
        action: 'Search customers',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve detail of a customer',
        action: 'Get a customer by ID',
      },
      {
        name: 'Get Count',
        value: 'getCount',
        description: 'Retrieve the count of customers',
        action: 'Get customer count',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new customer',
        action: 'Create customer',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a customer',
        action: 'Delete customer',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a customer',
        action: 'Update customer',
      },
    ],
    default: 'getAll',
  }
]
