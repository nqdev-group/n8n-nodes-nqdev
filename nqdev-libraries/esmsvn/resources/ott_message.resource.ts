// Project: nqdev-libraries

import type { IDataObject, IExecuteFunctions, IHookFunctions } from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";
import { INqdevResponseData } from "../../common";
import { ISendSmsMessageParams, ISendZnsMessageParams } from "../interfaces";
import { sendSmsMessage, sendZaloZnsMessage } from "../services";
import { NAME_CREDENTIAL } from "../EsmsGenericFunctions";

// File Created: 2023-10-05 16:00:00
export class OttMessageResource {
  static NAME_RESOURCE = 'ott_message';

  static async executeCommand(
    this: IHookFunctions | IExecuteFunctions,
    operation: string, itemIndex: number
  ): Promise<INqdevResponseData> {

    // Lấy credentials từ node
    const credentials = await this.getCredentials(NAME_CREDENTIAL),
      esmsApiKey = (credentials?.esmsApiKey ?? '') as string,
      esmsSecretKey = (credentials?.esmsSecretKey ?? '') as string;

    let responseData: INqdevResponseData = {
      operation,
      status: 'backlog',
      timestamp: new Date().toISOString(),
    };

    switch (operation) {
      case 'sendZnsMessage': {
        // ----------------------------------
        //    ott_message:sendZnsMessage
        // ----------------------------------

        const esmsZnsTemplate = (this.getNodeParameter('esmsZnsTemplate', itemIndex, {}) as { mode: string; value: string })?.value ?? 'n8n-nqdev';
        const esmsZnsTemplateParameters = this.getNodeParameter('esmsZnsTemplateParameters', { parameters: [] }) as IDataObject;

        // Kiểm tra xem parameters có phải là mảng hay không
        const parameters = Array.isArray(esmsZnsTemplateParameters.parameters) ? esmsZnsTemplateParameters.parameters : [];

        const znsTempData = parameters.reduce((acc, { paramKey, paramValue }) => {
          acc[paramKey] = paramValue;
          return acc;
        }, {});

        // Cấu hình dữ liệu để gửi POST request
        let postData: ISendZnsMessageParams = {
          ApiKey: esmsApiKey ?? '',
          SecretKey: esmsSecretKey ?? '',
          OAID: '',
          TempID: esmsZnsTemplate,
          Phone: this.getNodeParameter('esmsPhonenumber', itemIndex, '') as string,
          TempData: znsTempData,
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
        let esmsResponse = await sendZaloZnsMessage.call(this, postData);
        responseData['esmsResponse'] = esmsResponse;

        break;
      }

      case 'sendViberMessage': {
        // ----------------------------------
        //    ott_message:sendViberMessage
        // ----------------------------------

        let esmsBrandnameLocator = this.getNodeParameter('esmsBrandname', itemIndex) as { mode: string; value: string } ?? { mode: 'name', value: 'n8n-nqdev' };

        // Cấu hình dữ liệu để gửi POST request
        let postData: ISendSmsMessageParams = {
          ApiKey: esmsApiKey ?? '',
          SecretKey: esmsSecretKey ?? '',
          SmsType: this.getNodeParameter('esmsSmsType', itemIndex, '2') as string,
          Brandname: esmsBrandnameLocator?.value ?? '',
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
        let esmsResponse = await sendSmsMessage.call(this, postData); responseData['esmsResponse'] = esmsResponse;

        break;
      }

      default: {
        throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not known!`, {
          itemIndex: itemIndex
        });
      }
    }

    responseData['status'] = 'completed';
    return responseData;
  }
}
