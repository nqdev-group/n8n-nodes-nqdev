import type { INodeProperties } from "n8n-workflow";

const esmsSmsTypeModel: INodeProperties[] = [
  {
    displayName: 'SmsType',
    name: 'esmsSmsType',
    type: 'options',
    description: 'Type of SMS',
    noDataExpression: true,
    default: 2,
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
  },
  {
    displayName: 'SmsType',
    name: 'esmsSmsType',
    type: 'options',
    description: 'Type of SMS',
    noDataExpression: true,
    default: 23,
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
  },
  {
    displayName: 'SmsType',
    name: 'esmsSmsType',
    type: 'options',
    description: 'Type of SMS',
    noDataExpression: true,
    default: 24,
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
  },
];

const esmsSenderModel: INodeProperties[] = [
  // sendSmsMessage
  {
    displayName: 'Brandname',
    name: 'esmsBrandname',
    type: 'resourceLocator',
    required: false,
    default: { mode: 'list', value: '' },
    displayOptions: {
      show: {
        resource: ['sms_message'],
        operation: ['sendSmsMessage'],
      },
      hide: {
        esmsSmsType: [8],
      },
    },
    description: 'Tên thương hiệu của bạn.',
    placeholder: 'eSMS.vn,...',
    modes: [
      {
        displayName: 'Brandname',
        name: 'list',
        type: 'list',
        placeholder: 'Select a Brandname...',
        typeOptions: {
          searchListMethod: 'getListBrandname',
          searchable: true,
          searchFilterRequired: true,
        },
      },
      {
        displayName: 'By Name',
        name: 'name',
        type: 'string',
        placeholder: 'e.g. eSMS.vn',
        validation: [
          {
            type: 'regex',
            properties: {
              regex: '[-_a-zA-Z0-9]+',
              errorMessage: 'Not a valid Sender',
            },
          },
        ],
      }
    ]
  },

  // sendViberMessage
  {
    displayName: 'Brandname',
    name: 'esmsBrandname',
    type: 'resourceLocator',
    required: false,
    default: { mode: 'list', value: '' },
    displayOptions: {
      show: {
        resource: ['ott_message'],
        operation: ['sendViberMessage'],
      }
    },
    description: 'Tên thương hiệu của bạn.',
    placeholder: 'eSMS.vn,...',
    modes: [
      {
        displayName: 'Brandname',
        name: 'list',
        type: 'list',
        placeholder: 'Select a Brandname...',
        typeOptions: {
          searchListMethod: 'getListBrandname',
          searchable: true,
          searchFilterRequired: true,
        },
      },
      {
        displayName: 'By Name',
        name: 'name',
        type: 'string',
        placeholder: 'e.g. eSMS.vn',
        validation: [
          {
            type: 'regex',
            properties: {
              regex: '[-_a-zA-Z0-9]+',
              errorMessage: 'Not a valid Sender',
            },
          },
        ],
      }
    ],
  },

  {
    displayName: 'ZaloOA',
    name: 'esmsZaloOA',
    type: 'resourceLocator',
    required: false,
    default: { mode: 'list', value: '' },
    displayOptions: {
      show: {
        resource: ['ott_message'],
        operation: ['sendZnsMessage'],
      }
    },
    description: 'Tên thương hiệu của bạn.',
    placeholder: 'eSMS.vn,...',
    modes: [
      {
        displayName: 'Brandname',
        name: 'list',
        type: 'list',
        placeholder: 'Select a Brandname...',
        typeOptions: {
          searchListMethod: 'getListBrandname',
          searchable: true,
          searchFilterRequired: true,
        },
      },
      {
        displayName: 'By Name',
        name: 'name',
        type: 'string',
        placeholder: 'e.g. eSMS.vn',
        validation: [
          {
            type: 'regex',
            properties: {
              regex: '[-_a-zA-Z0-9]+',
              errorMessage: 'Not a valid Sender',
            },
          },
        ],
      }
    ],
  }
];

export const esmsSmsModel: INodeProperties[] = [
  ...esmsSmsTypeModel,
  ...esmsSenderModel,

  {
    displayName: 'PhoneNumber',
    name: 'esmsPhonenumber',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'e.g. +84912345678',
    description: 'Số điện thoại nhận tin nhắn.',
    displayOptions: {
      show: {
        resource: ['sms_message', 'ott_message'],
        operation: ['sendSmsMessage', 'sendZnsMessage', 'sendViberMessage'],
      }
    },
    typeOptions: {
      regex: '^(\\+84|0)(3|5|7|8|9)[0-9]{8}$',
      regexErrorMessage: 'Số điện thoại không đúng định dạng. Ví dụ: +84912345678 hoặc 0912345678',
    },
  },
  {
    displayName: 'Content',
    name: 'esmsContent',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'Cam on quy khach su dung dich vu cua chung toi. Chuc quy khach sinh nhat vui ve. Hotline 1900 xxxx',
    description: 'Nội dung tin nhắn.',
    displayOptions: {
      show: {
        operation: ['sendSmsMessage', 'sendZnsMessage', 'sendViberMessage'],
        resource: ['sms_message', 'ott_message'],
      }
    },
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
