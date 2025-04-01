import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  JsonObject,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError, } from 'n8n-workflow';

import { esmsNodeModel, getUserInfo, NAME_CREDENTIAL, sendMultipleMessage, ISendSmsParams } from '../../nqdev-libraries/esmsvn';

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
    description: 'Send SMS and OTT messages using EsmsVN API.',
    defaults: {
      name: `EsmsVN`,
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
      url: '/',
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

    // Lấy credentials từ node
    const credentials = await this.getCredentials(NAME_CREDENTIAL),
      esmsApiKey = (credentials?.esmsApiKey ?? '') as string,
      esmsSecretKey = (credentials?.esmsSecretKey ?? '') as string;

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        const item = items[itemIndex];
        const resource = this.getNodeParameter('resource', itemIndex, '') as string;
        const operation = this.getNodeParameter('operation', itemIndex, '') as string;

        let responseData: JsonObject | IDataObject = {
          resource, operation,
        };

        if (resource === 'account') {
          switch (operation) {
            case 'getBalance': {
              let esmsResponse = await getUserInfo.call(this);
              responseData['esmsResponse'] = esmsResponse;
              break;
            }

            default: {
              throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not known!`, {
                itemIndex: itemIndex
              });
            }
          }
        } else if (resource === 'sms_message') {
          switch (operation) {
            case 'sendSmsMessage': {
              // Cấu hình dữ liệu để gửi POST request
              let postData: ISendSmsParams = {
                ApiKey: esmsApiKey ?? '',
                SecretKey: esmsSecretKey ?? '',
                SmsType: this.getNodeParameter('esmsSmsType', itemIndex, '2') as string,
                Brandname: this.getNodeParameter('esmsBrandname', itemIndex, 'n8n-nqdev') as string ?? '',
                Phone: this.getNodeParameter('esmsPhonenumber', itemIndex, '') as string,
                Content: this.getNodeParameter('esmsContent', itemIndex, '') as string,
                IsUnicode: (this.getNodeParameter('esmsIsUnicode', itemIndex, '') as boolean) ? '1' : '0',
                Sandbox: (this.getNodeParameter('esmsIsSandbox', itemIndex, '') as boolean) ? '1' : '0',
                PartnerSource: this.getNodeParameter('esmsPartnerSource', itemIndex, '0') as string,
              };

              responseData['esmsRequest'] = {
                Phone: postData.Phone,
                Content: postData.Content,
                SmsType: postData.SmsType,
                Brandname: postData.Brandname,
                Sandbox: postData.Sandbox,
                IsUnicode: postData.IsUnicode,
              };

              // Gửi POST request đến API của ESMS
              let esmsResponse = await sendMultipleMessage.call(this, postData);
              responseData['esmsResponse'] = esmsResponse;

              break;
            }

            default: {
              throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not known!`, {
                itemIndex: itemIndex
              });
            }
          }
        } else if (resource === 'ott_message') {
          switch (operation) {
            case 'sendZnsMessage': {
              // Cấu hình dữ liệu để gửi POST request
              let postData: ISendSmsParams = {
                ApiKey: esmsApiKey ?? '',
                SecretKey: esmsSecretKey ?? '',
                SmsType: this.getNodeParameter('esmsSmsType', itemIndex, '2') as string,
                Brandname: this.getNodeParameter('esmsBrandname', itemIndex, 'n8n-nqdev') as string ?? '',
                Phone: this.getNodeParameter('esmsPhonenumber', itemIndex, '') as string,
                Content: this.getNodeParameter('esmsContent', itemIndex, '') as string,
                IsUnicode: (this.getNodeParameter('esmsIsUnicode', itemIndex, '') as boolean) ? '1' : '0',
                Sandbox: (this.getNodeParameter('esmsIsSandbox', itemIndex, '') as boolean) ? '1' : '0',
                PartnerSource: this.getNodeParameter('esmsPartnerSource', itemIndex, '0') as string,
              };

              responseData['esmsRequest'] = {
                Phone: postData.Phone,
                Content: postData.Content,
                SmsType: postData.SmsType,
                Brandname: postData.Brandname,
                Sandbox: postData.Sandbox,
                IsUnicode: postData.IsUnicode,
              };

              // Gửi POST request đến API của ESMS
              let esmsResponse = await sendMultipleMessage.call(this, postData);
              responseData['esmsResponse'] = esmsResponse;

              break;
            }

            case 'sendViberMessage': {
              // Cấu hình dữ liệu để gửi POST request
              let postData: ISendSmsParams = {
                ApiKey: esmsApiKey ?? '',
                SecretKey: esmsSecretKey ?? '',
                SmsType: this.getNodeParameter('esmsSmsType', itemIndex, '2') as string,
                Brandname: this.getNodeParameter('esmsBrandname', itemIndex, 'n8n-nqdev') as string ?? '',
                Phone: this.getNodeParameter('esmsPhonenumber', itemIndex, '') as string,
                Content: this.getNodeParameter('esmsContent', itemIndex, '') as string,
                IsUnicode: (this.getNodeParameter('esmsIsUnicode', itemIndex, '') as boolean) ? '1' : '0',
                Sandbox: (this.getNodeParameter('esmsIsSandbox', itemIndex, '') as boolean) ? '1' : '0',
                PartnerSource: this.getNodeParameter('esmsPartnerSource', itemIndex, '0') as string,
              };

              responseData['esmsRequest'] = {
                Phone: postData.Phone,
                Content: postData.Content,
                SmsType: postData.SmsType,
                Brandname: postData.Brandname,
                Sandbox: postData.Sandbox,
                IsUnicode: postData.IsUnicode,
              };

              // Gửi POST request đến API của ESMS
              let esmsResponse = await sendMultipleMessage.call(this, postData); responseData['esmsResponse'] = esmsResponse;

              break;
            }

            default: {
              throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not known!`, {
                itemIndex: itemIndex
              });
            }
          }
        } else {
          throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not known!`, {
            itemIndex: itemIndex,
          });
        }

        if (Array.isArray(responseData)) {
          returnData.push.apply(returnData, responseData as IDataObject[]);
        } else if (responseData !== undefined) {
          returnData.push(responseData as IDataObject);
        }

        // Lưu kết quả trả về vào item.json (nếu muốn sử dụng sau)
        item.json = responseData;
      } catch (error) {
        if (this.continueOnFail()) {
          items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
          continue;
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

    // return [items];
    return [this.helpers.returnJsonArray(returnData)];
  }
}
