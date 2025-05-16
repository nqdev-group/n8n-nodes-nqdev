import type { INodeProperties, IWebhookDescription } from "n8n-workflow";

import { esmsNodeResourceModel } from "./EsmsNodeResource.properties";
import { esmsNodeOperationModel } from "./EsmsNodeOperation.properties";
import { esmsOptionModel, esmsSmsModel } from "./EsmsOption.properties";
import { esmsReceiveStatusWebhookModel } from "./webhooks";

/**
 * Defines the properties configuration for the ESMS node in n8n.
 * This array combines all necessary properties for the node including:
 * - Resource selection options (from esmsNodeResourceModel)
 * - Operation options based on selected resource (from esmsNodeOperationModel)
 * - SMS configuration options (from esmsSmsModel)
 * - Additional ESMS API options (from esmsOptionModel)
 *
 * @returns {INodeProperties[]} Array of property definitions for the ESMS node
 */
export const EsmsNodeModel: INodeProperties[] = [
  // resource
  ...esmsNodeResourceModel,

  // operation
  ...esmsNodeOperationModel,

  // options collection
  ...esmsSmsModel,
  ...esmsOptionModel,
];

/**
 * Defines the webhook configuration for the ESMS node in n8n.
 *
 * This array contains webhook descriptions that enable the node to receive
 * and process callbacks from the EsmsVN API, particularly for message delivery
 * status notifications. The webhook configuration includes:
 *
 * - Base configuration from esmsReceiveStatusWebhookModel
 * - HTTP method settings (POST)
 * - Webhook restart behavior
 * - Response handling mode
 *
 * When configured in a workflow, this webhook allows automatic processing
 * of delivery status updates from EsmsVN, enabling workflows to react to
 * message delivery events in real-time.
 *
 * @returns {IWebhookDescription[]} Array of webhook configurations for the ESMS node
 * @see https://docs.n8n.io/integrations/creating-nodes/plan/node-types/ for more information about webhooks in n8n
 * @see https://developers.esms.vn/esms-api/callback-url for EsmsVN webhook documentation
 */
export const EsmsWebhookNodeModel: IWebhookDescription[] = [
  {
    ...esmsReceiveStatusWebhookModel,
    name: 'setup', // Dùng để eSMS xác minh URL (như kiểu "ping")
    httpMethod: 'GET',
    responseMode: 'onReceived',
    isFullPath: true,
    ndvHideUrl: true,
  },
  {
    ...esmsReceiveStatusWebhookModel,
    name: 'default', // Dùng để eSMS gửi real-time data (như message, delivery report)
    httpMethod: 'GET',
    responseMode: '={{$parameter["responseMode"]}}',
    responseData: '={{$parameter["responseMode"] === "lastNode" ? "noData" : undefined}}',
    isFullPath: true,
    ndvHideMethod: true,
  },
];
