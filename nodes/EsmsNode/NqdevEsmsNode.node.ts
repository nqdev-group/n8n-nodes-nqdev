import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError, } from 'n8n-workflow';

import { nqdevEsmsProperties, } from '../../descriptions/NqdevEsmsApi.descriptions';

const NAME_CREDENTIAL = 'nqdevEsmsApi';

export class NqdevEsmsNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: '[Nqdev] EsmsVN Node',
    name: 'nqdevEsmsNode',
    icon: {
      light: 'file:esms.svg',
      dark: 'file:esms.dark.svg',
    },
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: '[Nqdev] EsmsVN Node',
    defaults: {
      name: '[Nqdev] EsmsVN Node',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        // The name of the credential type to use.
        // It has to match the name of the credential type class.
        name: NAME_CREDENTIAL,
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://rest.esms.vn',
      url: '',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      // The default query string parameters which will be sent with every request
    },
    /**
     * In the properties array we have two mandatory options objects required
     *
     * [Resource & Operation]
     *
     * https://docs.n8n.io/integrations/creating-nodes/code/create-first-node/#resources-and-operations
     *
     * In our example, the operations are separated into their own file (HTTPVerbDescription.ts)
     * to keep this class easy to read.
     *
     */
    properties: [
      ...nqdevEsmsProperties, // it is credentials model
      // ...nqdevEsmsOperation,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    let item: INodeExecutionData;

    let esmsDomain: string = 'https://rest.esms.vn',
      esmsApiKey: string = '', esmsSecretKey: string = '';

    // Lấy credentials từ node
    const credentials = await this.getCredentials(NAME_CREDENTIAL);
    if (credentials) {
      esmsDomain = (credentials.esmsDomain ?? 'https://rest.esms.vn') as string;
      esmsApiKey = (credentials.apiKey ?? '') as string;
      esmsSecretKey = (credentials.secretKey ?? '') as string;
    }

    let esmsSmsType: string = '', esmsBrandname: string = '',
      esmsPhonenumber: string = '', esmsSmsContent: string = '';

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        item = items[itemIndex];

        // Lấy giá trị esmsDomain từ tham số (có thể override credentials nếu cần)
        esmsDomain = this.getNodeParameter('esmsDomain', itemIndex, esmsDomain) as string;
        esmsApiKey = this.getNodeParameter('esmsApiKey', itemIndex, esmsApiKey) as string;
        esmsSecretKey = this.getNodeParameter('esmsSecretKey', itemIndex, esmsSecretKey) as string;

        esmsSmsType = this.getNodeParameter('esmsSmsType', itemIndex, '2') as string;
        esmsBrandname = this.getNodeParameter('esmsBrandname', itemIndex, 'n8n-nqdev') as string;
        esmsPhonenumber = this.getNodeParameter('esmsPhonenumber', itemIndex, '') as string;
        esmsSmsContent = this.getNodeParameter('esmsSmsContent', itemIndex, '') as string;

        // Cấu hình dữ liệu để gửi POST request
        let postData = {
          ApiKey: esmsApiKey ?? '',
          SecretKey: esmsSecretKey ?? '',
          SmsType: esmsSmsType ?? '2',
          Brandname: esmsBrandname ?? '',
          Phone: esmsPhonenumber ?? '',
          Content: esmsSmsContent ?? '',
          IsUnicode: '0',
          Sandbox: '0',
          PartnerSource: 0
        };

        // Gửi POST request đến API của ESMS
        let response = await this.helpers.request({
          baseURL: esmsDomain,
          url: `${esmsDomain}/api/send`, // URL gửi request, thay đổi tùy theo API endpoint
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });

        item.json.esmsConfig = {
          esmsDomain, esmsApiKey, esmsSecretKey,
          esmsSmsType, esmsBrandname,
          esmsPhonenumber, esmsSmsContent,
        };

        // Lưu kết quả trả về vào item.json (nếu muốn sử dụng sau)
        item.json.esmsResponse = response;
      } catch (error) {
        if (this.continueOnFail()) {
          items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
        } else {
          if (error.context) {
            error.context.itemIndex = itemIndex;
            throw error;
          }
        }

        throw new NodeOperationError(this.getNode(), error, {
          itemIndex,
        });
      }
    }

    return [items];
  }
}
