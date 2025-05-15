import type { INodeProperties } from "n8n-workflow";

export const haravanOrderOperationModel: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          'order'
        ]
      }
    },
    options: [
      {
        name: 'Get All Checkouts',
        value: 'getAllCheckouts',
        description: 'Retrieve a list of all checkouts',
        action: 'Get all checkouts',
      },
      {
        name: 'Get Checkout Count',
        value: 'getCheckoutCount',
        description: 'Retrieve a count of all checkouts',
        action: 'Get checkout count',
      },
      {
        name: 'Get All Orders',
        value: 'getAllOrders',
        description: 'Retrieve a list of orders',
        action: 'Get all orders',
      },
      {
        name: 'Get Order Count',
        value: 'getOrderCount',
        description: 'Retrieve a count of the orders',
        action: 'Get order count',
      },
      {
        name: 'Get Order',
        value: 'getOrder',
        description: 'Retrieve a single order',
        action: 'Get a specific order by ID',
      },
      {
        name: 'Get Refunds',
        value: 'getRefunds',
        description: 'Retrieve a list of refunds for an order',
        action: 'Get refunds of an order',
      },
      {
        name: 'Get Refund',
        value: 'getRefund',
        description: 'Retrieve a single refund for an order',
        action: 'Get specific refund of an order',
      },
      {
        name: 'Get Transactions',
        value: 'getTransactions',
        description: 'Retrieve a list of transactions of an order',
        action: 'Get transactions of an order',
      },
      {
        name: 'Get Transaction',
        value: 'getTransaction',
        description: 'Retrieve a single transaction of an order by ID',
        action: 'Get specific transaction of an order',
      },
      {
        name: 'Create Order',
        value: 'createOrder',
        description: 'Create an order',
        action: 'Create new order',
      },
      {
        name: 'Update Order',
        value: 'updateOrder',
        description: 'Update order',
        action: 'Update an existing order',
      },
    ],
    default: 'getAllOrders',
  }
];
