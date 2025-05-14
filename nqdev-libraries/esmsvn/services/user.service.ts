import type { IDataObject, IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions } from 'n8n-workflow';

import { esmsApiRequest, getEsmsCredentials, HTTP_HEADERS } from '../EsmsGenericFunctions';
import { EsmsListBrandnameResponse, EsmsListTemplateResponse, EsmsListZaloOaResponse, EsmsTemplateInfoResponse, IApiAuthorize } from '../interfaces';

/**
 * Lấy thông tin tài khoản
 * @param this Context của workflow function trong n8n (HookFunctions, ExecuteFunctions hoặc LoadOptionsFunctions).
 * @param args.apiKey API Key của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @param args.secretKey Secret Key của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @description Lấy thông tin tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @see https://developers.esms.vn/esms-api/ham-truy-xuat-va-dang-ky/ham-lay-so-du-tai-khoan
 * @returns
 */
export async function getUserInfo(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  args: {} & IApiAuthorize
): Promise<any> {
  // Lấy credentials từ node
  const credentials: IApiAuthorize = await getEsmsCredentials.call(this);

  const { ApiKey, SecretKey, ...safeArgs } = args;

  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/GetBalance_json', {
    ApiKey: ApiKey ?? credentials.ApiKey ?? '',
    SecretKey: SecretKey ?? credentials.SecretKey ?? '',
    ...safeArgs,
  }, {}, {
    ...HTTP_HEADERS,
  });
}

/**
 * Lấy danh sách brandname
 * @param this Context của workflow function trong n8n (HookFunctions, ExecuteFunctions hoặc LoadOptionsFunctions).
 * @param args.apiKey API Key của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @param args.secretKey Secret Key của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @description Lấy danh sách Brandname của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @see https://developers.esms.vn/esms-api/ham-truy-xuat-va-dang-ky/ham-lay-danh-sach-brandname
 * @returns
 */
export async function getEsmsListBrandname(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  args: {} & IApiAuthorize
): Promise<EsmsListBrandnameResponse> {
  // Lấy credentials từ node
  const credentials: IApiAuthorize = await getEsmsCredentials.call(this);

  const { ApiKey, SecretKey, ...safeArgs } = args;

  return await esmsApiRequest.call(this, 'GET',
    `/MainService.svc/json/GetListBrandnameV2/${ApiKey ?? credentials.ApiKey ?? ''}/${SecretKey ?? credentials.SecretKey ?? ''}`, {
    ...safeArgs,
  }, {}, {
    ...HTTP_HEADERS,
  });
}

/**
 * Lấy danh sách Zalo Official Account (OA)
 * @param this Context của workflow function trong n8n (HookFunctions, ExecuteFunctions hoặc LoadOptionsFunctions).
 * @param args.apiKey API Key của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @param args.secretKey Secret Key của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @description Lấy danh sách Zalo OA của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @see https://developers.esms.vn/esms-api/ham-truy-xuat-va-dang-ky/ham-lay-danh-sach-zalo-oa
 * @returns
 */
export async function getEsmsListZaloOa(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  args: {} & IApiAuthorize
): Promise<EsmsListZaloOaResponse> {

  // Lấy credentials từ node
  const credentials: IApiAuthorize = await getEsmsCredentials.call(this);

  const { ApiKey, SecretKey, ...safeArgs } = args;

  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/ZNS/GetListZOA/', {
    ApiKey: ApiKey ?? credentials.ApiKey ?? '',
    SecretKey: SecretKey ?? credentials.SecretKey ?? '',
    ...safeArgs,
  }, {}, {
    ...HTTP_HEADERS,
  });
}

/**
 * Lấy danh sách template (template CSKH & template ZaloZNS)
 * @param this Context của workflow function trong n8n (HookFunctions, ExecuteFunctions hoặc LoadOptionsFunctions).
 * @param args.apiKey API Key của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @param args.secretKey Secret Key của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @param args.smsType Loại tin nhắn (2: SMS thường, 24: SMS Brandname, 25: SMS CSKH)
 * @param args.brandname Tên thương hiệu (Brandname) của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @param args.zaloOaId ID của Zalo Official Account (OA) của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @description Lấy danh sách template của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @see https://developers.esms.vn/esms-api/ham-truy-xuat-va-dang-ky/ham-lay-danh-sach-template-tin-cham-soc-khach-hang
 * @returns
 */
export async function getEsmsListTemplate(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  args: { smsType: '2' | '24' | '25' | string; brandname?: string; zaloOaId?: string; } & IApiAuthorize
): Promise<EsmsListTemplateResponse> {
  // Lấy credentials từ node
  const credentials: IApiAuthorize = await getEsmsCredentials.call(this);

  const { ApiKey, SecretKey, } = args;
  const rawBody: IDataObject & IApiAuthorize = {
    ApiKey: ApiKey ?? credentials.ApiKey ?? '',
    SecretKey: SecretKey ?? credentials.SecretKey ?? '',
    SmsType: args.smsType,
  };

  switch (args.smsType.toString()) {
    case '1':
    case '2':
      Object.assign(rawBody, {
        Brandname: args.brandname ?? '',
      });
      break;

    case '24':
    case '25':
      Object.assign(rawBody, {
        OAId: args.zaloOaId ?? '',
      });
      break;

    default:
      break;
  }

  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/GetTemplate/', rawBody, {}, {
    ...HTTP_HEADERS,
  });
}

/**
 * Lấy thông tin template ZaloZNS
 * @param this Context của workflow function trong n8n (HookFunctions, ExecuteFunctions hoặc LoadOptionsFunctions).
 * @param args.apiKey API Key của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @param args.secretKey Secret Key của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @param args.templateId ID của template ZaloZNS
 * @param args.zaloOaId ID của Zalo Official Account (OA) của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @description Lấy thông tin template ZaloZNS của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @url https://developers.esms.vn/esms-api/ham-truy-xuat-va-dang-ky/ham-lay-thong-tin-template-zalo-zns
 * @returns
 */
export async function getEsmsZnsTemplateInfo(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  args: { templateId: string; zaloOaId: string; } & IApiAuthorize
): Promise<EsmsTemplateInfoResponse> {
  // Lấy credentials từ node
  const credentials: IApiAuthorize = await getEsmsCredentials.call(this);

  const { ApiKey, SecretKey, } = args;

  const rawBody: IDataObject & IApiAuthorize = {},
    qsData: IDataObject & IApiAuthorize = {
      ApiKey: ApiKey ?? credentials.ApiKey ?? '',
      SecretKey: SecretKey ?? credentials.SecretKey ?? '',
      TemplateId: args.templateId ?? '',
      OAId: args.zaloOaId ?? '',
    };

  return await esmsApiRequest.call(this, 'GET', '/MainService.svc/json/GetZnsTemplateInfo', rawBody, qsData, {
    ...HTTP_HEADERS,
  });
}
