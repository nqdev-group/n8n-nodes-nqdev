import type { IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions } from 'n8n-workflow';

import { esmsApiRequest, getEsmsCredentials, HTTP_HEADERS } from '../EsmsGenericFunctions';
import { IApiAuthorize, ISendUidMessageParams, ISendZnsMessageParams } from '../interfaces';

/**
 * Send Zalo ZNS Message
 * @url https://developers.esms.vn/esms-api/ham-gui-tin/tin-nhan-zalo
 * @param this is HookFunctions or ExecuteFunctions
 * @param args
 * @returns
 */
export async function sendZaloZnsMessage(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
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

export async function sendZaloUidMessage(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  args: ISendUidMessageParams
): Promise<any> {
  // Lấy credentials từ node
  const credentials: IApiAuthorize = await getEsmsCredentials.call(this);

  const { ApiKey, SecretKey, ...safeArgs } = args;

  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/SendZaloFollowerMessage_V5_post_json/', {
    ApiKey: ApiKey ?? credentials.ApiKey ?? '',
    SecretKey: SecretKey ?? credentials.SecretKey ?? '',
    ...safeArgs,
  }, {}, {
    ...HTTP_HEADERS,
  });
}
