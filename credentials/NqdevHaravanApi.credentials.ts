import type { IAuthenticateGeneric, ICredentialTestRequest, ICredentialType, INodeProperties } from "n8n-workflow";
import { haravanCredentialModel, NAME_CREDENTIAL } from "../nqdev-libraries/haravan";

/**
 * Represents the credentials required to authenticate with the Haravan API.
 *
 * This class implements the ICredentialType interface from n8n-workflow and provides
 * the necessary properties and methods to authenticate and test the connection to
 * the Haravan API. It includes the following:
 *
 * - `name`: The internal name of the credential.
 * - `displayName`: The display name of the credential.
 * - `documentationUrl`: URL to the documentation for setting up the credentials.
 * - `properties`: An array of properties required for the credential, extended from haravanCredentialModel.
 * - `authenticate`: An object defining the authentication method and properties, including headers and query string parameters.
 * - `baseUrl`: The base URL for the API, dynamically set based on the shop domain.
 * - `test`: An object defining the request to test the credentials, including method, URL, and headers.
 *
 * @see https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/
 */
export class NqdevHaravanApi implements ICredentialType {
  name = NAME_CREDENTIAL;
  displayName = 'Nqdev: Haravan API';
  documentationUrl = 'https://docs.haravan.com/docs/tutorials/authentication/authentication-and-authorization/?utm_media=n8n';

  properties: INodeProperties[] = [
    ...haravanCredentialModel
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: 'Bearer {{ $credentials.accessToken }}',
      },
      qs: {
        // Send this as part of the query string
        n8n: 'nqdev',
      },
    },
  };

  // baseUrl dynamic theo shop
  baseUrl = 'https://{{ $credentials.shopDomain }}';

  test: ICredentialTestRequest = {
    request: {
      method: 'GET',
      url: 'https://{{ $credentials.shopDomain }}/admin/shop.json',
      headers: {
        Authorization: 'Bearer {{ $credentials.accessToken }}',
      },
    },
  };
}
