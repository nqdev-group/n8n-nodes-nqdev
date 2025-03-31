import type { IExecuteFunctions, IHookFunctions } from 'n8n-workflow';

import { esmsApiRequest } from '../EsmsApiRequest';

export async function getUserInfo(
  this: IHookFunctions | IExecuteFunctions
): Promise<any> {
  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/GetBalance_json', {

  });
}
