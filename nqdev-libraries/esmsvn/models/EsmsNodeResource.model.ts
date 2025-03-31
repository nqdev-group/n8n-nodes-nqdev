import type { INodeProperties } from "n8n-workflow";

export const esmsNodeResourceModel: INodeProperties[] = [
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
];
