import type { IWebhookDescription } from "n8n-workflow";

/**
 * Defines the webhook configuration for receiving SMS delivery status updates from EsmsVN.
 *
 * This webhook model configures an endpoint that EsmsVN can call to notify the system
 * about the delivery status of sent messages. Key features include:
 *
 * - Configurable HTTP method (defaults to GET if not specified)
 * - Dynamic path configuration through workflow parameters
 * - Automatic webhook restart capability
 * - Immediate response handling to acknowledge receipt
 * - JSON parsing of the first entry in the response
 *
 * When implemented in a workflow, this webhook enables real-time tracking of
 * message delivery statuses, allowing for automated follow-up actions based on
 * whether messages were successfully delivered, failed, or are pending.
 *
 * @type {IWebhookDescription} n8n webhook description interface
 * @see https://developers.esms.vn/esms-api/callback-url for more information about the EsmsVN callback model
 * @see https://docs.n8n.io/integrations/creating-nodes/build/webhooks/ for n8n webhook implementation details
 */
export const esmsReceiveStatusWebhookModel: IWebhookDescription = {
  name: 'default', // Dùng để eSMS gửi real-time data (như message, delivery report)
  displayName: 'eSMS Receive Status Webhook',
  description: 'Webhook to receive status updates from eSMS',
  httpMethod: 'GET',
  path: 'receive-status',
  restartWebhook: true,
  responseMode: 'onReceived',
  responseData: 'firstEntryJson',
};
