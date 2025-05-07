// Project: nqdev-libraries

import type { IExecuteFunctions, IHookFunctions } from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";
import { INqdevResponseData } from "../../common";
import { NAME_CREDENTIAL } from "../EsmsGenericFunctions";
import { getEsmsListBrandname, getListZaloOa, getUserInfo } from "../services";

// File Created: 2023-10-05 16:00:00
export class AccountResource {
  static NAME_RESOURCE = 'account';

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
      case 'getBalance': {
        let esmsResponse = await getUserInfo.call(this, {
          ApiKey: esmsApiKey ?? '',
          SecretKey: esmsSecretKey ?? '',
        });
        responseData['esmsResponse'] = esmsResponse;
        break;
      }

      case 'getListBrandname': {
        let esmsResponse = await getEsmsListBrandname.call(this, {
          ApiKey: esmsApiKey ?? '',
          SecretKey: esmsSecretKey ?? '',
        });
        responseData['esmsResponse'] = esmsResponse;
        break;
      }

      case 'getListZaloOa': {
        let esmsResponse = await getListZaloOa.call(this, {
          ApiKey: esmsApiKey ?? '',
          SecretKey: esmsSecretKey ?? '',
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
