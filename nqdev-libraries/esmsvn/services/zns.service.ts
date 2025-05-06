import type { IExecuteFunctions, IHookFunctions } from 'n8n-workflow';

import { esmsApiRequest } from '../EsmsGenericFunctions';
import { ISendZnsMessageParams } from '../interfaces';

/**
 * Send Zalo ZNS Message
 * @url https://developers.esms.vn/esms-api/ham-gui-tin/tin-nhan-zalo
 * @param this is HookFunctions or ExecuteFunctions
 * @param params
 * @returns
 */
export async function sendZaloMessage(
  this: IHookFunctions | IExecuteFunctions,
  params: ISendZnsMessageParams
): Promise<any> {
  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/SendZaloMessage_V6/', {
    ...params,
  });
}
