import type {
  IDataObject,
  IExecuteFunctions,
  IHookFunctions,
  IHttpRequestMethods,
  IRequestOptions,
  JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

/**
 * Make an API request
 *
 * @param {IHookFunctions | IExecuteFunctions} this
 * @param {object | undefined} data
 */
export async function nqdevApiRequest(
  this: IHookFunctions | IExecuteFunctions,
  nameCredential: string,
  method: IHttpRequestMethods,
  baseUrl: string,
  endpoint: string,
  body: IDataObject,
  qs: IDataObject = {} // query parameters
): Promise<any> {

  const options: IRequestOptions = {
    method: method,
    baseURL: (baseUrl ?? '').replace(/\/$/, ''), // remove trailing slashes
    uri: `${endpoint}`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'nqdev-version': '2923-04-01', // Your API version
      'SentWith': 'n8n-nqdev', // Custom header for identification
    },
    qs: {
      n8n: 'nqdev', // Query parameter for identification
      ...qs, // Merge any additional query parameters
    },
    json: true, // Parse response as JSON
  };

  // Attach body if it's provided
  if (Object.keys(body).length) {
    options.body = body;
  }

  try {
    // Make the request using helpers.requestWithAuthentication
    const response = await this.helpers.requestWithAuthentication.call(this, nameCredential, options);

    // Check if the response indicates an error (e.g., invalid credentials)
    if (response.success === '101') {
      throw new NodeApiError(this.getNode(), response as JsonObject, {
        message: 'Invalid credentials or API error!',
      });
    }

    // Return the response if successful
    return response;
  } catch (error) {
    // Handle any errors during the API request
    throw new NodeApiError(this.getNode(), error, {
      message: 'Error making the API request.',
    });
  }
}
