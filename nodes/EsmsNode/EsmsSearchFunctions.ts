import type {
  ILoadOptionsFunctions,
  INodeListSearchItems,
  INodeListSearchResult,
} from 'n8n-workflow';

export async function getListBrandname(
  this: ILoadOptionsFunctions,
  filter?: string,
  paginationToken?: string,
): Promise<INodeListSearchResult> {
  this.logger.debug('getListBrandname', { filter, paginationToken });

  // const page = paginationToken ? +paginationToken : 1;
  // const per_page = 100;
  // const responseData: UserSearchResponse = await githubApiRequest.call(
  //   this,
  //   'GET',
  //   '/search/users',
  //   {},
  //   { q: filter, page, per_page },
  // );

  // const results: INodeListSearchItems[] = responseData.items.map((item: UserSearchItem) => ({
  //   name: item.login,
  //   value: item.login,
  //   url: item.html_url,
  // }));

  // const nextPaginationToken = page * per_page < responseData.total_count ? page + 1 : undefined;
  // return { results, paginationToken: nextPaginationToken };

  const results: INodeListSearchItems[] = [];
  return { results, paginationToken: undefined };
}

export async function getListZaloOA(
  this: ILoadOptionsFunctions,
  filter?: string,
  paginationToken?: string,
): Promise<INodeListSearchResult> {
  const results: INodeListSearchItems[] = [];
  return { results, paginationToken: undefined };
}

export async function getListZnsTemplate(
  this: ILoadOptionsFunctions,
  filter?: string,
  paginationToken?: string,
): Promise<INodeListSearchResult> {
  const results: INodeListSearchItems[] = [];
  return { results, paginationToken: undefined };
}
