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
import { EsmsResponse, IApiAuthorize } from './interfaces';

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
    baseUrl: (credentials?.esmsDomain ?? 'https://rest.esms.vn') as string,
  };

  return esmsCredentials;
}

/**
 * Gửi request đến API của ESMS
 *
 * Hàm này thực hiện gửi HTTP request đến hệ thống API của ESMS (https://developers.esms.vn/esms-api).
 * Nó được dùng trong môi trường workflow như n8n với `this` là context (HookFunctions, ExecuteFunctions hoặc LoadOptionsFunctions).
 * Cho phép thực hiện các phương thức HTTP như GET, POST, PUT, DELETE tới endpoint mong muốn với các tham số tuỳ chỉnh.
 *
 * @param this Context của workflow function trong n8n (HookFunctions, ExecuteFunctions hoặc LoadOptionsFunctions).
 * @param method Phương thức HTTP cần sử dụng (ví dụ: 'GET', 'POST', 'PUT', 'DELETE').
 * @param endpoint Đường dẫn endpoint cụ thể trong API của ESMS (không bao gồm URL gốc).
 * @param body Dữ liệu sẽ được gửi trong phần thân request (chỉ áp dụng với phương thức như POST hoặc PUT).
 * @param qs Tham số query string cần đính kèm theo URL.
 * @param headers Header tuỳ chỉnh, mặc định là HTTP_HEADERS đã được cấu hình sẵn.
 * @description
 * Hàm hỗ trợ gửi các request có xác thực tới hệ thống ESMS, dùng để gửi tin nhắn SMS, tra cứu trạng thái tin nhắn,
 * tạo chiến dịch SMS marketing, và các tác vụ khác liên quan đến dịch vụ của ESMS.
 *
 * @see https://developers.esms.vn/esms-api - Tài liệu chính thức của ESMS API để tham khảo thêm thông tin về endpoint và cấu trúc dữ liệu.
 *
 * @returns {Promise<EsmsResponse>} - Một Promise chứa phản hồi từ API của ESMS, định dạng tuân theo cấu trúc EsmsResponse.
 */
export async function esmsApiRequest(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject = {},
  headers: IDataObject = { ...HTTP_HEADERS },
): Promise<EsmsResponse> {
  // Lấy credentials từ node
  const credentials = await this.getCredentials(NAME_CREDENTIAL),
    baseUrl: string = (credentials?.esmsDomain ?? 'https://rest.esms.vn') as string,
    esmsApiKey: string = (credentials?.esmsApiKey ?? '') as string,
    esmsSecretKey: string = (credentials?.esmsSecretKey ?? '') as string;

  const { ApiKey, SecretKey, ...safeBody } = body;

  const response: EsmsResponse = await nqdevApiRequest.call(this, NAME_CREDENTIAL, method, baseUrl, endpoint, {
    ApiKey: ApiKey ?? esmsApiKey ?? '',
    SecretKey: SecretKey ?? esmsSecretKey ?? '',
    ...safeBody,
  }, {
    ...qs
  }, {
    ...headers
  });

  // Check if the response indicates an error (e.g., invalid credentials)
  if (response.CodeResult === '101') {
    throw new NodeApiError(this.getNode(), response as JsonObject, {
      message: 'Invalid credentials or API error!',
    });
  }

  // Return the response if successful
  return response;
}
