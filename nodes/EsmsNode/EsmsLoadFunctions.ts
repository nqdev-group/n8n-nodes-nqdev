import type {
  ILoadOptionsFunctions,
  INodeListSearchItems,
  INodePropertyOptions,
} from 'n8n-workflow';

import {
  EsmsTemplateInfoResponse,
  getEsmsCredentials,
  getEsmsZnsTemplateInfo,
} from '../../nqdev-libraries/esmsvn';

export async function getLoadZnsTemplateParameters(
  this: ILoadOptionsFunctions,
  filter?: string,
  paginationToken?: string,
): Promise<INodePropertyOptions[]> {
  const page = paginationToken ? +paginationToken : 1;
  const pageSize = 100;

  const credentials = await getEsmsCredentials.call(this),
    esmsSmsType = this.getNodeParameter('esmsSmsType', 8) as number,
    esmsZaloOA = (this.getNodeParameter('esmsZaloOA', {}) as { mode: string; value: string })?.value ?? '',
    esmsTemplateId = (this.getNodeParameter('esmsTemplateId', {}) as { mode: string; value: string })?.value ?? '',
    options = this.getNodeParameter('options', {}) as { [key: string]: any };

  this.logger.info(`getLoadZnsTemplateParameters: ${JSON.stringify({ filter, paginationToken, page, pageSize, esmsSmsType, esmsZaloOA, esmsZnsTemplate: esmsTemplateId, options, credentials })}`);

  const responseData: EsmsTemplateInfoResponse = await getEsmsZnsTemplateInfo.call(this, {
    ApiKey: credentials.ApiKey ?? '',
    SecretKey: credentials.SecretKey ?? '',
    templateId: esmsTemplateId ?? '',
    zaloOaId: esmsZaloOA ?? '',
  });

  const filteredData = responseData.Data?.ListParams ?? [];

  const results: INodeListSearchItems[] = filteredData?.map((item) => ({
    name: `${item.Name}`,
    value: item.Name ?? '',
    description: item.Name ?? '',
  })) ?? [];

  return results;
}
