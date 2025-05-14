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

  const esmsCredentials = await getEsmsCredentials.call(this),
    // options = this.getNodeParameter('options', {}) as { [key: string]: any },
    esmsSmsType = this.getNodeParameter('esmsSmsType', 8) as number,
    esmsZaloOA = (this.getNodeParameter('esmsZaloOA', {}) as { mode: string; value: string })?.value ?? '',
    esmsTemplateId = (this.getNodeParameter('esmsTemplateId', {}) as { mode: string; value: string })?.value ?? '';

  // this.logger.info(`getLoadZnsTemplateParameters: ${JSON.stringify({ filter, paginationToken, page, pageSize, esmsSmsType, esmsZaloOA, esmsZnsTemplate: esmsTemplateId, options, credentials })}`);

  const responseData: EsmsTemplateInfoResponse = await getEsmsZnsTemplateInfo.call(this, {
    ...esmsCredentials,
    templateId: esmsTemplateId ?? '',
    zaloOaId: esmsZaloOA ?? '',
    smsType: esmsSmsType ?? '2',
    page, pageSize,
  });

  const filteredData = responseData.Data?.ListParams ?? [];

  const results: INodeListSearchItems[] = filteredData?.map((item) => ({
    name: `${item.Name}`,
    value: item.Name ?? '',
    // eslint-disable-next-line n8n-nodes-base/node-param-description-excess-final-period
    description: `${(item.Name ?? '')} (bắt buộc: ${(item.Require ? 'có' : 'không')}), kiểu ${item.Type}, độ dài từ ${item.MinLength} đến ${item.MaxLength} ký tự, ${(item.AcceptNull ? 'chấp nhận' : 'không chấp nhận')} giá trị null.`,
  })) ?? [];

  return results;
}
