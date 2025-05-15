import type { INodeProperties } from "n8n-workflow";

export const NAME_CREDENTIAL = 'nqdevHaravanApi';

export const haravanCredentialModel: INodeProperties[] = [
  {
    displayName: 'Shop Domain',
    name: 'shopDomain',
    type: 'string',
    default: '',
    required: true,
    placeholder: 'nqdev-demo.myharavan.com',
    description: 'Tên miền của shop Haravan, không bao gồm https://',
  },
  {
    displayName: 'Access Token',
    name: 'accessToken',
    type: 'string',
    default: '',
    required: true,
    typeOptions: {
      password: true,
    },
    placeholder: 'Nhập access token',
    description: 'Access Token được tạo từ ứng dụng trên Haravan để gọi API.',
  },
];
