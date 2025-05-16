import { IHookFunctions, IWebhookFunctions, IWebhookResponseData, NodeConnectionType, type INodeType, type INodeTypeDescription } from "n8n-workflow";
import { EsmsWebhookNodeModel, NAME_CREDENTIAL } from "../../nqdev-libraries/esmsvn";

export class EsmsTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Nqdev: EsmsVN Trigger',
    name: 'esmsTrigger',
    icon: {
      light: 'file:esms.svg',
      dark: 'file:esms.dark.svg',
    },
    group: ['trigger'],
    version: [1],
    description: 'Webhook to receive status updates from eSMS',
    defaults: {
      name: 'Nqdev: EsmsVN Trigger',
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

    /**
     * @see https://docs.n8n.io/integrations/creating-nodes/build/webhooks/ for n8n webhook implementation details
     * @see https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/ is Webhook node
     */
    webhooks: [
      ...EsmsWebhookNodeModel,
    ],

    /**
    * In the properties array we have two mandatory options objects required
    *
    * [Resource & Operation](https://docs.n8n.io/integrations/creating-nodes/code/create-first-node/#resources-and-operations)
    *
    * @see https://docs.n8n.io/integrations/creating-nodes/plan/choose-node-method/
    *
    * In our example, the operations are separated into their own file (HTTPVerbDescription.ts)
    * to keep this class easy to read.
    *
    */
    properties: [
      {
        displayName:
          'Due to Telegram API limitations, you can use just one Telegram trigger for each bot at a time',
        name: 'telegramTriggerNotice',
        type: 'notice',
        default: '',
      },

      {
        displayName: 'Trigger On',
        name: 'updates',
        type: 'multiOptions',
        options: [
          {
            name: '*',
            value: '*',
            description: 'All updates',
          }
        ],
        required: true,
        default: [],
      },

      {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        options: [
          {
            displayName: 'Logging Request',
            name: 'esmsIsLoggingRequest',
            type: 'boolean',
            default: false,
          },
        ],
      },

    ],
  };

  webhookMethods = {
    default: {
      /**
       * Kiểm tra webhook có tồn tại không.
       * @param this IHookFunctions
       * @returns
       * - true: webhook đang tồn tại → không cần tạo lại.
       * - false: webhook không tồn tại → n8n sẽ gọi create() để tạo lại webhook.
       */
      async checkExists(this: IHookFunctions): Promise<boolean> {
        const webhookData = this.getWorkflowStaticData('node');

        // Lấy thông tin static của node, nơi lưu webhookId.
        if (webhookData.webhookId === undefined) {
          // No webhook id is set so no webhook can exist
          return false;
        }

        // Nếu không có webhookId, nghĩa là webhook chưa được tạo.

        return true;
      },

      /**
       * Tạo webhook nếu chưa tồn tại.
       * @param this IHookFunctions
       * @returns
       * - true: webhook đã tạo thành công hoặc đã tồn tại hợp lệ → lưu lại webhookId.
       * - false ở đây thì không đúng logic, vì create() chỉ return true nếu thành công, nếu thất bại thì ném lỗi (throw error) để dừng node.
       */
      async create(this: IHookFunctions): Promise<boolean> {
        return true;
      },

      /**
       * Xóa webhook đã tạo.
       * @param this
       * @returns
       * - true: webhook đã bị xóa thành công hoặc không có gì để xóa.
       * - false: lỗi xảy ra khi xóa webhook (GitHub có thể từ chối hoặc webhook không tồn tại), nhưng n8n sẽ không dừng lại, chỉ ghi nhận rằng webhook chưa bị xóa.
       */
      async delete(this: IHookFunctions): Promise<boolean> {
        return true;
      },
    },
  };

  // Placeholder for dynamically loaded options and search filters
  methods = {
    loadOptions: {
      // Future dynamic dropdown options can be loaded here
    },
    listSearch: {
      // Optional list-based search methods
    },
  };

  // Handle webhook requests (if node is used as a webhook trigger)
  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const requestObject = this.getRequestObject(); // Get incoming request

    // Log the incoming request for debugging
    // this.logger.info(`Webhook request received: ${JSON.stringify({
    //   headers: requestObject.headers,
    //   body: requestObject.body,
    //   query: requestObject.query,
    //   params: requestObject.params,
    // })}`);

    return {
      workflowData: [this.helpers.returnJsonArray(requestObject.body)],
    };
  }
}
