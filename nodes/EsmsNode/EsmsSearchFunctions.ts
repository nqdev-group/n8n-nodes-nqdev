import type {
  ILoadOptionsFunctions,
  INodeListSearchItems,
  INodeListSearchResult,
} from 'n8n-workflow';

import {
  EsmsListBrandnameResponse,
  EsmsListTemplateResponse,
  EsmsListZaloOaResponse,
  getEsmsCredentials,
  getEsmsListBrandname,
  getEsmsListTemplate,
  getEsmsListZaloOa,
  IApiAuthorize,
} from '../../nqdev-libraries/esmsvn';

export async function getListBrandname(
  this: ILoadOptionsFunctions,
  filter?: string,
  paginationToken?: string,
): Promise<INodeListSearchResult> {
  const page = paginationToken ? +paginationToken : 1;
  const pageSize = 100;

  const esmsCredentials: IApiAuthorize = await getEsmsCredentials.call(this),
    // options = this.getNodeParameter('options', {}) as { [key: string]: any }
    esmsSmsType = this.getNodeParameter('esmsSmsType', 8) as number;

  // this.logger.info(`getListBrandname: ${JSON.stringify({ filter, paginationToken, page, pageSize, esmsSmsType, options })}`);

  const responseData: EsmsListBrandnameResponse = await getEsmsListBrandname.call(this, {
    ...esmsCredentials,
    SmsType: esmsSmsType ?? '2',
    Brandname: filter ?? '',
  });

  // Lọc các Brandname theo từ khóa
  const filteredData = responseData.ListBrandName?.filter(item =>
    item.Brandname?.toLowerCase().includes(filter?.toLowerCase() ?? '')
  );

  // Tính toán phân trang
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData?.slice(startIndex, endIndex) ?? [];

  // Tính toán token phân trang tiếp theo
  const nextPaginationToken = (page * pageSize < (filteredData?.length ?? 0)) ? page + 1 : undefined;

  const results: INodeListSearchItems[] = paginatedData?.map((item) => ({
    name: item.Brandname ?? '',
    value: item.Brandname ?? '',
  })) ?? [];

  const nodeListSearchResult: INodeListSearchResult = {
    results: results,
    paginationToken: nextPaginationToken,
  };
  return nodeListSearchResult;
}

export async function getListZaloOA(
  this: ILoadOptionsFunctions,
  filter?: string,
  paginationToken?: string,
): Promise<INodeListSearchResult> {
  const page = paginationToken ? +paginationToken : 1;
  const pageSize = 100;

  const esmsCredentials = await getEsmsCredentials.call(this),
    // options = this.getNodeParameter('options', {}) as { [key: string]: any },
    esmsSmsType = this.getNodeParameter('esmsSmsType', 8) as string;

  // this.logger.info(`getListZaloOA: ${JSON.stringify({ filter, paginationToken, page, pageSize, esmsSmsType, options })}`);

  const responseData: EsmsListZaloOaResponse = await getEsmsListZaloOa.call(this, {
    ...esmsCredentials,
    smsType: esmsSmsType ?? '24',
  });

  // Lọc các Brandname theo từ khóa
  const filteredData = responseData.ZOAList?.filter(item =>
    item.OAName?.toLowerCase().includes(filter?.toLowerCase() ?? '')
    || `${item.OAID}`?.toLowerCase().includes(filter?.toLowerCase() ?? '')
  ) ?? [];

  // Tính toán phân trang
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData?.slice(startIndex, endIndex) ?? [];

  // Tính toán token phân trang tiếp theo
  const nextPaginationToken = (page * pageSize < (filteredData?.length ?? 0)) ? page + 1 : undefined;

  const results: INodeListSearchItems[] = paginatedData?.map((item) => ({
    name: `${item.OAName} (${item.OAID})`,
    value: item.OAID ?? '',
  })) ?? [];

  const nodeListSearchResult: INodeListSearchResult = {
    results: results,
    paginationToken: nextPaginationToken,
  };
  return nodeListSearchResult;
}

export async function getListZnsTemplate(
  this: ILoadOptionsFunctions,
  filter?: string,
  paginationToken?: string,
): Promise<INodeListSearchResult> {
  const page = paginationToken ? +paginationToken : 1;
  const pageSize = 100;

  const esmsCredentials = await getEsmsCredentials.call(this),
    // options = this.getNodeParameter('options', {}) as { [key: string]: any },
    esmsSmsType = this.getNodeParameter('esmsSmsType', 8) as string,
    esmsZaloOA = (this.getNodeParameter('esmsZaloOA', {}) as { mode: string; value: string })?.value ?? '';

  // this.logger.info(`getListZnsTemplate: ${JSON.stringify({ filter, paginationToken, page, pageSize, esmsSmsType, esmsZaloOA, options })}`);

  const responseData: EsmsListTemplateResponse = await getEsmsListTemplate.call(this, {
    ...esmsCredentials,
    smsType: esmsSmsType ?? '24',
    zaloOaId: esmsZaloOA ?? '',
  });

  // Lọc các Brandname theo từ khóa
  const filteredData = responseData.ZNSTemplates?.filter(item =>
    item.TempName?.toLowerCase().includes(filter?.toLowerCase() ?? '')
    || `${item.TempId}`?.toLowerCase().includes(filter?.toLowerCase() ?? '')
  ) ?? [];

  // Tính toán phân trang
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData?.slice(startIndex, endIndex) ?? [];

  // Tính toán token phân trang tiếp theo
  const nextPaginationToken = (page * pageSize < (filteredData?.length ?? 0)) ? page + 1 : undefined;

  const results: INodeListSearchItems[] = paginatedData?.map((item) => ({
    name: `${item.TempId} | ${item.TempName}`,
    value: item.TempId ?? '',
  })) ?? [];

  const nodeListSearchResult: INodeListSearchResult = {
    results: results,
    paginationToken: nextPaginationToken,
  };
  return nodeListSearchResult;
}
