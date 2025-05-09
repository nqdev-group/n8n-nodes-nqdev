import type {
  ILoadOptionsFunctions,
  INodeListSearchItems,
  INodeListSearchResult,
} from 'n8n-workflow';
import { EsmsListBrandnameResponse, getEsmsCredentials, getEsmsListBrandname } from '../../nqdev-libraries/esmsvn';

export async function getListBrandname(
  this: ILoadOptionsFunctions,
  filter?: string,
  paginationToken?: string,
): Promise<INodeListSearchResult> {
  const page = paginationToken ? +paginationToken : 1;
  const pageSize = 100;

  const credentials = await getEsmsCredentials.call(this),
    esmsSmsType = this.getNodeParameter('esmsSmsType', 8) as number,
    options = this.getNodeParameter('options', {}) as { [key: string]: any };

  this.logger.info(`getListBrandname: ${JSON.stringify({ filter, paginationToken, page, pageSize, esmsSmsType, options })}`);

  const responseData: EsmsListBrandnameResponse = await getEsmsListBrandname.call(this, {
    ApiKey: credentials.ApiKey ?? '',
    SecretKey: credentials.SecretKey ?? '',
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

  return { results, paginationToken: nextPaginationToken, };
}

export async function getListZaloOA(
  this: ILoadOptionsFunctions,
  filter?: string,
  paginationToken?: string,
): Promise<INodeListSearchResult> {
  const page = paginationToken ? +paginationToken : 1;
  const pageSize = 100;

  const credentials = await getEsmsCredentials.call(this),
    esmsSmsType = this.getNodeParameter('esmsSmsType', 8) as number,
    options = this.getNodeParameter('options', {}) as { [key: string]: any };

  this.logger.info(`getListZaloOA: ${JSON.stringify({ filter, paginationToken, page, pageSize, esmsSmsType, options, credentials })}`);

  const results: INodeListSearchItems[] = [];
  return { results, paginationToken: undefined };
}

export async function getListZnsTemplate(
  this: ILoadOptionsFunctions,
  filter?: string,
  paginationToken?: string,
): Promise<INodeListSearchResult> {
  const page = paginationToken ? +paginationToken : 1;
  const pageSize = 100;

  const credentials = await getEsmsCredentials.call(this),
    esmsSmsType = this.getNodeParameter('esmsSmsType', 8) as number,
    esmsZaloOA = (this.getNodeParameter('esmsZaloOA', { mode: 'name', value: 'n8n-nqdev' }) as { mode: string; value: string })?.value ?? 'n8n-nqdev',
    options = this.getNodeParameter('options', {}) as { [key: string]: any };

  this.logger.info(`getListZnsTemplate: ${JSON.stringify({ filter, paginationToken, page, pageSize, esmsSmsType, esmsZaloOA, options, credentials })}`);

  const results: INodeListSearchItems[] = [];
  return { results, paginationToken: undefined };
}
