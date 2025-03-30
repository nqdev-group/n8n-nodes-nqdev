import {
  INodeProperties,
} from 'n8n-workflow';

/**
 * Nqdev Esms properties configuration fields for credentials and nodes.
 */
export const nqdevEsmsCredential: INodeProperties[] = [
  {
    displayName: 'Esms Domain',
    name: 'esmsDomain',
    type: 'string',
    required: false,
    default: 'https://rest.esms.vn',
    placeholder: 'Nhập URL của dịch vụ eSMS (ví dụ: https://rest.esms.vn)',
    description: 'Chuỗi URL đại diện cho dịch vụ API của eSMS, dùng để kết nối với hệ thống gửi tin nhắn của eSMSvn',
  },
  {
    displayName: 'Esms ApiKey',
    name: 'esmsApiKey',
    type: 'string',
    required: false,
    typeOptions: { password: true },
    default: '',
    placeholder: 'Nhập khóa API của bạn từ eSMS',
    description: 'Chuỗi khóa API dùng để xác thực và kết nối với dịch vụ eSMS. Cung cấp quyền truy cập vào hệ thống gửi tin nhắn của eSMSvn',
  },
  {
    displayName: 'Esms SecretKey',
    name: 'esmsSecretKey',
    type: 'string',
    required: false,
    typeOptions: {
      password: true,
    },
    default: '',
    placeholder: 'Nhập khóa bí mật của bạn từ eSMS',
    description: 'Chuỗi khóa bí mật dùng để bảo vệ và xác thực tài khoản eSMS. Dùng kết hợp với API Key để đảm bảo tính bảo mật trong quá trình sử dụng dịch vụ eSMSvn',
  },
];

export const nqdevEsmsResources: INodeProperties[] = [
  {
    name: 'resource',
    displayName: 'Resource',
    type: 'options',
    noDataExpression: true,
    options: [
      {
        name: 'Account',
        value: 'account',
      },
      {
        name: 'SMS Message',
        value: 'sms_message',
      },
      {
        name: 'OTT Message',
        value: 'ott_message',
      }
    ],
    default: 'account'
  }
]

// Operations for Nqdev Esms API node properties configuration.
export const nqdevEsmsAccountOperations: INodeProperties[] = [
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
        name: 'GetBalance',
        value: 'getBalance',
        action: 'GetBalance',
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

export const nqdevEsmsSmsMessageOperations: INodeProperties[] = [
  {
    name: 'operation',
    displayName: 'Operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          'sms_message'
        ]
      }
    },
    options: [
      {
        name: 'Send SMS Message',
        value: 'sendSmsMessage',
        action: 'sendSmsMessage',
        description: 'Gửi tin nhắn SMS',
        routing: {
          request: {
            method: 'POST',
            url: '/MainService.svc/json/SendMultipleMessage_V4_post_json/',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/javascript, */*; q=0.01'
            },
            qs: {
              n8n: 'nqdev',
            },
            body: {
              'ApiKey': '',
              'SecretKey': '',
              'SmsType': '',
              'Brandname': '',
              'Phone': '',
              'Content': '',
              'IsUnicode': '',
              'Sandbox': '',
              'CallbackUrl': '',
            }
          }
        }
      }
    ],
    default: 'sendSmsMessage'
  }
];
