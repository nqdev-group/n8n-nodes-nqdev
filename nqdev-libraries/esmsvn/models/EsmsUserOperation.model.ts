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
        routing: {
          request: {
            method: 'POST',
            url: '/MainService.svc/json/GetBalance_json/',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/javascript, */*; q=0.01'
            },
            qs: {
              n8n: 'nqdev',
            },
            body: {
              'ApiKey': '',
              'SecretKey': ''
            }
          }
        }
      }
    ],
    default: 'getBalance'
  }
];
