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
    displayName: 'Get User Balance',
    name: 'getUserBalance',
    default: 'queryParameter',
    description: 'Select type of data to send [Query Parameters]',
    displayOptions: {
      show: {
        resource: ['httpVerb'],
        operation: ['get'],
      },
    },
    type: 'options',
    options: [
      {
        name: 'Query',
        value: 'queryParameter',
      },
    ],
    required: true,
  }
];

// Operations for Nqdev Esms API node properties configuration.
const nqdevEsmsPostOperation: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    options: [
      {
        name: 'Send SMS',
        value: 'sendSms',
        description: 'Gửi tin nhắn SMS thông qua dịch vụ eSMS',
      },
    ],
    default: 'sendSms',
    description: 'Chọn hoạt động bạn muốn thực hiện',
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

