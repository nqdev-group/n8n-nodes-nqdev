import type {
  IDataObject,
  IExecuteFunctions,
  IHookFunctions,
  IHttpRequestMethods,
} from 'n8n-workflow';
import { nqdevApiRequest } from "../common";

export const NAME_CREDENTIAL = 'nqdevEsmsApi';

export const HTTP_HEADERS: IDataObject = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export async function esmsApiRequest(
  this: IHookFunctions | IExecuteFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject = {},
  headers: IDataObject = {},
): Promise<any> {
  // Lấy credentials từ node
  const credentials = await this.getCredentials(NAME_CREDENTIAL),
    baseUrl: string = (credentials?.esmsDomain ?? 'https://rest.esms.vn') as string,
    esmsApiKey: string = (credentials?.esmsApiKey ?? '') as string,
    esmsSecretKey: string = (credentials?.esmsSecretKey ?? '') as string;

  const { ApiKey, SecretKey, ...restBody } = body;

  return await nqdevApiRequest.call(this, NAME_CREDENTIAL, method, baseUrl, endpoint, {
    ApiKey: esmsApiKey,
    SecretKey: esmsSecretKey,
    ...restBody,
  }, {
    ...qs
  }, {
    ...headers
  });
}
