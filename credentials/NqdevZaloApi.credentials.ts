import {
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

import { NAME_CREDENTIAL } from '../nqdev-libraries/esmsvn';

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
export class NqdevZaloApi implements ICredentialType {
  name = NAME_CREDENTIAL;
  displayName = 'Nqdev: Zalo Credential API';
  documentationUrl = 'https://developers.zalo.me/docs/api/overview';

  properties: INodeProperties[] = [
    {
      displayName: 'Access Token',
      name: 'accessToken',
      type: 'string',
      default: '',
      typeOptions: {
        password: true,
      },
      required: true,
      description: 'The access token obtained from Zalo OAuth2 flow',
    },
    {
      displayName: 'Refresh Token',
      name: 'refreshToken',
      type: 'string',
      default: '',
      typeOptions: {
        password: true,
      },
      description: 'Refresh token to get new access tokens (valid for 3 months, single-use)',
    },
    {
      displayName: 'Token Expiry Date',
      name: 'tokenExpiryDate',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      description: 'Timestamp when the access token expires (in ISO format)',
    },
    {
      displayName: 'App ID',
      name: 'appId',
      type: 'string',
      default: '',
      required: true,
      description: 'The App ID from Zalo Developer Portal',
    },
    {
      displayName: 'Secret Key',
      name: 'secretKey',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'The Secret Key from Zalo Developer Portal',
    },
    {
      displayName: 'Official Account ID',
      name: 'oaId',
      type: 'string',
      default: '',
      description: 'The ID of your Official Account',
      required: true,
    },
  ];
}
