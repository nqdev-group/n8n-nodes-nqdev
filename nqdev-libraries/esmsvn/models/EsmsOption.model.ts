import type { INodeProperties } from "n8n-workflow";

const esmsSmsTypeModel: INodeProperties[] = [
  {
    displayName: 'SmsType',
    name: 'esmsSmsType',
    type: 'options',
    description: 'Type of SMS',
    noDataExpression: true,
    displayOptions: {
      show: {
        operation: ['sendSmsMessage'],
        resource: ['sms_message'],
      }
    },
    options: [
      {
        name: 'Brandname QC',
        action: 'Brandname QC',
        value: 1,
        description: ''
      },
      {
        name: 'Brandname CSKH',
        action: 'Brandname CSKH',
        value: 2,
        description: ''
      },
      {
        name: 'Cố định giá rẻ',
        action: 'Cố định giá rẻ',
        value: 8,
        description: ''
      }
    ],
    default: 2,
  },
  {
    displayName: 'SmsType',
    name: 'esmsSmsType',
    type: 'options',
    description: 'Type of SMS',
    noDataExpression: true,
    displayOptions: {
      show: {
        operation: ['sendViberMessage'],
        resource: ['ott_message'],
      }
    },
    options: [
      {
        name: 'Viber Message',
        action: 'Viber Message',
        value: 23,
        description: ''
      },
    ],
    default: 24,
  },
  {
    displayName: 'SmsType',
    name: 'esmsSmsType',
    type: 'options',
    description: 'Type of SMS',
    noDataExpression: true,
    displayOptions: {
      show: {
        operation: ['sendZnsMessage'],
        resource: ['ott_message'],
      }
    },
    options: [
      {
        name: 'Zalo Ưu Tiên',
        action: 'Zalo Ưu Tiên',
        value: 24,
        description: ''
      },
      {
        name: 'Zalo Bình Thường',
        action: 'Zalo Bình Thường',
        value: 25,
        description: ''
      }
    ],
    default: 24,
  },
];

const esmsSenderModel: INodeProperties[] = [
  {
    displayName: 'Sender',
    name: 'esmsSender',
    type: 'resourceLocator',
    required: true,
    default: { mode: 'list', value: '' },
    displayOptions: {
      show: {
        operation: ['sendSmsMessage'],
        resource: ['sms_message'],
      }
    },
    description: 'Tên thương hiệu hiển thị trên điện thoại.',
    modes: [
      {
        displayName: 'Brandname CSKH',
        name: 'esmsBrandnameCSKH',
        type: 'list',
        placeholder: 'Select an Brandname CSKH...',
        typeOptions: {
          searchListMethod: 'getBrandnameList',
          searchable: true,
          searchFilterRequired: true,
        }
      },
      {
        displayName: 'Cố định giá rẻ',
        name: 'esmsRandomNumber',
        type: 'string',
        placeholder: 'e.g. nqdev-n8n-io',
        validation: [
          {
            type: 'regex',
            properties: {
              regex: '[-_a-zA-Z0-9]+',
              errorMessage: 'Not a valid Github Owner Name',
            },
          }
        ]
      }
    ],
  },
];

export const esmsSmsModel: INodeProperties[] = [
  ...esmsSenderModel,
  ...esmsSmsTypeModel,

  {
    displayName: 'Brandname',
    name: 'esmsBrandname',
    type: 'string',
    required: false,
    default: '',
    displayOptions: {
      show: {
        operation: ['sendSmsMessage'],
        resource: ['sms_message'],
        esmsSmsType: [1, 2],
      }
    },
    description: 'Brand of company.'
  },
  {
    displayName: 'PhoneNumber',
    name: 'esmsPhonenumber',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        operation: ['sendSmsMessage', 'sendZnsMessage', 'sendViberMessage'],
        resource: ['sms_message', 'ott_message'],
      }
    },
    description: 'Số điện thoại nhận tin nhắn.'
  },
  {
    displayName: 'Content',
    name: 'esmsContent',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        operation: ['sendSmsMessage', 'sendZnsMessage', 'sendViberMessage'],
        resource: ['sms_message', 'ott_message'],
      }
    },
    placeholder: 'Cam on quy khach su dung dich vu cua chung toi. Chuc quy khach sinh nhat vui ve. Hotline 1900 xxxx',
    description: 'Nội dung tin nhắn.',
  },
];

export const esmsOptionModel: INodeProperties[] = [
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        operation: ['sendSmsMessage', 'sendZnsMessage', 'sendViberMessage'],
        resource: ['sms_message', 'ott_message'],
      }
    },
    description: '',
    options: [
      {
        displayName: 'IsUnicode',
        name: 'esmsIsUnicode',
        type: 'boolean',
        default: false,
        // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
        description: "Send as flash message being displayed directly the receiver's display",
      },
      {
        displayName: 'Sandbox',
        name: 'esmsIsSandbox',
        type: 'boolean',
        default: false,
        // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
        description: "Send as flash message being displayed directly the receiver's display",
      },
      {
        displayName: 'PartnerSource',
        name: 'esmsPartnerSource',
        type: 'number',
        default: 0,
        // eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
        description: "Send as flash message being displayed directly the receiver's display",
      },
    ],
  },
];
