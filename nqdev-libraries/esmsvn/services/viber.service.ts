import type { IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions } from 'n8n-workflow';

import { esmsApiRequest, getEsmsCredentials, HTTP_HEADERS, } from '../EsmsGenericFunctions';
import { IApiAuthorize, ISendZnsMessageParams } from '../interfaces';

/**
 * Gửi tin nhắn Viber thông qua API của ESMS
 *
 * Hàm này thực hiện gửi tin nhắn Viber đến người dùng thông qua hệ thống ESMS.
 * Viber là một kênh OTT hỗ trợ gửi tin nhắn chăm sóc khách hàng, thông báo khuyến mãi, OTP, v.v.
 *
 * @param this - Context của workflow function (HookFunctions, ExecuteFunctions hoặc LoadOptionsFunctions), sử dụng trong môi trường như n8n.
 * @param args - Đối tượng chứa các tham số gửi tin nhắn, bao gồm số điện thoại người nhận, ID template, brand name, nội dung động cho template,...
 *
 * @returns {Promise<any>} - Promise chứa phản hồi từ ESMS API, bao gồm mã trạng thái, thông điệp phản hồi và ID tin nhắn (nếu thành công).
 *
 * @see https://developers.esms.vn/esms-api/ham-gui-tin/tin-nhan-viber
 *
 * @example
 * await sendViberMessage.call(this, {
 *   phone: '849xxxxxxxx',
 *   templateId: 'viber_template_id',
 *   brandname: 'YourBrand',
 *   data: { code: 'OTP1234', name: 'Nguyen Van C' }
 * });
 */
export async function sendViberMessage(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  args: ISendZnsMessageParams
): Promise<any> {
  // Lấy credentials từ node
  const esmsCredentials: IApiAuthorize = await getEsmsCredentials.call(this);

  const { ApiKey, SecretKey, ...safeArgs } = args;

  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/SendZaloMessage_V6/', {
    ApiKey: ApiKey ?? esmsCredentials?.ApiKey ?? '',
    SecretKey: SecretKey ?? esmsCredentials?.SecretKey ?? '',
    ...safeArgs,
  }, {}, {
    ...HTTP_HEADERS,
  });
}
