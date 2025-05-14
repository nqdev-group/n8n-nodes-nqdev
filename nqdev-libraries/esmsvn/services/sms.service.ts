import type { IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions } from 'n8n-workflow';

import { IApiAuthorize, ISendSmsMessageParams } from '../interfaces';
import { esmsApiRequest, getEsmsCredentials, HTTP_HEADERS } from '../EsmsGenericFunctions';

/**
 * Gửi tin nhắn SMS thông qua API của ESMS
 *
 * Hàm này thực hiện gửi tin nhắn SMS (thường hoặc thương hiệu) đến số điện thoại người dùng thông qua hệ thống ESMS.
 * Có thể sử dụng để gửi OTP, tin nhắn chăm sóc khách hàng, thông báo giao dịch, v.v.
 *
 * @param this - Context của workflow function (HookFunctions, ExecuteFunctions hoặc LoadOptionsFunctions), thường dùng trong n8n.
 * @param args - Đối tượng chứa các tham số cần thiết để gửi tin nhắn, bao gồm số điện thoại, nội dung tin nhắn, brandname, kiểu gửi, v.v.
 *
 * @returns {Promise<any>} - Promise trả về phản hồi từ ESMS API, bao gồm trạng thái gửi tin, mã lỗi (nếu có), và ID tin nhắn.
 *
 * @see https://developers.esms.vn/esms-api/ham-gui-tin/tin-nhan-sms
 *
 * @example
 * await sendSmsMessage.call(this, {
 *   phone: '849xxxxxxxx',
 *   content: 'Ma OTP cua ban la 123456',
 *   brandname: 'ESMS',
 *   smsType: 2,
 *   isUnicode: false
 * });
 */
export async function sendSmsMessage(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  args: ISendSmsMessageParams
): Promise<any> {
  // Lấy credentials từ node
  const credentials: IApiAuthorize = await getEsmsCredentials.call(this);

  const { ApiKey, SecretKey, ...safeArgs } = args;

  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/SendMultipleMessage_V4_post_json', {
    ApiKey: ApiKey ?? credentials.ApiKey ?? '',
    SecretKey: SecretKey ?? credentials.SecretKey ?? '',
    ...safeArgs,
  }, {}, {
    ...HTTP_HEADERS,
  });
}
