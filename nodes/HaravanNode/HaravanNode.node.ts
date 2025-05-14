import {
  type IDataObject,
  type IExecuteFunctions,
  type INodeExecutionData,
  type IWebhookFunctions,
  type IWebhookResponseData,
  NodeConnectionType,
  NodeOperationError,
  type INodeType,
  type INodeTypeDescription
} from "n8n-workflow";
import { haravanNodeModel, NAME_CREDENTIAL } from "../../nqdev-libraries/haravan";
import { INqdevResponseData } from "../../nqdev-libraries";

// Define the Haravan node class implementing INodeType
export class HaravanNode implements INodeType {
  // Node metadata and configuration
  description: INodeTypeDescription = {
    displayName: 'Nqdev: Tích hợp Haravan',
    name: 'haravanNode',
    icon: {
      light: 'file:haravan.svg',
      dark: 'file:haravan.dark.svg',
    },
    group: ['transform'],
    version: [1],
    subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
    description: 'Tích hợp Haravan với n8n để lắng nghe các sự kiện như đơn hàng, sản phẩm, tài khoản... và tự động kích hoạt các workflow tương ứng.',
    defaults: {
      name: `Nqdev: Haravan`,
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],

    // Credential configuration
    credentials: [
      {
        // The name of the credential type to use.
        // It has to match the name of the credential type class.
        name: NAME_CREDENTIAL,
        required: true,
      },
    ],

    // Default request configuration for HTTP calls
    requestDefaults: {
      baseURL: 'https://apis.haravan.com/',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 seconds timeout
    },

    /**
     * In the properties array we have two mandatory options objects required
     *
     * [Resource & Operation](https://docs.n8n.io/integrations/creating-nodes/code/create-first-node/#resources-and-operations)
     *
     * https://docs.n8n.io/integrations/creating-nodes/plan/choose-node-method/
     *
     * In our example, the operations are separated into their own file (HTTPVerbDescription.ts) to keep this class easy to read.
     */
    properties: [
      ...haravanNodeModel,
    ],
  };

  // Placeholder for dynamically loaded options and search filters
  methods = {
    loadOptions: {
      // Future dynamic dropdown options can be loaded here
      // getLoadZnsTemplateParameters,
    },
    listSearch: {
      // Optional list-based search methods
      // getListBrandname,
      // getListZaloOA,
      // getListZnsTemplate,
    },
  };

  // Handle webhook requests (if node is used as a webhook trigger)
  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const requestObject = this.getRequestObject(); // Get incoming request

    // Log the incoming request for debugging
    this.logger.info(`Webhook request received: ${JSON.stringify({
      headers: requestObject.headers,
      body: requestObject.body,
      query: requestObject.query,
      params: requestObject.params,
    })}`);

    return {
      workflowData: [this.helpers.returnJsonArray(requestObject.body)],
    };
  }

  // Main logic for executing the node
  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData(); // Input data for execution
    const executionId = this.getExecutionId();  // Get workflow execution ID
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

        // Lưu kết quả trả về vào item.json (nếu muốn sử dụng sau)
        responseData['executionId'] = executionId;
        responseData['resource'] = resource;
        responseData['operation'] = operation;

        // Simulate task success - update status
        responseData['status'] = 'completed';

        // Append response data to return list
        if (Array.isArray(responseData)) {
          returnData.push.apply(returnData, responseData as (INqdevResponseData & IDataObject)[]);
        } else if (responseData !== undefined) {
          returnData.push(responseData as (INqdevResponseData & IDataObject));
        }

        // Attach response to output item
        item.json = responseData;
      } catch (error) {
        if (this.continueOnFail()) {
          // Continue processing next items on failure
          items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
          continue;
        } else {
          if (error.context) {
            error.context.itemIndex = itemIndex;
            throw error;
          }
        }

        // Throw operation error if not continuing on fail
        throw new NodeOperationError(this.getNode(), error, {
          itemIndex,
        });
      }
    }

    // Return processed results
    return [this.helpers.returnJsonArray(returnData)];
  }
}
