import type { IExecuteFunctions } from 'n8n-workflow';

import { esmsApiRequest } from '../EsmsApiRequest';

export async function getUserInfo(
  this: IExecuteFunctions
): Promise<any> {
  return await esmsApiRequest.call(this, 'POST',
    '/MainService.svc/json/GetBalance_json',
    {}
  );
}
