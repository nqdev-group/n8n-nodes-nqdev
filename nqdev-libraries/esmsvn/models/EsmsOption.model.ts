import type { INodeProperties } from "n8n-workflow";

export const esmsSmsModel: INodeProperties[] = [
  {
    displayName: 'Sms Type',
    name: 'smsType',
    type: 'number',
    required: true,
    default: 2,
    displayOptions: {
      show: {
        operation: ['sendMessage'],
        resource: ['sms_message', 'ott_message'],
      }
    },
    description: 'Type of SMS',
  },
  {
    displayName: 'Sender',
    name: 'sender',
    type: 'string',
    required: false,
    default: '',
    displayOptions: {
      show: {
        operation: ['sendMessage'],
        resource: ['sms_message'],
      }
    },
    description: 'Brand of company.'
  },
  {
    displayName: 'PhoneNumber',
    name: 'phoneNumber',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        operation: ['sendMessage'],
        resource: ['sms_message', 'ott_message'],
      }
    },
    description: 'So dien thoa cua nguoi nhan.'
  },
  {
    displayName: 'Message',
    name: 'message',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        operation: ['sendMessage'],
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
        operation: ['sendMessage'],
        resource: ['sms_message', 'ott_message'],
      }
    },
    description: '',
    options: [
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
