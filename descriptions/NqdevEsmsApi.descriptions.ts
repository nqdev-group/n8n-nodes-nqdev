import {
  INodeProperties,
} from 'n8n-workflow';

/**
 * Nqdev Esms properties configuration fields for credentials and nodes.
 */
export const nqdevEsmsCredentialProperties: INodeProperties[] = [
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

const nqdevEsmsResources: INodeProperties[] = [
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
const nqdevEsmsAccountOperations: INodeProperties[] = [
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

const nqdevEsmsSmsMessageOperations: INodeProperties[] = [
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
        action: 'Send an SMS Message',
        value: 'sendSmsMessage',
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
  },
];

const nqdevEsmsSmsMessageOperationOptions: INodeProperties[] = [
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['sms_message'],
        operation: ['sendSmsMessage'],
      }
    },
    description: '',
    options: [
      {
        displayName: 'Send Time',
        name: 'sendTime',
        type: 'dateTime',
        default: '',
        description: 'Pick a date for time delayed dispatch',
      },
      {
        displayName: 'Sandbox',
        name: 'sandbox',
        type: 'boolean',
        default: false,
        // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
        description: "Send as flash message being displayed directly the receiver's display",
      },
    ],
  },
];

export const nqdevEsmsOperationProperties: INodeProperties[] = [
  // resource
  ...nqdevEsmsResources,

  // operations
  ...nqdevEsmsAccountOperations,
  ...nqdevEsmsSmsMessageOperations,

  // operation properties
  {
    displayName: 'Sms Type',
    name: 'smsType',
    type: 'collection',
    required: true,
    default: 2,
    displayOptions: {
      show: {
        resource: ['sms_message', 'ott_message'],
        operation: ['sendSmsMessage'],
      }
    },
    description: '',
  },
  {
    displayName: 'Phone Number',
    name: 'phoneNumber',
    type: 'string',
    default: '',
    required: true,
    description: 'The phone number to send SMS to',
  },
  {
    displayName: 'Message',
    name: 'message',
    type: 'string',
    default: '',
    required: true,
    description: 'The message content to send',
  },

  // operation properties options
  ...nqdevEsmsSmsMessageOperationOptions,
];
