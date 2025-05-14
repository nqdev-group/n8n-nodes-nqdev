import type { IDataObject, IExecuteFunctions, IHookFunctions } from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";
import { INqdevResponseData } from "../../common";
import { IApiAuthorize, ISendSmsMessageParams, ISendZnsMessageParams } from "../interfaces";
import { getEsmsListTemplate, getEsmsZnsTemplateInfo, sendSmsMessage, sendZaloZnsMessage } from "../services";
import { getEsmsCredentials, } from "../EsmsGenericFunctions";

export class OttMessageResource {
  static NAME_RESOURCE = 'ott_message';

  static async executeCommand(
    this: IHookFunctions | IExecuteFunctions,
    operation: string, itemIndex: number
  ): Promise<INqdevResponseData> {

    // Lấy credentials từ node
    const esmsCredentials: IApiAuthorize = await getEsmsCredentials.call(this);

    const esmsSmsType = this.getNodeParameter('esmsSmsType', itemIndex, '2') as string,
      esmsZaloOA = (this.getNodeParameter('esmsZaloOA', itemIndex, {}) as { mode: string; value: string })?.value ?? '',
      esmsTemplateId = (this.getNodeParameter('esmsTemplateId', itemIndex, {}) as { mode: string; value: string })?.value ?? '';

    let responseData: INqdevResponseData = {
      operation,
      status: 'backlog',
      timestamp: new Date().toISOString(),
    };

    switch (operation) {
      case 'getListTemplate': {
        const esmsRequest = {
          smsType: esmsSmsType ?? '2',
          zaloOaId: esmsZaloOA ?? '',
        }

        const esmsResponse = await getEsmsListTemplate.call(this, {
          ...esmsCredentials,
          ...esmsRequest,
        });

        responseData['esmsRequest'] = esmsRequest;
        responseData['esmsResponse'] = esmsResponse;
        break;
      }

      case 'getZnsTemplateInfo': {
        const esmsRequest = {
          templateId: esmsTemplateId ?? '',
          zaloOaId: esmsZaloOA ?? '',
        }

        const esmsResponse = await getEsmsZnsTemplateInfo.call(this, {
          ...esmsCredentials,
          ...esmsRequest,
        });

        responseData['esmsRequest'] = esmsRequest;
        responseData['esmsResponse'] = esmsResponse;
        break;
      }

      case 'sendZnsMessage': {
        // ----------------------------------
        //    ott_message:sendZnsMessage
        // ----------------------------------

        const esmsZaloOA = (this.getNodeParameter('esmsZaloOA', itemIndex, {}) as { mode: string; value: string })?.value ?? '',
          esmsTemplateId = (this.getNodeParameter('esmsTemplateId', itemIndex, {}) as { mode: string; value: string })?.value ?? '',
          esmsZnsTemplateParameters = this.getNodeParameter('esmsZnsTemplateParameters', { parameters: [] }) as IDataObject,
          options = this.getNodeParameter('options', {}) as { [key: string]: any };

        // Kiểm tra xem parameters có phải là mảng hay không
        const parameters = Array.isArray(esmsZnsTemplateParameters.parameters) ? esmsZnsTemplateParameters.parameters : [];

        const znsTempData = parameters.reduce((acc, { paramKey, paramValue }) => {
          acc[paramKey] = paramValue;
          return acc;
        }, {});

        // Cấu hình dữ liệu để gửi POST request
        let postData: ISendZnsMessageParams = {
          OAID: esmsZaloOA ?? '',
          TempID: esmsTemplateId ?? '',
          Phone: this.getNodeParameter('esmsPhonenumber', itemIndex, '') as string,
          TempData: znsTempData,
          // options
          IsUnicode: (options['esmsIsUnicode'] as boolean) ? '1' : '0',
          Sandbox: (options['esmsIsSandbox'] as boolean) ? '1' : '0',
          PartnerSource: options['esmsPartnerSource'] ?? '0',
        };

        if ((options['esmsIsLoggingRequest'] as boolean)) {
          responseData['esmsRequest'] = postData;
        }

        // Gửi POST request đến API của ESMS
        let esmsResponse = await sendZaloZnsMessage.call(this, {
          ...esmsCredentials,
          ...postData,
        });
        responseData['esmsResponse'] = esmsResponse;

        break;
      }

      case 'sendViberMessage': {
        // ----------------------------------
        //    ott_message:sendViberMessage
        // ----------------------------------

        const esmsBrandname = (this.getNodeParameter('esmsBrandname', itemIndex, {}) as { mode: string; value: string })?.value ?? '',
          options = this.getNodeParameter('options', {}) as { [key: string]: any };

        // Cấu hình dữ liệu để gửi POST request
        let postData: ISendSmsMessageParams = {
          SmsType: this.getNodeParameter('esmsSmsType', itemIndex, '2') as string,
          Brandname: esmsBrandname ?? '',
          Phone: this.getNodeParameter('esmsPhonenumber', itemIndex, '') as string,
          Content: this.getNodeParameter('esmsContent', itemIndex, '') as string,
          // options
          IsUnicode: (options['esmsIsUnicode'] as boolean) ? '1' : '0',
          Sandbox: (options['esmsIsSandbox'] as boolean) ? '1' : '0',
          PartnerSource: options['esmsPartnerSource'] ?? '0',
        };

        if ((options['esmsIsLoggingRequest'] as boolean)) {
          responseData['esmsRequest'] = postData;
        }

        // Gửi POST request đến API của ESMS
        let esmsResponse = await sendSmsMessage.call(this, {
          ...esmsCredentials,
          ...postData,
        });
        responseData['esmsResponse'] = esmsResponse;

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
