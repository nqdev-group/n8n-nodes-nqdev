import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError, } from 'n8n-workflow';

import { nqdevEsmsProperties, } from '../../descriptions/NqdevEsmsApi.descriptions';

export class NqdevEsmsNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: '[Nqdev] EsmsVN Node',
    name: 'nqdevEsmsNode',
    icon: {
      light: 'file:esms.svg',
      dark: 'file:esms.dark.svg',
    },
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: '[Nqdev] EsmsVN Node',
    defaults: {
      name: '[Nqdev] EsmsVN Node',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        // The name of the credential type to use.
        // It has to match the name of the credential type class.
        name: 'nqdevEsmsApi',
        required: false,
      },
    ],
    requestDefaults: {
      baseURL: 'https://rest.esms.vn',
      url: '',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      // The default query string parameters which will be sent with every request
    },
    /**
     * In the properties array we have two mandatory options objects required
     *
     * [Resource & Operation]
     *
     * https://docs.n8n.io/integrations/creating-nodes/code/create-first-node/#resources-and-operations
     *
     * In our example, the operations are separated into their own file (HTTPVerbDescription.ts)
     * to keep this class easy to read.
     *
     */
    properties: [
      ...nqdevEsmsProperties,
      // ...nqdevEsmsOperation,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();

    let item: INodeExecutionData;
    let esmsDomain: string = 'https://rest.esms.vn';
    let esmsApiKey: string = '';
    let esmsSecretKey: string = '';

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        item = items[itemIndex];

        esmsDomain = this.getNodeParameter('esmsDomain', itemIndex, 'https://rest.esms.vn') as string;
        esmsApiKey = this.getNodeParameter('esmsApiKey', itemIndex, '') as string;
        esmsSecretKey = this.getNodeParameter('esmsSecretKey', itemIndex, '') as string;

        item.json.esmsDomain = esmsDomain;
        item.json.esmsApiKey = esmsApiKey;
        item.json.esmsSecretKey = esmsSecretKey;
      } catch (error) {
        if (this.continueOnFail()) {
          items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
        } else {
          if (error.context) {
            error.context.itemIndex = itemIndex;
            throw error;
          }
        }

        throw new NodeOperationError(this.getNode(), error, {
          itemIndex,
        });
      }
    }

    return [items];
  }
}
