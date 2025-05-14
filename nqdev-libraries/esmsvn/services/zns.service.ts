import type { IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions } from 'n8n-workflow';

import { esmsApiRequest, getEsmsCredentials, HTTP_HEADERS } from '../EsmsGenericFunctions';
import { IApiAuthorize, ISendUidMessageParams, ISendZnsMessageParams } from '../interfaces';

/**
 * Gửi tin nhắn Zalo ZNS thông qua API của ESMS
 *
 * Hàm này thực hiện gửi tin nhắn Zalo ZNS đến người dùng cuối thông qua hệ thống ESMS.
 * Zalo ZNS (Zalo Notification Service) là dịch vụ gửi tin nhắn chăm sóc khách hàng, hỗ trợ gửi thông báo tự động đến người dùng qua Zalo Official Account.
 *
 * @param this - Context của workflow function (HookFunctions, ExecuteFunctions hoặc LoadOptionsFunctions) trong môi trường như n8n.
 * @param args - Đối tượng chứa các tham số cần thiết để gửi tin nhắn, bao gồm brandname, OAID, template ID, phone, và data mapping cho template.
 *
 * @see https://developers.esms.vn/esms-api/ham-gui-tin/tin-nhan-zalo
 *
 * @returns {Promise<any>} - Promise trả về phản hồi từ API ESMS sau khi gửi tin nhắn, chứa thông tin trạng thái gửi và chi tiết nếu thành công hoặc lỗi.
 *
 * @example
 * await sendZaloZnsMessage.call(this, {
 *   phone: '849xxxxxxxx',
 *   templateId: '123456',
 *   oaId: 'zalo_oa_id',
 *   data: { name: 'Nguyen Van A', code: 'OTP123' },
 * });
 *
 */
export async function sendZaloZnsMessage(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  args: ISendZnsMessageParams
): Promise<any> {
  // Lấy credentials từ node
  const esmsCredentials: IApiAuthorize = await getEsmsCredentials.call(this);

  const { ApiKey, SecretKey, ...safeArgs } = args;

  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/SendZaloMessage_V6/', {
    ApiKey: ApiKey ?? esmsCredentials.ApiKey ?? '',
    SecretKey: SecretKey ?? esmsCredentials.SecretKey ?? '',
    ...safeArgs,
  }, {}, {
    ...HTTP_HEADERS,
  });
}

/**
 * Gửi tin nhắn Zalo đến người dùng theo UID thông qua API của ESMS
 *
 * Hàm này thực hiện gửi tin nhắn trực tiếp đến người dùng Zalo thông qua UID (User ID) thay vì số điện thoại.
 * Được sử dụng trong các trường hợp đã biết UID của người dùng từ hệ thống Zalo OA tích hợp.
 *
 * @param this - Context của workflow function (HookFunctions, ExecuteFunctions hoặc LoadOptionsFunctions), thường dùng trong nền tảng như n8n.
 * @param args - Đối tượng chứa các tham số cần thiết để gửi tin nhắn, bao gồm UID người nhận, OAID, template ID và dữ liệu gán vào template.
 *
 * @see https://developers.esms.vn/esms-api/ham-gui-tin/tin-nhan-zalo
 *
 * @returns {Promise<any>} - Promise trả về phản hồi từ ESMS API sau khi gửi tin nhắn, bao gồm trạng thái gửi, lỗi (nếu có) hoặc ID tin nhắn.
 *
 * @example
 * await sendZaloUidMessage.call(this, {
 *   uid: 'zalo_uid',
 *   templateId: '654321',
 *   oaId: 'zalo_oa_id',
 *   data: { name: 'Nguyen Van B', time: '10:00 AM' },
 * });
 *
 */
export async function sendZaloUidMessage(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  args: ISendUidMessageParams
): Promise<any> {
  // Lấy credentials từ node
  const esmsCredentials: IApiAuthorize = await getEsmsCredentials.call(this);

  const { ApiKey, SecretKey, ...safeArgs } = args;

  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/SendZaloFollowerMessage_V5_post_json/', {
    ApiKey: ApiKey ?? esmsCredentials.ApiKey ?? '',
    SecretKey: SecretKey ?? esmsCredentials.SecretKey ?? '',
    ...safeArgs,
  }, {}, {
    ...HTTP_HEADERS,
  });
}
