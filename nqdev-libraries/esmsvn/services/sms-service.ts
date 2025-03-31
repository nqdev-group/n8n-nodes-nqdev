import type { IExecuteFunctions } from 'n8n-workflow';

import { esmsApiRequest } from '../EsmsApiRequest';
import { SendSmsParams } from '../interfaces';

export async function sendSms(
  this: IExecuteFunctions,
  params: SendSmsParams
): Promise<any> {
  return await esmsApiRequest.call(this, 'POST',
    '/MainService.svc/json/SendMultipleMessage_V4_post_json',
    {
      ...params,
    }
  );
}
