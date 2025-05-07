import type { IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions } from 'n8n-workflow';

import { esmsApiRequest, getEsmsCredentials, HTTP_HEADERS } from '../EsmsGenericFunctions';
import { EsmsListBrandnameResponse, IApiAuthorize } from '../interfaces';

/**
 * Lấy thông tin tài khoản
 * @param this is HookFunctions or ExecuteFunctions
 * @param args.apiKey API Key của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @param args.secretKey Secret Key của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @description Lấy thông tin tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @url https://developers.esms.vn/esms-api/ham-truy-xuat-va-dang-ky/ham-lay-so-du-tai-khoan
 * @returns
 */
export async function getUserInfo(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  args: IApiAuthorize
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
 * @param this is HookFunctions or ExecuteFunctions
 * @param args.apiKey API Key của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @param args.secretKey Secret Key của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @description Lấy danh sách Brandname của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @url https://developers.esms.vn/esms-api/ham-truy-xuat-va-dang-ky/ham-lay-danh-sach-brandname
 * @returns
 */
export async function getEsmsListBrandname(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  args: IApiAuthorize
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
 * @param this is HookFunctions or ExecuteFunctions
 * @param args.apiKey API Key của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @param args.secretKey Secret Key của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @description Lấy danh sách Zalo OA của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @url https://developers.esms.vn/esms-api/ham-truy-xuat-va-dang-ky/ham-lay-danh-sach-zalo-oa
 * @returns
 */
export async function getListZaloOa(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  args: IApiAuthorize
): Promise<any> {

  // Lấy credentials từ node
  const credentials: IApiAuthorize = await getEsmsCredentials.call(this);

  const { ApiKey, SecretKey, ...safeArgs } = args;

  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/GetListZaloOA/', {
    ApiKey: ApiKey ?? credentials.ApiKey ?? '',
    SecretKey: SecretKey ?? credentials.SecretKey ?? '',
    ...safeArgs,
  }, {}, {
    ...HTTP_HEADERS,
  });
}

/**
 * Lấy danh sách template CSKH
 * @param this is HookFunctions or ExecuteFunctions
 * @param args.apiKey API Key của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @param args.secretKey Secret Key của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @param args.smsType Loại tin nhắn (2: SMS thường, 24: SMS Brandname, 25: SMS CSKH)
 * @param args.brandname Tên thương hiệu (Brandname) của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @description Lấy danh sách template của tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @url https://developers.esms.vn/esms-api/ham-truy-xuat-va-dang-ky/ham-lay-danh-sach-template-tin-cham-soc-khach-hang
 * @returns
 */
export async function getTemplateList(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  args: { smsType: '2' | '24' | '25' | string; brandname: string; } & IApiAuthorize
): Promise<any> {
  // Lấy credentials từ node
  const credentials: IApiAuthorize = await getEsmsCredentials.call(this);

  const { ApiKey, SecretKey, ...safeArgs } = args;

  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/GetTemplate/', {
    ApiKey: ApiKey ?? credentials.ApiKey ?? '',
    SecretKey: SecretKey ?? credentials.SecretKey ?? '',
    ...safeArgs,
  }, {}, {
    ...HTTP_HEADERS,
  });
}
