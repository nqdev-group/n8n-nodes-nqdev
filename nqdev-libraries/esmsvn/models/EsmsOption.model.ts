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
        name: 'SMS Brandname QC',
        action: 'SMS Brandname QC',
        value: 1,
        description: ''
      },
      {
        name: 'SMS Brandname CSKH',
        action: 'SMS Brandname CSKH',
        value: 2,
        description: ''
      },
      {
        name: 'SMS Random Sender',
        action: 'SMS Random Sender',
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
        operation: ['sendZnsMessage', 'sendViberMessage'],
        resource: ['ott_message'],
      }
    },
    options: [
      {
        name: 'SMS Brandname QC',
        action: 'SMS Brandname QC',
        value: 24,
        description: ''
      },
      {
        name: 'SMS Brandname CSKH',
        action: 'SMS Brandname CSKH',
        value: 25,
        description: ''
      }
    ],
    default: 224,
  }
];

export const esmsSmsModel: INodeProperties[] = [
  ...esmsSmsTypeModel,

  // {
  //   displayName: 'Sms Type',
  //   name: 'esmsSmsType',
  //   type: 'number',
  //   required: true,
  //   default: 2,
  //   displayOptions: {
  //     show: {
  //       operation: ['sendSmsMessage'],
  //       resource: ['sms_message', 'ott_message'],
  //     }
  //   },
  //   description: 'Type of SMS',
  // },
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
        operation: ['sendSmsMessage'],
        resource: ['sms_message', 'ott_message'],
      }
    },
    description: 'So dien thoa cua nguoi nhan.'
  },
  {
    displayName: 'Content',
    name: 'esmsContent',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        operation: ['sendSmsMessage'],
        resource: ['sms_message', 'ott_message'],
      }
    },
    description: 'noi dung tin nhan',
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
        operation: ['sendSmsMessage'],
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
