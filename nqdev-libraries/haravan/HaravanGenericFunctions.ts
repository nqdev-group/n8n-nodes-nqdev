import {
  type IDataObject,
  type IExecuteFunctions,
  type IHookFunctions,
  type IHttpRequestMethods,
  type JsonObject,
  NodeApiError
} from 'n8n-workflow';
import { nqdevApiRequest } from "../common";

export const NAME_CREDENTIAL = 'nqdevHaravanApi';

export const HTTP_HEADERS: IDataObject = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export async function haravanApiRequest(
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

  const { ApiKey, SecretKey, ...safeBody } = body;

  const response = await nqdevApiRequest.call(this, NAME_CREDENTIAL, method, baseUrl, endpoint, {
    ApiKey: esmsApiKey,
    SecretKey: esmsSecretKey,
    ...safeBody,
  }, {
    ...qs
  }, {
    ...headers
  });

  // Check if the response indicates an error (e.g., invalid credentials)
  if (response.success === '101') {
    throw new NodeApiError(this.getNode(), response as JsonObject, {
      message: 'Invalid credentials or API error!',
    });
  }

  // Return the response if successful
  return response;
}
