import type { INodeProperties } from "n8n-workflow";

export const esmsUserOperationModel: INodeProperties[] = [
  {
    name: 'operation',
    displayName: 'Operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          'account'
        ]
      }
    },
    options: [
      {
        name: 'Lấy số dư tài khoản ESMSVN',
        action: 'Lấy số dư tài khoản ESMSVN',
        value: 'getBalance',
        description: 'Lấy số dư của tài khoản',
      },
      {
        name: 'Lấy danh sách Brandname',
        action: 'Lấy danh sách Brandname',
        value: 'getListBrandname',
        description: 'Lấy danh sách Brandname',
      }
    ],
    default: 'getBalance'
  }
];
