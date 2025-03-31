import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError, } from 'n8n-workflow';

import { nqdevApiRequest } from "../../nqdev-libraries";
import { esmsNodeModel, getUserInfo, NAME_CREDENTIAL } from '../../nqdev-libraries/esmsvn';

export class NqdevEsmsNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Nqdev Tích hợp EsmsVN',
    name: 'nqdevEsmsNode',
    icon: {
      light: 'file:esms.svg',
      dark: 'file:esms.dark.svg',
    },
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
    description: 'Node to send SMS using EsmsVN API',
    defaults: {
      name: `Nqdev Tích hợp EsmsVN ${Date.now()}`,
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
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
      ...esmsNodeModel,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: IDataObject[] = [];

    let esmsDomain: string = 'https://rest.esms.vn',
      esmsApiKey: string = '', esmsSecretKey: string = '',
      esmsRequest: IDataObject = {}, esmsResponse: IDataObject = {};

    // Lấy credentials từ node
    const credentials = await this.getCredentials(NAME_CREDENTIAL);
    if (credentials) {
      esmsDomain = (credentials.esmsDomain ?? 'https://rest.esms.vn') as string;
      esmsApiKey = (credentials.esmsApiKey ?? '') as string;
      esmsSecretKey = (credentials.esmsSecretKey ?? '') as string;
    }

    let esmsSmsType: string = '', esmsBrandname: string = '',
      esmsPhonenumber: string = '', esmsSmsContent: string = '';

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        const item = items[itemIndex];
        const resource = this.getNodeParameter('resource', itemIndex, '') as string;
        const operation = this.getNodeParameter('operation', itemIndex, '') as string;

        if (resource === 'account') {
          switch (operation) {
            case 'getBalance':
              {
                esmsResponse = await getUserInfo.call(this);
                break;
              }

            default:
              break;
          }
        } else if (resource === 'sms_message') {
          switch (operation) {
            case 'sendSmsMessage':
              {
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

                esmsRequest = {
                  ...esmsRequest,
                  ...postData,
                };

                // Gửi POST request đến API của ESMS
                esmsResponse = await nqdevApiRequest.call(this, NAME_CREDENTIAL, 'POST', esmsDomain, '/MainService.svc/json/SendMultipleMessage_V4_post_json/', postData)

                break;
              }

            default:
              break;
          }
        } else if (resource === 'ott_message') {
          switch (operation) {
            case 'sendZnsMessage':
              {
                break;
              }
            case 'sendViberMessage':
              {
                break;
              }
            default:
              break;
          }
        }

        if (Array.isArray(esmsResponse)) {
          returnData.push.apply(returnData, esmsResponse as IDataObject[]);
        } else if (esmsResponse !== undefined) {
          returnData.push(esmsResponse as IDataObject);
        }

        // Lưu kết quả trả về vào item.json (nếu muốn sử dụng sau)
        item.json.esmsRequest = esmsRequest;
        item.json.esmsResponse = esmsResponse;
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
