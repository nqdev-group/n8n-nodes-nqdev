import type { IAuthenticateGeneric, ICredentialTestRequest, ICredentialType, INodeProperties } from "n8n-workflow";
import { haravanCredentialModel, NAME_CREDENTIAL } from "../nqdev-libraries/haravan";

export class NqdevHaravanApi implements ICredentialType {
  name = NAME_CREDENTIAL;
  displayName = 'Nqdev: Haravan API';
  documentationUrl = 'https://developers.haravan.com/';

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
