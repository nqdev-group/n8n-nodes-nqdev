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
      },
      {
        name: 'Danh sách Template',
        action: 'Lấy danh sách template',
        value: 'getListTemplate',
        description: 'Truy xuất danh sách mẫu tin nhắn chăm sóc khách hàng (CSKH) hoặc Zalo ZNS.',
      },
    ],
    default: 'sendSmsMessage'
  },
];
