import type { INodeProperties } from "n8n-workflow";

export const esmsOptionModel: INodeProperties[] = [
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
