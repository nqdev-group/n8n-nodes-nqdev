import type { IExecuteFunctions, IHookFunctions } from 'n8n-workflow';

import { esmsApiRequest } from '../EsmsApiRequest';
import { ISendSmsParams } from '../interfaces';

export async function sendMultipleMessage(
  this: IHookFunctions | IExecuteFunctions,
  params: ISendSmsParams
): Promise<any> {
  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/SendMultipleMessage_V4_post_json', {
    ...params,
  }
  );
}
