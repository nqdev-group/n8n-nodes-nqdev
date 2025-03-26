import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

import { nqdevEsmsProperties } from '../descriptions/NqdevEsmsApi.descriptions';

export class NqdevEsmsApi implements ICredentialType {
  name = 'nqdevEsmsApi';
  displayName = '[Nqdev] Esms Credential API';
  documentationUrl = 'https://docs.quyit.id.vn/n8n-io/n8n-nodes-nqdev';

  properties: INodeProperties[] = [
    ...nqdevEsmsProperties
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
        n8n: 'rocks',
      },
    },
  };

  // The block below tells how this credential can be tested
  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials?.esmsDomain}}'.replace(/\/$/, ''),
      url: '/MainService.svc/json/GetBalance/={{ $credentials?.esmsApiKey }}/={{ $credentials?.esmsSecretKey }}',
      method: 'GET',
      ignoreHttpStatusErrors: true,
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
