import type { IExecuteFunctions, IHookFunctions } from 'n8n-workflow';

import { esmsApiRequest } from '../EsmsApiRequest';

/**
 * Lấy thông tin tài khoản
 * @param this is HookFunctions or ExecuteFunctions
 * @description Lấy thông tin tài khoản đã đăng nhập trên hệ thống Esms.vn
 * @url https://developers.esms.vn/esms-api/ham-truy-xuat-va-dang-ky/ham-lay-so-du-tai-khoan
 * @returns
 */
export async function getUserInfo(
  this: IHookFunctions | IExecuteFunctions
): Promise<any> {
  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/GetBalance_json', {});
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
export async function getListBrandname(
  this: IHookFunctions | IExecuteFunctions,
  args: { apiKey: string; secretKey: string; }
): Promise<any> {
  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/GetListBrandname', {
    ...args,
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
  this: IHookFunctions | IExecuteFunctions,
  args: { apiKey: string; secretKey: string; smsType: '2' | '24' | '25' | string; brandname: string; }
): Promise<any> {
  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/GetTemplateList', {
    ...args,
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
export async function getListOa(
  this: IHookFunctions | IExecuteFunctions,
  args: { apiKey: string; secretKey: string; }
): Promise<any> {
  return await esmsApiRequest.call(this, 'POST', '/MainService.svc/json/GetListZaloOA', {
    ...args,
  });
}
