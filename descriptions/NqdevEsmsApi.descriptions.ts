import {
  INodeProperties,
} from 'n8n-workflow';

/**
 * Nqdev Esms properties configuration fields for credentials and nodes.
 */
export const nqdevEsmsProperties: INodeProperties[] = [
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
    required: true,
    typeOptions: { password: true },
    default: '',
    placeholder: 'Nhập khóa API của bạn từ eSMS',
    description: 'Chuỗi khóa API dùng để xác thực và kết nối với dịch vụ eSMS. Cung cấp quyền truy cập vào hệ thống gửi tin nhắn của eSMSvn',
  },
  {
    displayName: 'Esms SecretKey',
    name: 'esmsSecretKey',
    type: 'string',
    required: true,
    typeOptions: {
      password: true,
    },
    default: '',
    placeholder: 'Nhập khóa bí mật của bạn từ eSMS',
    description: 'Chuỗi khóa bí mật dùng để bảo vệ và xác thực tài khoản eSMS. Dùng kết hợp với API Key để đảm bảo tính bảo mật trong quá trình sử dụng dịch vụ eSMSvn',
  },
];

// Operations for Nqdev Esms API node properties configuration.
const nqdevEsmsGetOperation: INodeProperties[] = [
  {
    type: 'options',
    name: 'nqdevEsmsGetOperation',
    displayName: '[Nqdev] Esms Get Operation',
    description: 'Select type of data to send [Query Parameters]',
    noDataExpression: true,
    options: [
      {
        name: 'Get Balance',
        value: 'getBalance',
        description: 'get user balance',
        routing: {
          request: {
            method: 'POST',
            url: '/MainService.svc/json/GetBalance_json/',
            qs: {
              n8n: 'nqdev',
            }
          }
        }
      },
    ],
    default: 'getBalance',
  }
];

// Operations for Nqdev Esms API node properties configuration.
const nqdevEsmsPostOperation: INodeProperties[] = [
  {
    type: 'options',
    name: 'nqdevEsmsPostOperation',
    displayName: '[Nqdev] Esms Post Operation',
    description: 'Select type of data to send [Query Parameters]',
    noDataExpression: true,
    options: [
      {
        name: 'Send SMS Message',
        value: 'postSendSmsMessage',
        description: 'Gửi tin nhắn SMS thông qua dịch vụ eSMS',
        routing: {
          request: {
            method: 'POST',
            url: '/MainService.svc/json/SendMultipleMessage_V4_post_json/',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/javascript, */*; q=0.01'
            },
            body: {
              'ApiKey': '',
              'SecretKey': '',
              'SmsType': '',
              'Brandname': '',
              'Content': '',
              'Phone': '',
              'IsUnicode': '',
              'Sandbox': '',
              'PartnerSource': '',
              'RequestId': '',
              'CallbackUrl': ''
            }
          }
        }
      },
    ],
    default: 'postSendSmsMessage'
  }
];

// Operations for Nqdev Esms API node properties configuration.
export const nqdevEsmsOperation: INodeProperties[] = [
  /* -------------------------------------------------------------------------- */
  /*                                httpVerb:get                                */
  /* -------------------------------------------------------------------------- */
  ...nqdevEsmsGetOperation,

  /* -------------------------------------------------------------------------- */
  /*                              httpVerb:post                                 */
  /* -------------------------------------------------------------------------- */
  ...nqdevEsmsPostOperation,
];

