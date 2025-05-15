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
        name: 'Số dư tài khoản',
        action: 'Lấy số dư tài khoản ESMSVN',
        value: 'getBalance',
        description: 'Truy xuất số dư hiện tại của tài khoản ESMSVN.',
      },
      {
        name: 'Danh sách Brandname',
        action: 'Lấy danh sách Brandname',
        value: 'getListBrandname',
        description: 'Lấy toàn bộ danh sách Brandname đã đăng ký trên hệ thống.',
      },
      {
        name: 'Danh sách Zalo OA',
        action: 'Lấy danh sách Zalo OA',
        value: 'getListZaloOa',
        description: 'Lấy danh sách các tài khoản Zalo Official Account (OA) đã tích hợp.',
      },
    ],
    default: 'getBalance'
  }
];
