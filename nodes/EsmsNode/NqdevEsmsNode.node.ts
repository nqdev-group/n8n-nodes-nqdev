import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError, } from 'n8n-workflow';

import { esmsNodeModel, NAME_CREDENTIAL } from '../../nqdev-libraries/esmsvn';
import { INqdevResponseData } from '../../nqdev-libraries';
import { AccountResource, OttMessageResource, SmsMessageResource } from '../../nqdev-libraries/esmsvn';

export class NqdevEsmsNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Nqdev: Tích hợp EsmsVN',
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
      name: `Nqdev: EsmsVN`,
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
     * [Resource & Operation](https://docs.n8n.io/integrations/creating-nodes/code/create-first-node/#resources-and-operations)
     *
     * https://docs.n8n.io/integrations/creating-nodes/plan/choose-node-method/
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
    const executionId = this.getExecutionId();  // Lấy Execution ID của workflow hiện tại
    const returnData: IDataObject[] = [];

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        const item = items[itemIndex];
        const resource = this.getNodeParameter('resource', itemIndex, '') as string;
        const operation = this.getNodeParameter('operation', itemIndex, '') as string;

        let responseData: INqdevResponseData = {
          executionId, resource, operation,
          status: 'backlog',
          timestamp: new Date().toISOString(),
        };

        if (resource === AccountResource.NAME_RESOURCE) {
          responseData = await AccountResource.executeCommand.call(this, operation, itemIndex);
        } else if (resource === SmsMessageResource.NAME_RESOURCE) {
          responseData = await SmsMessageResource.executeCommand.call(this, operation, itemIndex);
        } else if (resource === OttMessageResource.NAME_RESOURCE) {
          responseData = await OttMessageResource.executeCommand.call(this, operation, itemIndex);
        } else {
          throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not known!`, {
            itemIndex: itemIndex,
          });
        }

        // Lưu kết quả trả về vào item.json (nếu muốn sử dụng sau)
        responseData['executionId'] = executionId;
        responseData['resource'] = resource;
        responseData['operation'] = operation;
        responseData['status'] = 'completed';

        if (Array.isArray(responseData)) {
          returnData.push.apply(returnData, responseData as (INqdevResponseData & IDataObject)[]);
        } else if (responseData !== undefined) {
          returnData.push(responseData as (INqdevResponseData & IDataObject));
        }

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

    // Trả về kết quả execution dưới dạng JSON
    return [this.helpers.returnJsonArray(returnData)];
  }
}
