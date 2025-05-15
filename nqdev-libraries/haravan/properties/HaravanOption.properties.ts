import type { INodeProperties } from "n8n-workflow";

export const haravanOptionModel: INodeProperties[] = [
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {

      },
      hide: {

      }
    },
    description: '',
    options: [
      {
        displayName: 'Logging Request',
        name: 'haravanIsLoggingRequest',
        type: 'boolean',
        default: false,
        description: 'Bật ghi log cho từng request gửi đến API để phục vụ mục đích kiểm tra và debug.',
      },
    ]
  }
];
