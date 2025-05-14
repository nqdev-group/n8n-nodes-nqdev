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
      },
      {
        name: 'Gửi tin nhắn Viber',
        action: 'Hành động Gửi tin nhắn Viber',
        value: 'sendViberMessage',
        description: 'Send an OTT Message',
      },
      {
        name: 'Danh sách Template',
        action: 'Lấy danh sách template',
        value: 'getListTemplate',
        description: 'Truy xuất danh sách mẫu tin nhắn chăm sóc khách hàng (CSKH) hoặc Zalo ZNS.',
      },
      {
        name: 'Chi tiết ZNS Template',
        action: 'Lấy chi tiết ZNS template',
        value: 'getZnsTemplateInfo',
        description: 'Xem thông tin chi tiết của một mẫu tin nhắn Zalo ZNS cụ thể.',
      }
    ],
    default: 'sendZnsMessage'
  },
];
