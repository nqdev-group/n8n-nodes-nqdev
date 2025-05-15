import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

import { esmsCredentialModel, NAME_CREDENTIAL } from '../nqdev-libraries/esmsvn';

/**
 * Represents the Nqdev Esms API credentials for n8n.
 *
 * This class implements the ICredentialType interface and provides the necessary
 * properties and methods to authenticate and test credentials for the Esms API.
 * It includes the API key and secret key for authentication, and a test method
 * to verify the credentials.
 *
 * @see https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/
 */
export class NqdevEsmsApi implements ICredentialType {
  name = NAME_CREDENTIAL;
  displayName = 'Nqdev: Esms Credential API';
  documentationUrl = 'https://developers.esms.vn/readme/lay-thong-tin-apikey-va-secretkey/?utm_media=n8n';

  properties: INodeProperties[] = [
    ...esmsCredentialModel
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      auth: {
        username: '={{ $credentials.esmsApiKey }}',
        password: '={{ $credentials.esmsSecretKey }}',
      },
      qs: {
        // Send this as part of the query string
        n8n: 'nqdev',
      },
    },
  };

  // The block below tells how this credential can be tested
  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials?.esmsDomain}}'.replace(/\/$/, ''),
      url: '/MainService.svc/json/GetBalance_json/',
      method: 'POST',
      headers: {
        'nqdev-version': '1.0.0',
      },
      body: {
        'ApiKey': '={{ $credentials.esmsApiKey }}',
        'SecretKey': '={{ $credentials.esmsSecretKey }}'
      }
    },
    rules: [
      {
        type: 'responseSuccessBody',
        properties: {
          key: 'CodeResponse',
          value: '101',
          message: 'ApiKey or SecretKey is invalid.',
        }
      }
    ],
  };
}
