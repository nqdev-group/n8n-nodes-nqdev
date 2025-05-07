import type { IExecuteFunctions, IHookFunctions } from 'n8n-workflow';

import { esmsApiRequest, getEsmsCredentials, HTTP_HEADERS } from '../EsmsGenericFunctions';
import { IApiAuthorize, ISendZnsMessageParams } from '../interfaces';

/**
 * Send Zalo ZNS Message
 * @url https://developers.esms.vn/esms-api/ham-gui-tin/tin-nhan-zalo
 * @param this is HookFunctions or ExecuteFunctions
 * @param args
 * @returns
 */
export async function sendZaloMessage(
  this: IHookFunctions | IExecuteFunctions,
  args: ISendZnsMessageParams
): Promise<any> {
  // Lấy credentials từ node
  const credentials: IApiAuthorize = await getEsmsCredentials.call(this);

  const { ApiKey, SecretKey, ...safeArgs } = args;

  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/SendZaloMessage_V6/', {
    ApiKey: ApiKey ?? credentials.ApiKey ?? '',
    SecretKey: SecretKey ?? credentials.SecretKey ?? '',
    ...safeArgs,
  }, {}, {
    ...HTTP_HEADERS,
  });
}
