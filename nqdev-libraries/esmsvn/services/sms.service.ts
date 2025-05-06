import type { IExecuteFunctions, IHookFunctions } from 'n8n-workflow';

import { esmsApiRequest } from '../EsmsGenericFunctions';
import { ISendSmsMessageParams } from '../interfaces';

export async function sendSmsMessage(
  this: IHookFunctions | IExecuteFunctions,
  params: ISendSmsMessageParams
): Promise<any> {
  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/SendMultipleMessage_V4_post_json', {
    ...params,
  });
}
