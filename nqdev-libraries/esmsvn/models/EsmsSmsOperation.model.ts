import type { INodeProperties } from "n8n-workflow";

export const esmsSmsOperationModel: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
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
        name: 'Gửi tin nhắn SMS',
        action: 'Hành động Gửi tin nhắn SMS',
        value: 'sendSmsMessage',
        description: 'Send an SMS Message',
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
          }
        }
      }
    ],
    default: 'sendSmsMessage'
  },
];
