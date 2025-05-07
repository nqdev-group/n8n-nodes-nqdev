import type { IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions } from 'n8n-workflow';

import { esmsApiRequest, getEsmsCredentials, HTTP_HEADERS } from '../EsmsGenericFunctions';
import { IApiAuthorize, ISendSmsMessageParams } from '../interfaces';

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
