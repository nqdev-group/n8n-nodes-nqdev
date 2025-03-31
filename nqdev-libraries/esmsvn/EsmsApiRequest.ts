import type {
  IDataObject,
  IExecuteFunctions,
  IHookFunctions,
  IHttpRequestMethods,
} from 'n8n-workflow';
import { nqdevApiRequest } from "../common";

export const NAME_CREDENTIAL = 'nqdevEsmsApi';

export async function esmsApiRequest(
  this: IHookFunctions | IExecuteFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  headers: IDataObject = {},
): Promise<any> {
  const credentials = await this.getCredentials(NAME_CREDENTIAL);

  let baseUrl: string = '',
    qs: IDataObject = {} // query parameters

  return await nqdevApiRequest.call(this, NAME_CREDENTIAL, method, baseUrl, endpoint, {
    ApiKey: credentials.apiKey,
    SecretKey: credentials.secretKey,
    ...body
  }, {
    ...qs
  }, {
    ...headers
  });
}
