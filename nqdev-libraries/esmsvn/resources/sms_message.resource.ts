import type { IExecuteFunctions, IHookFunctions } from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";
import { INqdevResponseData } from "../../common";
import { IApiAuthorize, ISendSmsMessageParams } from "../interfaces";
import { getEsmsListTemplate, sendSmsMessage } from "../services";
import { NAME_CREDENTIAL } from "../EsmsGenericFunctions";

export class SmsMessageResource {
  static NAME_RESOURCE = 'sms_message';

  static async executeCommand(
    this: IHookFunctions | IExecuteFunctions,
    operation: string, itemIndex: number
  ): Promise<INqdevResponseData> {

    // Lấy credentials từ node
    const credentials = await this.getCredentials(NAME_CREDENTIAL),
      esmsApiKey = (credentials?.esmsApiKey ?? '') as string,
      esmsSecretKey = (credentials?.esmsSecretKey ?? '') as string,
      esmsAuthentication: IApiAuthorize = {
        ApiKey: esmsApiKey ?? '',
        SecretKey: esmsSecretKey ?? '',
      };

    const esmsSmsType = this.getNodeParameter('esmsSmsType', itemIndex, '2') as string,
      esmsBrandname = (this.getNodeParameter('esmsBrandname', itemIndex, {}) as { mode: string; value: string })?.value ?? 'n8n-nqdev';

    const responseData: INqdevResponseData = {
      operation,
      status: 'backlog',
      timestamp: new Date().toISOString(),
    };

    switch (operation) {
      case 'getListTemplate': {
        const esmsRequest = {
          smsType: esmsSmsType ?? '2',
          brandname: esmsBrandname ?? 'n8n-nqdev',
        }

        const esmsResponse = await getEsmsListTemplate.call(this, {
          ...esmsAuthentication,
          ...esmsRequest,
        });

        responseData['esmsRequest'] = esmsRequest;
        responseData['esmsResponse'] = esmsResponse;
        break;
      }

      case 'sendSmsMessage': {
        // ----------------------------------
        //    sms_message:sendSmsMessage
        // ----------------------------------

        const esmsBrandname = (this.getNodeParameter('esmsBrandname', itemIndex, {}) as { mode: string; value: string })?.value ?? '',
          options = this.getNodeParameter('options', {}) as { [key: string]: any };

        // Cấu hình dữ liệu để gửi POST request
        let postData: ISendSmsMessageParams = {
          ApiKey: esmsApiKey ?? '',
          SecretKey: esmsSecretKey ?? '',
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
          responseData['esmsRequest'] = {
            Phone: postData.Phone,
            Content: postData.Content,
            SmsType: postData.SmsType,
            Brandname: postData.Brandname,
            Sandbox: postData.Sandbox,
            IsUnicode: postData.IsUnicode,
          };
        }

        // Gửi POST request đến API của ESMS
        let esmsResponse = await sendSmsMessage.call(this, postData);
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
