import type { IExecuteFunctions, IHookFunctions } from 'n8n-workflow';

import { esmsApiRequest, HTTP_HEADERS, NAME_CREDENTIAL } from '../EsmsGenericFunctions';
import { ISendZnsMessageParams } from '../interfaces';

/**
 * Send Viber Message
 * @url https://developers.esms.vn/esms-api/ham-gui-tin/tin-nhan-zalo
 * @param this is HookFunctions or ExecuteFunctions
 * @param args
 * @returns
 */
export async function sendViberMessage(
  this: IHookFunctions | IExecuteFunctions,
  args: ISendZnsMessageParams
): Promise<any> {
  // Lấy credentials từ node
  const credentials = await this.getCredentials(NAME_CREDENTIAL),
    esmsApiKey: string = (credentials?.esmsApiKey ?? '') as string,
    esmsSecretKey: string = (credentials?.esmsSecretKey ?? '') as string;

  const { ApiKey, SecretKey, ...safeArgs } = args;

  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/SendZaloMessage_V6/', {
    ApiKey: ApiKey ?? esmsApiKey ?? '',
    SecretKey: SecretKey ?? esmsSecretKey ?? '',
    ...safeArgs,
  }, {}, {
    ...HTTP_HEADERS,
  });
}
