import {
  type IDataObject,
  type IExecuteFunctions,
  type IHookFunctions,
  type IHttpRequestMethods,
  type ILoadOptionsFunctions,
  type JsonObject,
  NodeApiError
} from 'n8n-workflow';
import { nqdevApiRequest } from "../common";
import { IApiAuthorize } from './interfaces';

export const NAME_CREDENTIAL = 'nqdevEsmsApi';

export const HTTP_HEADERS: IDataObject = {
  'Content-Type': 'application/json; charset=utf-8',
  'Accept': 'application/json',
};

export async function getEsmsCredentials(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions
): Promise<IApiAuthorize> {
  const credentials = await this.getCredentials(NAME_CREDENTIAL);
  if (credentials === undefined) {
    throw new NodeApiError(this.getNode(), {}, {
      message: 'No credentials for Esms API were found!',
    });
  }

  const esmsCredentials: IApiAuthorize = {
    ApiKey: `${credentials?.esmsApiKey ?? ''}`,
    SecretKey: `${credentials?.esmsSecretKey ?? ''}`,
  };

  return esmsCredentials;
}

export async function esmsApiRequest(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject = {},
  headers: IDataObject = { ...HTTP_HEADERS },
): Promise<any> {
  // Lấy credentials từ node
  const credentials = await this.getCredentials(NAME_CREDENTIAL),
    baseUrl: string = (credentials?.esmsDomain ?? 'https://rest.esms.vn') as string,
    esmsApiKey: string = (credentials?.esmsApiKey ?? '') as string,
    esmsSecretKey: string = (credentials?.esmsSecretKey ?? '') as string;

  const { ApiKey, SecretKey, ...safeBody } = body;

  const response = await nqdevApiRequest.call(this, NAME_CREDENTIAL, method, baseUrl, endpoint, {
    ApiKey: ApiKey ?? esmsApiKey ?? '',
    SecretKey: SecretKey ?? esmsSecretKey ?? '',
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
