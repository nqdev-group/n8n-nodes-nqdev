import type { INodeProperties } from "n8n-workflow";

export const esmsCredentialModel: INodeProperties[] = [
  {
    displayName: 'Esms Domain',
    name: 'esmsDomain',
    type: 'string',
    required: false,
    default: 'https://rest.esms.vn',
    placeholder: 'Nhập URL của dịch vụ eSMS (ví dụ: https://rest.esms.vn)',
    description: 'Chuỗi URL đại diện cho dịch vụ API của eSMS, dùng để kết nối với hệ thống gửi tin nhắn của eSMSvn',
  },
  {
    displayName: 'Esms ApiKey',
    name: 'esmsApiKey',
    type: 'string',
    required: false,
    typeOptions: { password: true },
    default: '',
    placeholder: 'Nhập khóa API của bạn từ eSMS',
    description: 'Chuỗi khóa API dùng để xác thực và kết nối với dịch vụ eSMS. Cung cấp quyền truy cập vào hệ thống gửi tin nhắn của eSMSvn',
  },
  {
    displayName: 'Esms SecretKey',
    name: 'esmsSecretKey',
    type: 'string',
    required: false,
    typeOptions: {
      password: true,
    },
    default: '',
    placeholder: 'Nhập khóa bí mật của bạn từ eSMS',
    description: 'Chuỗi khóa bí mật dùng để bảo vệ và xác thực tài khoản eSMS. Dùng kết hợp với API Key để đảm bảo tính bảo mật trong quá trình sử dụng dịch vụ eSMSvn',
  },
];
