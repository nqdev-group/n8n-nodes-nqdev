import type { INodeProperties } from "n8n-workflow";

export const esmsOttOperationModel: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          'ott_message'
        ]
      }
    },
    options: [
      {
        name: 'Gửi tin nhắn ZNS',
        action: 'Hành động Gửi tin nhắn ZNS',
        value: 'sendZnsMessage',
        description: 'Send an OTT Message',
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
      },
      {
        name: 'Gửi tin nhắn Viber',
        action: 'Hành động Gửi tin nhắn Viber',
        value: 'sendViberMessage',
        description: 'Send an OTT Message',
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
    default: 'sendZnsMessage'
  },
];
