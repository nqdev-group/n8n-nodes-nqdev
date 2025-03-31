import type { INodeProperties } from "n8n-workflow";

const smsProperties: INodeProperties[] = [
  // operation properties
  {
    displayName: 'Sms Type',
    name: 'smsType',
    type: 'collection',
    required: true,
    default: 2,
    displayOptions: {
      show: {
        resource: ['sms_message'],
        operation: ['sendSmsMessage'],
      }
    },
    description: '',
  },
];

export const esmsSmsOperationModel: INodeProperties[] = [
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

  ...smsProperties,
];
