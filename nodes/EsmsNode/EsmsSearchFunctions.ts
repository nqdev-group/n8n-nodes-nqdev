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
  this.logger.debug('getListBrandname', { filter, paginationToken });

  const page = paginationToken ? +paginationToken : 1;
  const per_page = 100;

  const credentials = await getEsmsCredentials.call(this),
    responseData: EsmsListBrandnameResponse = await getEsmsListBrandname.call(this, {
      ApiKey: credentials.ApiKey ?? '',
      SecretKey: credentials.SecretKey ?? '',
      Brandname: filter ?? '',
      q: filter, page, per_page,
    });

  const results: INodeListSearchItems[] = responseData.ListBrandName?.map((item) => ({
    name: item.Brandname ?? '',
    value: item.Brandname ?? '',
  })) ?? [];

  const nextPaginationToken = page * per_page < (responseData.ListBrandName?.length ?? 0) ? page + 1 : undefined;
  return { results, paginationToken: nextPaginationToken };
}

export async function getListZaloOA(
  this: ILoadOptionsFunctions,
  filter?: string,
  paginationToken?: string,
): Promise<INodeListSearchResult> {
  this.logger.debug('getListZaloOA', { filter, paginationToken });
  const results: INodeListSearchItems[] = [];
  return { results, paginationToken: undefined };
}

export async function getListZnsTemplate(
  this: ILoadOptionsFunctions,
  filter?: string,
  paginationToken?: string,
): Promise<INodeListSearchResult> {
  this.logger.debug('getListZnsTemplate', { filter, paginationToken });
  const results: INodeListSearchItems[] = [];
  return { results, paginationToken: undefined };
}
